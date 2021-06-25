import { CompanionFeedbacks } from '../../../../instance_skel_types';

import Api from '../api';
import { Instance } from '../types';

export default function getFeedbacks(api: Api, instance: Instance): CompanionFeedbacks {
  const containers = api.containersManager.getContainers();

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
            };
      },
    },
    set_has_ptu_control: {
      type: 'advanced',
      label: 'Has PTU control',
      description:
        'Changes button style based on whether the system is in control of the PTU or not',
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
            };
      },
    },
    set_container_deleted: {
      type: 'boolean',
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
      style: {
        // todo [albina]:
      },
      callback: () => {
        // todo [albina]:
        return false;
      },
    },
  };
}
