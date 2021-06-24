import { CompanionPreset } from '../../../../instance_skel_types';
import InstanceSkel from '../../../../instance_skel';

import Api from '../api';

import * as types from '../types';

type Instance = InstanceSkel<types.Config>;

export default function getPresets(api: Api, instance: Instance): Array<CompanionPreset> {
  return [...getConnectionPresets(instance), ...getContainerPresets(api, instance)];
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
  ];
}

function getContainerPresets(api: Api, instance: Instance): Array<CompanionPreset> {
  const containers = api.containersManager.getContainers();

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
          feedbacks: [],
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
  ];
}
