import Connection from './Connection'

export type TriggerZone = {
	id: string
	name: string
	is_enabled: boolean
}

export default class TriggerZonesManager {
	readonly #connection: Connection
	readonly #notifyOwner: () => void

	#triggerZones: Array<TriggerZone>

	constructor(connection: Connection, notifyOwner: () => void) {
		this.#connection = connection
		this.#notifyOwner = notifyOwner

		this.#triggerZones = []
	}

	async init(): Promise<void> {
		await this.#connection.waitForConnection()
		this.#connection.subscribe('trigger_zones/updates', this.#onZonesUpdate)
	}

	#onZonesUpdate = (msg: { trigger_zones: Array<TriggerZone> }): void => {
		this.#triggerZones = msg.trigger_zones
		this.#notifyOwner()
	}

	getTriggerZones(): Array<TriggerZone> {
		return [...this.#triggerZones]
	}

	setZoneIsEnabled(zoneId: string, isEnabled: boolean): void {
		this.#connection.callService('trigger_zones/set_status_of_single_zone', { zone_id: zoneId, is_enabled: isEnabled })
	}

	setAllIsEnabled(isEnabled: boolean): void {
		this.#connection.callService('trigger_zones/set_status_of_all_zones', { is_enabled: isEnabled })
	}

	getTriggerZone(zoneId: string): TriggerZone | null {
		return this.#triggerZones.find(({ id }) => id === zoneId) ?? null
	}
}
