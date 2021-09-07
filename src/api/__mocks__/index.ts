import ContainersManager from './ContainersManager'
import PtuControlManager from './PtuControlManager'
import TallyManager from './TallyManager'
import TrackingManager from './TrackingManager'
import TriggerZonesManager from './TriggerZonesManager'

export default class Api {
	containersManager: ContainersManager
	ptuControlManager: PtuControlManager
	tallyManager: TallyManager
	trackingManager: TrackingManager
	triggerZonesManager: TriggerZonesManager

	constructor() {
		this.containersManager = new ContainersManager()
		this.ptuControlManager = new PtuControlManager()
		this.tallyManager = new TallyManager()
		this.trackingManager = new TrackingManager()
		this.triggerZonesManager = new TriggerZonesManager()
	}

	init() {}

	closeConnection() {}
}
