import { CompanionActions } from '../../../../instance_skel_types';

import Api from '../api';

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
  } as CompanionActions;
}
