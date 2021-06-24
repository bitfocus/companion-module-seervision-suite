import Connection from './Connection';
import ContainersManager from './ContainersManager';
import TrackingManager from './TrackingManager';
import PtuControlManager from './PtuControlManager';

export default class Api {
  readonly #connection: Connection;
  readonly containersManager: ContainersManager;
  readonly trackingManager: TrackingManager;
  readonly ptuControlManager: PtuControlManager;

  constructor(dopIp: string, onUpdate: () => void) {
    this.#connection = new Connection(dopIp);

    this.containersManager = new ContainersManager(this.#connection, onUpdate);
    this.trackingManager = new TrackingManager(this.#connection, onUpdate);
    this.ptuControlManager = new PtuControlManager(this.#connection, onUpdate);
  }

  init(): Promise<Array<void>> {
    return Promise.all([
      this.containersManager.init(),
      this.trackingManager.init(),
      this.ptuControlManager.init(),
    ]);
  }

  closeConnection(): void {
    this.#connection.closeConnection();
  }
}
