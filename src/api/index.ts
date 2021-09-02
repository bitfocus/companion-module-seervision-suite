import Connection from './Connection'
import ContainersManager from './ContainersManager'
import PtuControlManager from './PtuControlManager'
import TallyManager from './TallyManager'
import TrackingManager from './TrackingManager'
import TriggerZonesManager from './TriggerZonesManager'

import type { Logger } from '../types'

export default class Api {
	readonly #connection: Connection
	readonly containersManager: ContainersManager
	readonly ptuControlManager: PtuControlManager
	readonly tallyManager: TallyManager
	readonly trackingManager: TrackingManager
	readonly triggerZonesManager: TriggerZonesManager

	constructor(dopIp: string, onUpdate: () => void, logger: Logger) {
		this.#connection = new Connection(dopIp, logger)

		this.containersManager = new ContainersManager(this.#connection, onUpdate)
		this.ptuControlManager = new PtuControlManager(this.#connection, onUpdate)
		this.tallyManager = new TallyManager(this.#connection, onUpdate)
		this.trackingManager = new TrackingManager(this.#connection, onUpdate)
		this.triggerZonesManager = new TriggerZonesManager(this.#connection, onUpdate)
	}

	init(): Promise<Array<void>> {
		return Promise.all([
			this.containersManager.init(),
			this.ptuControlManager.init(),
			this.tallyManager.init(),
			this.trackingManager.init(),
			this.triggerZonesManager.init(),
		])
	}

	closeConnection(): void {
		this.#connection.closeConnection()
	}
}
