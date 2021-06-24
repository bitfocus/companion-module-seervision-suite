import Connection from './Connection';
import ContainersManager from './ContainersManager';

export default class Api {
  readonly #connection: Connection;
  readonly containersManager: ContainersManager;

  constructor(dopIp: string, onUpdate: () => void) {
    this.#connection = new Connection(dopIp);

    this.containersManager = new ContainersManager(this.#connection, onUpdate);
  }

  async init(): Promise<void> {
    await this.containersManager.init();
  }

  closeConnection(): void {
    this.#connection.closeConnection();
  }
}
