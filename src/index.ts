import InstanceSkel from '../../../instance_skel'
import Api from './api'
import * as elements from './elements'

import * as instanceSkelTypes from '../../../instance_skel_types'
import * as types from './types'
import * as containerTypes from './api/ContainersManager'
import * as tallyTypes from './api/TallyManager'
import * as trackingTypes from './api/TrackingManager'

class SeervisionInstance extends InstanceSkel<types.Config> {
	#api: Api | null

	constructor(system: instanceSkelTypes.CompanionSystem, id: string, config: types.Config) {
		super(system, id, config)

		this.#api = null
	}

	config_fields(): Array<
		instanceSkelTypes.CompanionInputFieldTextInput | instanceSkelTypes.CompanionInputFieldCheckbox
	> {
		return [
			{
				type: 'textinput',
				id: 'host',
				label: 'IP Address',
				default: '10.10.12.101',
				regex: this.REGEX_IP,
			},
			{
				type: 'textinput',
				id: 'pathPrefix',
				label: 'Path Prefix (leave blank if none)',
				default: '',
				regex: '/^([/][\\w-]+)*$/',
			},
			{
				type: 'checkbox',
				id: 'useLegacyUrl',
				label: 'Legacy API? (version 40 Klausen and before)',
				default: false,
			},
		]
	}

	destroy(): void {
		this.#api?.closeConnection()
	}

	init(): void {
		this.initElements()
		this.initConnection()
	}

	initConnection(): void {
		this.#api = new Api(
			this.config.host,
			this.config.pathPrefix,
			this.config.useLegacyUrl,
			this.onConnectionUpdate,
			this
		)
		this.#api.init()
	}

	initElements(): void {
		if (!this.#api) {
			this.setActions({})
			this.setPresetDefinitions([])
			this.setFeedbackDefinitions({})
			return
		}

		const actions = elements.getActions(this.#api)
		const presets = elements.getPresets(this.#api, this)
		const feedbacks = elements.getFeedbacks(this.#api, this)

		this.setActions(actions)
		this.setPresetDefinitions(presets)
		this.setFeedbackDefinitions(feedbacks)
	}

	onConnectionUpdate = (): void => {
		this.initElements()
		this.checkFeedbacks()
	}

	action(action: instanceSkelTypes.CompanionActionEvent): void {
		const options = action.options

		switch (action.action) {
			case 'recall_container':
				this.#api?.containersManager.recallContainer(options.containerId?.toString() ?? '')
				break
			case 'create_container':
				this.#api?.containersManager.createContainer(options.configuration as containerTypes.ContainerConfiguration)
				break
			case 'reset_connection':
				this.resetConnection()
				break
			case 'start_tracking': {
				const target = options.target as trackingTypes.TrackingTarget
				this.#api?.trackingManager.startTracking(target)
				break
			}
			case 'start_tracking_at_point': {
				const x = options.target_point_x as number
				const y = options.target_point_y as number
				this.#api?.trackingManager.startTrackingAtPoint({ x, y })
				break
			}
			case 'stop_tracking':
				this.#api?.trackingManager.stopTracking()
				break
			case 'toggle_tracking': {
				this.#api?.trackingManager.toggleTracking()
				break
			}
			case 'take_ptu_control':
				this.#api?.ptuControlManager.takeControl()
				break
			case 'release_ptu_control':
				this.#api?.ptuControlManager.releaseControl()
				break
			case 'toggle_ptu_control': {
				this.#api?.ptuControlManager.toggleControl()
				break
			}
			case 'set_tally_status': {
				const status = options.status as tallyTypes.TallyState
				this.#api?.tallyManager.setTallyState(status)
				break
			}
			case 'enable_trigger_zone': {
				const zoneId = options.zoneId as string
				this.#api?.triggerZonesManager.setZoneIsEnabled(zoneId, true)
				break
			}
			case 'disable_trigger_zone': {
				const zoneId = options.zoneId as string
				this.#api?.triggerZonesManager.setZoneIsEnabled(zoneId, false)
				break
			}
			case 'toggle_trigger_zone': {
				const zoneId = options.zoneId as string
				const zone = this.#api?.triggerZonesManager.getTriggerZone(zoneId)
				if (zone) {
					this.#api?.triggerZonesManager.setZoneIsEnabled(zoneId, !zone.is_enabled)
				}
				return
			}
			case 'enable_all_trigger_zones':
				this.#api?.triggerZonesManager.setAllIsEnabled(true)
				break
			case 'disable_all_trigger_zones':
				this.#api?.triggerZonesManager.setAllIsEnabled(false)
				break
			default:
				this.handleUnknownAction(action.action)
				break
		}
	}

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	handleUnknownAction(action: string): void {
		// Dummy action handler for tests. Accepts action for better error output.
	}

	updateConfig(config: types.Config): void {
		const didHostChange = this.config.host !== config.host
		this.config = config

		if (didHostChange) {
			this.resetConnection()
		}
	}

	resetConnection(): void {
		this.#api?.closeConnection()
		this.initConnection()
	}
}

module.exports = SeervisionInstance
