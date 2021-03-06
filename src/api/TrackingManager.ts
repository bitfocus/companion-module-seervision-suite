import Connection from './Connection'

export enum TrackingTarget {
	Default = '',
	Middle = 'middle',
	Left = 'left',
	Right = 'right',
}

type Point2d = {
	x: number
	y: number
}

export default class TrackingManager {
	readonly #connection: Connection
	readonly #notifyOwner: () => void
	#isTracking: boolean

	constructor(connection: Connection, notifyOwner: () => void) {
		this.#connection = connection
		this.#notifyOwner = notifyOwner

		this.#isTracking = false
	}

	async init(): Promise<void> {
		await this.#connection.waitForConnection()
		this.#connection.subscribe('tracking/state', this.#onUpdate)
	}

	#onUpdate = (msg: { is_tracking: boolean }): void => {
		this.#isTracking = msg.is_tracking
		this.#notifyOwner()
	}

	stopTracking(): void {
		this.#connection.callService('tracking/stop')
	}

	startTracking(target: TrackingTarget): void {
		this.#connection.callService('tracking/start', { target })
	}

	startTrackingAtPoint(targetPoint: Point2d): void {
		this.#connection.callService('tracking/start', { target: 'point', target_point: targetPoint })
	}

	isTracking(): boolean {
		return this.#isTracking
	}

	toggleTracking(): void {
		if (this.#isTracking) {
			this.stopTracking()
		} else {
			this.startTracking(TrackingTarget.Default)
		}
	}
}
