import { CompanionFeedbacks } from '../../../../instance_skel_types'

import Api from '../api'
import { Instance } from '../types'
import * as containerTypes from '../api/ContainersManager'

export default function getFeedbacks(api: Api, instance: Instance): CompanionFeedbacks {
	const containers = api.containersManager.getContainers()

	return {
		set_is_tracking: {
			type: 'advanced',
			label: 'Is system tracking',
			description: 'Changes button style based on whether the system is tracking or not',
			options: [],
			callback: () => {
				return api.trackingManager.isTracking()
					? {
							text: 'Stop tracking',
							bgcolor: instance.rgb(192, 37, 40),
							color: instance.rgb(255, 255, 255),
					  }
					: {
							text: 'Start tracking',
							bgcolor: instance.rgb(29, 129, 57),
							color: instance.rgb(255, 255, 255),
					  }
			},
		},
		set_has_ptu_control: {
			type: 'advanced',
			label: 'Has PTU control',
			description: 'Changes button style based on whether the system is in control of the PTU or not',
			options: [],
			callback: () => {
				return api.ptuControlManager.isInControl()
					? {
							text: 'Release control',
							bgcolor: instance.rgb(192, 37, 40),
							color: instance.rgb(255, 255, 255),
					  }
					: {
							text: 'Take control',
							bgcolor: instance.rgb(29, 129, 57),
							color: instance.rgb(255, 255, 255),
					  }
			},
		},
		set_container_deleted: {
			type: 'advanced',
			label: 'Container was deleted',
			description: 'Changes button style if linked container was deleted',
			options: [
				{
					type: 'dropdown',
					id: 'containerId',
					default: containers[0]?.id ?? '',
					choices: containers.map(({ id, name: label }) => ({ id, label })),
					minChoicesForSearch: 0,
					multiple: false,
					label: 'ContainerID',
				},
			],
			callback: ({ options }) => {
				const containerId = options.containerId
				return containers.every((container) => container.id !== containerId)
					? {
							text: 'Linked container was deleted',
							bgcolor: instance.rgb(127, 132, 129),
							color: instance.rgb(255, 255, 255),
					  }
					: {}
			},
		},
		set_container_status: {
			type: 'advanced',
			label: 'Container recall status',
			description: 'Changes button style based on container recall status',
			options: [
				{
					type: 'dropdown',
					id: 'containerId',
					default: containers[0]?.id ?? '',
					choices: containers.map(({ id, name: label }) => ({ id, label })),
					minChoicesForSearch: 0,
					multiple: false,
					label: 'ContainerID',
				},
			],
			callback: ({ options: { containerId } }) => {
				const containerStatus = api.containersManager.getStatus()
				if (!containerStatus || containerId !== containerStatus.container_id) {
					return {}
				}

				const container = containers.find((container) => container.id === containerId)
				if (!container) {
					return {}
				}

				switch (containerStatus.status) {
					case containerTypes.RecallState.Running:
						return {
							text: `Recalling "${container.name}"...`,
							color: 0,
							bgcolor: instance.rgb(82, 170, 223),
						}
					case containerTypes.RecallState.Completed:
						return {
							text: `"${container.name}" recalled`,
							color: 0,
							bgcolor: instance.rgb(48, 180, 84),
						}
					case containerTypes.RecallState.Interrupted:
						return {
							text: `"${container.name}" interrupted`,
							color: 0,
							bgcolor: instance.rgb(216, 91, 22),
						}
				}

				return {}
			},
		},
	}
}
