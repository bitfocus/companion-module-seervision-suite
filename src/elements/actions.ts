import { CompanionActions } from '../../../../instance_skel_types'

import Api from '../api'

import * as containerTypes from '../api/ContainersManager'
import * as tallyTypes from '../api/TallyManager'
import * as trackingTypes from '../api/TrackingManager'

export default function getActions(api: Api): CompanionActions {
	return {
		...getConnectionActions(),
		...getContainerActions(api),
		...getPtuControlActions(),
		...getTallyActions(),
		...getTrackingActions(),
		...getTriggerZoneActions(api),
	}
}

function getConnectionActions(): CompanionActions {
	return {
		reset_connection: {
			label: 'Reset Connection',
			options: [],
		},
	}
}

function getContainerActions(api: Api): CompanionActions {
	const containers = api.containersManager.getContainers()

	return {
		recall_container: {
			label: 'Recall Container',
			options: [
				{
					type: 'dropdown',
					id: 'containerId',
					default: containers[0]?.id ?? '',
					choices: containers.map(({ id, name: label }) => ({ id, label })) ?? [],
					minChoicesForSearch: 0,
					multiple: false,
					label: 'Container ID',
				},
			],
		},
		create_container: {
			label: 'Create Container',
			options: [
				{
					type: 'dropdown',
					id: 'configuration',
					default: containerTypes.ContainerConfiguration.Position,
					choices: Object.keys(containerTypes.ContainerConfiguration).map((configuration) => ({
						id: containerTypes.ContainerConfiguration[configuration],
						label: configuration,
					})),
					multiple: false,
					label: 'Configuration',
				},
			],
		},
	} as CompanionActions
}

function getPtuControlActions(): CompanionActions {
	return {
		take_ptu_control: {
			label: 'Take PTU control',
			options: [],
		},
		release_ptu_control: {
			label: 'Release PTU control',
			options: [],
		},
		toggle_ptu_control: {
			label: 'Toggle PTU control',
			options: [],
		},
	}
}

function getTallyActions(): CompanionActions {
	return {
		set_tally_status: {
			label: 'Set tally status',
			options: [
				{
					type: 'dropdown',
					id: 'status',
					default: tallyTypes.TallyState.None,
					choices: Object.keys(tallyTypes.TallyState).map((status) => ({
						id: tallyTypes.TallyState[status],
						label: status,
					})),
					multiple: false,
					label: 'Status',
				},
			],
		},
	}
}

function getTrackingActions(): CompanionActions {
	return {
		start_tracking: {
			label: 'Start tracking',
			options: [
				{
					type: 'dropdown',
					id: 'target',
					default: trackingTypes.TrackingTarget.Default,
					choices: Object.keys(trackingTypes.TrackingTarget).map((target) => ({
						id: trackingTypes.TrackingTarget[target],
						label: target,
					})),
					multiple: false,
					label: 'Target',
				},
			],
		},
		start_tracking_at_point: {
			label: 'Start tracking at point',
			options: [
				{
					id: 'target_point_x',
					label: 'Target point X',
					type: 'number',
					min: 0.1,
					max: 0.9,
					default: 0.5,
				},
				{
					id: 'target_point_y',
					label: 'Target point Y',
					type: 'number',
					min: 0.1,
					max: 0.9,
					default: 0.5,
				},
			],
		},
		stop_tracking: {
			label: 'Stop tracking',
			options: [],
		},
		toggle_tracking: {
			label: 'Toggle tracking',
			options: [],
		},
	} as CompanionActions
}

function getTriggerZoneActions(api: Api): CompanionActions {
	const triggerZones = api.triggerZonesManager.getTriggerZones()

	return {
		enable_trigger_zone: {
			label: 'Enable Trigger Zone',
			options: [
				{
					type: 'dropdown',
					id: 'zoneId',
					default: triggerZones[0]?.id ?? '',
					choices: triggerZones.map(({ id, name: label }) => ({ id, label })) ?? [],
					minChoicesForSearch: 0,
					multiple: false,
					label: 'Trigger Zone',
				},
			],
		},
		disable_trigger_zone: {
			label: 'Disable Trigger Zone',
			options: [
				{
					type: 'dropdown',
					id: 'zoneId',
					default: triggerZones[0]?.id ?? '',
					choices: triggerZones.map(({ id, name: label }) => ({ id, label })) ?? [],
					minChoicesForSearch: 0,
					multiple: false,
					label: 'Trigger Zone',
				},
			],
		},
		toggle_trigger_zone: {
			label: 'Toggle Trigger Zone',
			options: [
				{
					type: 'dropdown',
					id: 'zoneId',
					default: triggerZones[0]?.id ?? '',
					choices: triggerZones.map(({ id, name: label }) => ({ id, label })) ?? [],
					minChoicesForSearch: 0,
					multiple: false,
					label: 'Trigger Zone',
				},
			],
		},
		enable_all_trigger_zones: {
			label: 'Enable all Trigger Zone',
			options: [],
		},
		disable_all_trigger_zones: {
			label: 'Disable all Trigger Zone',
			options: [],
		},
	} as CompanionActions
}
