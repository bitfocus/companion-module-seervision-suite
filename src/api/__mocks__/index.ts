import ContainersManager from './ContainersManager'
import PtuControlManager from './PtuControlManager'
import TallyManager from './TallyManager'
import TrackingManager from './TrackingManager'

export default class Api {
	containersManager: ContainersManager
	ptuControlManager: PtuControlManager
	tallyManager: TallyManager
	trackingManager: TrackingManager

	constructor() {
		this.containersManager = new ContainersManager()
		this.ptuControlManager = new PtuControlManager()
		this.tallyManager = new TallyManager()
		this.trackingManager = new TrackingManager()
	}

	init() {}

	closeConnection() {}
}
