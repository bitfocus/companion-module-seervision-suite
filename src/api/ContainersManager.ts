import Connection from './Connection';

import * as types from '../types';

export default class ContainersManager {
  readonly #connection: Connection;
  readonly #notifyOwner: () => void;
  #containers: Array<types.Container>;

  constructor(connection: Connection, notifyOwner: () => void) {
    this.#connection = connection;
    this.#notifyOwner = notifyOwner;

    this.#containers = [];
  }

  async init(): Promise<void> {
    await this.#connection.waitForConnection();
    this.#connection.subscribe('containers/updates', this.#onUpdate);
  }

  #onUpdate = (msg: { containers: Array<types.Container> }): void => {
    this.#containers = msg.containers;
    this.#notifyOwner();
  };

  getContainers(): Array<types.Container> {
    return [...this.#containers];
  }

  recallContainer(containerId: string): void {
    this.#connection.callService('containers/recall', { container_id: containerId });
  }
}
