import ContainersManager from './ContainersManager'
import PtuControlManager from './PtuControlManager'
import TallyManager from './TallyManager'
import TrackingManager from './TrackingManager'

export default class Api {
	containersManager: ContainersManager
	trackingManager: TrackingManager
	ptuControlManager: PtuControlManager
	tallyManager: TallyManager

	constructor() {
		this.containersManager = new ContainersManager()
		this.trackingManager = new TrackingManager()
		this.ptuControlManager = new PtuControlManager()
		this.tallyManager = new TallyManager()
	}

	init() {}

	closeConnection() {}
}
