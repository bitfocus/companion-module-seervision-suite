import { CompanionActions } from '../../../../instance_skel_types';

import Api from '../api';

import * as containerTypes from '../api/ContainersManager';
import * as trackingTypes from '../api/TrackingManager';

export default function getActions(api: Api): CompanionActions {
  return {
    ...getConnectionActions(),
    ...getContainerActions(api),
    ...getTrackingActions(),
  };
}

function getConnectionActions(): CompanionActions {
  return {
    reset_connection: {
      label: 'Reset Connection',
      options: [],
    },
  };
}

function getContainerActions(api: Api): CompanionActions {
  const containers = api.containersManager.getContainers();

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
  } as CompanionActions;
}

function getTrackingActions(): CompanionActions {
  const trackingTargets = [
    { id: 'default', label: 'Default' },
    ...Object.keys(trackingTypes.TrackingTarget).map((target) => ({
      id: trackingTypes.TrackingTarget[target],
      label: target,
    })),
  ];

  return {
    start_tracking: {
      label: 'Start tracking',
      options: [
        {
          type: 'dropdown',
          id: 'target',
          default: 'default',
          choices: trackingTargets,
          multiple: false,
          label: 'Target',
        },
      ],
    },
    stop_tracking: {
      label: 'Stop tracking',
      options: [],
    },
  } as CompanionActions;
}
