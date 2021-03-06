import { CompanionPreset } from '../../../../instance_skel_types'

import Api from '../api'
import * as containerTypes from '../api/ContainersManager'
import * as trackingTypes from '../api/TrackingManager'

import { Instance } from '../types'

export default function getPresets(api: Api, instance: Instance): Array<CompanionPreset> {
	return [
		...getConnectionPresets(instance),
		...getContainerPresets(api, instance),
		...getPtuControlPresets(instance),
		...getTrackingPresets(instance),
		...getTriggerZonePresets(api, instance),
	]
}

function getConnectionPresets(instance: Instance): Array<CompanionPreset> {
	return [
		{
			category: 'Connection',
			label: 'Reset connection',
			bank: {
				style: 'text',
				text: `Reset connection`,
				size: 'auto',
				color: instance.rgb(255, 255, 255),
				bgcolor: 0,
			},
			feedbacks: [],
			actions: [
				{
					action: 'reset_connection',
					options: {},
				},
			],
		},
	]
}

function getContainerPresets(api: Api, instance: Instance): Array<CompanionPreset> {
	const containers = api.containersManager.getContainers()

	return [
		...containers.map(
			({ id, name }) =>
				({
					category: 'Containers',
					label: 'Recall container',
					bank: {
						style: 'text',
						text: `Recall "${name}"`,
						size: 'auto',
						color: instance.rgb(255, 255, 255),
						bgcolor: 0,
					},
					feedbacks: [
						{
							type: 'set_container_deleted',
							options: { containerId: id },
						},
						{
							type: 'set_container_status',
							options: { containerId: id },
						},
					],
					actions: [
						{
							action: 'recall_container',
							options: {
								containerId: id,
							},
						},
					],
				} as CompanionPreset)
		),
		...Object.keys(containerTypes.ContainerConfiguration).map(
			(configuration) =>
				({
					category: 'Containers',
					label: 'Create container',
					bank: {
						style: 'text',
						text: `Create ${configuration} container`,
						size: 'auto',
						color: instance.rgb(255, 255, 255),
						bgcolor: 0,
					},
					feedbacks: [],
					actions: [
						{
							action: 'create_container',
							options: {
								configuration: containerTypes.ContainerConfiguration[configuration],
							},
						},
					],
				} as CompanionPreset)
		),
	]
}

function getTrackingPresets(instance: Instance): Array<CompanionPreset> {
	return [
		{
			category: 'Tracking',
			label: 'Toggle tracking',
			bank: {
				style: 'text',
				text: 'Toggle tracking',
				size: 'auto',
				color: instance.rgb(255, 255, 255),
				bgcolor: 0,
			},
			feedbacks: [
				{
					type: 'set_is_tracking',
					options: {},
				},
			],
			actions: [
				{
					action: 'toggle_tracking',
					options: {},
				},
			],
		},
		...Object.keys(trackingTypes.TrackingTarget).map(
			(target) =>
				({
					category: 'Tracking',
					label: `Start tracking ${target}`,
					bank: {
						style: 'text',
						text: `Start tracking ${target}`,
						size: 'auto',
						color: instance.rgb(255, 255, 255),
						bgcolor: 0,
					},
					feedbacks: [],
					actions: [
						{
							action: 'start_tracking',
							options: { target: trackingTypes.TrackingTarget[target] },
						},
					],
				} as CompanionPreset)
		),
		{
			category: 'Tracking',
			label: 'Stop tracking',
			bank: {
				style: 'text',
				text: 'Stop tracking',
				size: 'auto',
				color: instance.rgb(255, 255, 255),
				bgcolor: 0,
			},
			feedbacks: [],
			actions: [
				{
					action: 'stop_tracking',
					options: {},
				},
			],
		},
	]
}

function getTriggerZonePresets(api: Api, instance: Instance): Array<CompanionPreset> {
	const triggerZones = api.triggerZonesManager.getTriggerZones()
	return [
		...triggerZones.map(
			({ id, name }) =>
				({
					category: 'Trigger Zones',
					label: 'Toggle Zone',
					bank: {
						style: 'text',
						text: `Toggle "${name}"`,
						size: 'auto',
						color: instance.rgb(255, 255, 255),
						bgcolor: 0,
					},
					feedbacks: [
						{
							type: 'set_trigger_zone_status',
							options: { zoneId: id },
						},
					],
					actions: [
						{
							action: 'toggle_trigger_zone',
							options: {
								zoneId: id,
							},
						},
					],
				} as CompanionPreset)
		),
		{
			category: 'Trigger Zones',
			label: 'Disable all Trigger Zones',
			bank: {
				style: 'text',
				text: 'Disable all Trigger Zones',
				size: 'auto',
				color: instance.rgb(255, 255, 255),
				bgcolor: 0,
			},
			feedbacks: [],
			actions: [
				{
					action: 'disable_all_trigger_zones',
					options: {},
				},
			],
		},
		{
			category: 'Trigger Zones',
			label: 'Enable all Trigger Zones',
			bank: {
				style: 'text',
				text: 'Enable all Trigger Zones',
				size: 'auto',
				color: instance.rgb(255, 255, 255),
				bgcolor: 0,
			},
			feedbacks: [],
			actions: [
				{
					action: 'enable_all_trigger_zones',
					options: {},
				},
			],
		},
	]
}

function getPtuControlPresets(instance: Instance): Array<CompanionPreset> {
	return [
		{
			category: 'PTU control',
			label: 'Toggle control',
			bank: {
				style: 'text',
				text: 'Toggle PTU control',
				size: 'auto',
				color: instance.rgb(255, 255, 255),
				bgcolor: 0,
			},
			feedbacks: [
				{
					type: 'set_has_ptu_control',
					options: {},
				},
			],
			actions: [
				{
					action: 'toggle_ptu_control',
					options: {},
				},
			],
		},
		{
			category: 'PTU control',
			label: 'Take control',
			bank: {
				style: 'text',
				text: 'Take PTU control',
				size: 'auto',
				color: instance.rgb(255, 255, 255),
				bgcolor: 0,
			},
			feedbacks: [],
			actions: [
				{
					action: 'take_ptu_control',
					options: {},
				},
			],
		},
		{
			category: 'PTU control',
			label: 'Release control',
			bank: {
				style: 'text',
				text: 'Release PTU control',
				size: 'auto',
				color: instance.rgb(255, 255, 255),
				bgcolor: 0,
			},
			feedbacks: [],
			actions: [
				{
					action: 'release_ptu_control',
					options: {},
				},
			],
		},
	]
}
