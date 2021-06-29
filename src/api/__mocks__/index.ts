import ContainersManager from './ContainersManager';
import PtuControlManager from './PtuControlManager';
import TrackingManager from './TrackingManager';

export default class Api {
  containersManager: ContainersManager;
  trackingManager: TrackingManager;
  ptuControlManager: PtuControlManager;

  constructor() {
    this.containersManager = new ContainersManager();
    this.trackingManager = new TrackingManager();
    this.ptuControlManager = new PtuControlManager();
  }

  init() {}

  closeConnection() {}
}
