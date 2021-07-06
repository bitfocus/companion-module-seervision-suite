import Connection from './Connection'

export default class PtuControlManager {
	readonly #connection: Connection
	readonly #notifyOwner: () => void
	#isInControl: boolean

	constructor(connection: Connection, notifyOwner: () => void) {
		this.#connection = connection
		this.#notifyOwner = notifyOwner

		this.#isInControl = false
	}

	async init(): Promise<void> {
		await this.#connection.waitForConnection()
		this.#connection.subscribe('ptu_driver/in_control', this.#onUpdate)
	}

	#onUpdate = (msg: { in_control: boolean }): void => {
		this.#isInControl = msg.in_control
		this.#notifyOwner()
	}

	takeControl(): void {
		this.#connection.callService('ptu_driver/take_control')
	}

	releaseControl(): void {
		this.#connection.callService('ptu_driver/release_control')
	}

	isInControl(): boolean {
		return this.#isInControl
	}

	toggleControl(): void {
		if (this.isInControl()) {
			this.releaseControl()
		} else {
			this.takeControl()
		}
	}
}
