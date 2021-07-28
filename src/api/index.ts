import Connection from './Connection'
import ContainersManager from './ContainersManager'
import PtuControlManager from './PtuControlManager'
import TallyManager from './TallyManager'
import TrackingManager from './TrackingManager'

import type { Logger } from '../types'

export default class Api {
	readonly #connection: Connection
	readonly containersManager: ContainersManager
	readonly ptuControlManager: PtuControlManager
	readonly tallyManager: TallyManager
	readonly trackingManager: TrackingManager

	constructor(dopIp: string, onUpdate: () => void, logger: Logger) {
		this.#connection = new Connection(dopIp, logger)

		this.containersManager = new ContainersManager(this.#connection, onUpdate)
		this.ptuControlManager = new PtuControlManager(this.#connection, onUpdate)
		this.tallyManager = new TallyManager(this.#connection, onUpdate)
		this.trackingManager = new TrackingManager(this.#connection, onUpdate)
	}

	init(): Promise<Array<void>> {
		return Promise.all([
			this.containersManager.init(),
			this.ptuControlManager.init(),
			this.tallyManager.init(),
			this.trackingManager.init(),
		])
	}

	closeConnection(): void {
		this.#connection.closeConnection()
	}
}
