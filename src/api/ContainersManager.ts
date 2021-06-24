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

export default class ContainersManager {
  readonly #connection: Connection;
  readonly #notifyOwner: () => void;
  #containers: Array<Container>;

  constructor(connection: Connection, notifyOwner: () => void) {
    this.#connection = connection;
    this.#notifyOwner = notifyOwner;

    this.#containers = [];
  }

  async init(): Promise<void> {
    await this.#connection.waitForConnection();
    this.#connection.subscribe('containers/updates', this.#onUpdate);
  }

  #onUpdate = (msg: { containers: Array<Container> }): void => {
    this.#containers = msg.containers;
    this.#notifyOwner();
  };

  getContainers(): Array<Container> {
    return [...this.#containers];
  }

  recallContainer(containerId: string): void {
    this.#connection.callService('containers/recall', { container_id: containerId });
  }

  createContainer(configuration: ContainerConfiguration): void {
    this.#connection.callService('containers/create', {
      configuration_type: configuration,
    });
  }
}
