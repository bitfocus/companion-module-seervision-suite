import Connection from './Connection';

export type Container = {
  id: string;
  name: string;
};

export enum ContainerConfiguration {
  Empty = 'empty',
  Position = 'position',
  Shot = 'shot',
}

export enum RecallState {
  Running = 'running',
  Completed = 'completed',
  Interrupted = 'interrupted',
}
type ContainerStatus = {
  container_id: string;
  status: RecallState;
};

const STATUS_DISPLAY_DURATION = 2000;

export default class ContainersManager {
  readonly #connection: Connection;
  readonly #notifyOwner: () => void;

  #containers: Array<Container>;
  #status: ContainerStatus | null;

  #statusResetTimeout: null | NodeJS.Timeout;

  constructor(connection: Connection, notifyOwner: () => void) {
    this.#connection = connection;
    this.#notifyOwner = notifyOwner;

    this.#containers = [];
    this.#status = null;

    this.#statusResetTimeout = null;
  }

  async init(): Promise<void> {
    await this.#connection.waitForConnection();
    this.#connection.subscribe('containers/updates', this.#onContainersUpdate);
    this.#connection.subscribe('containers/status', this.#onStatusUpdate);
  }

  #onContainersUpdate = (msg: { containers: Array<Container> }): void => {
    this.#containers = msg.containers;
    this.#notifyOwner();
  };

  #onStatusUpdate = (msg: ContainerStatus): void => {
    if (msg.status !== RecallState.Running && !this.#status) {
      // this is an old update we don't care about
      return;
    }

    this.#status = msg;
    this.#maybeClearStatusResetTimeout();
    if (this.#status.status !== RecallState.Running) {
      this.#statusResetTimeout = setTimeout(() => {
        this.#status = null;
        this.#maybeClearStatusResetTimeout();
        this.#notifyOwner();
      }, STATUS_DISPLAY_DURATION);
    }
    this.#notifyOwner();
  };

  getContainers(): Array<Container> {
    return [...this.#containers];
  }

  getStatus(): ContainerStatus | null {
    return this.#status ? { ...this.#status } : null;
  }

  recallContainer(containerId: string): void {
    this.#connection.callService('containers/recall', { container_id: containerId });
  }

  createContainer(configuration: ContainerConfiguration): void {
    this.#connection.callService('containers/create', {
      configuration_type: configuration,
    });
  }

  #maybeClearStatusResetTimeout = (): void => {
    if (this.#statusResetTimeout) {
      clearTimeout(this.#statusResetTimeout);
      this.#statusResetTimeout = null;
    }
  };
}
