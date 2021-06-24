import { CompanionActions } from '../../../../instance_skel_types';

import Api from '../api';

import * as containerTypes from '../api/ContainersManager';

export default function getActions(api: Api): CompanionActions {
  return {
    ...getConnectionActions(),
    ...getContainerActions(api),
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
