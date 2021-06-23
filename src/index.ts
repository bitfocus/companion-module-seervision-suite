import InstanceSkel = require('../../../instance_skel');
import Api from './api';

import * as instanceSkelTypes from '../../../instance_skel_types';

import * as types from './types';

class SeervisionInstance extends InstanceSkel<types.Config> {
  #api: Api | null;

  constructor(system: instanceSkelTypes.CompanionSystem, id: string, config: types.Config) {
    super(system, id, config);

    this.#api = null;
    this.initActions();
  }

  config_fields(): instanceSkelTypes.CompanionInputFieldTextInput[] {
    return [
      {
        type: 'textinput',
        id: 'host',
        label: 'IP Address',
        default: '10.10.12.101',
        regex: this.REGEX_IP,
      },
    ];
  }

  destroy(): void {
    this.#api?.closeConnection();
  }

  init(): void {
    this.initConnection();
  }

  async initConnection(): Promise<void> {
    this.#api = new Api(this.config.host);
    this.#api.onContainersUpdated(() => this.initActions());
    await this.#api.waitForConnection();
    this.#api.subscribeToContainers();
  }

  initActions(): void {
    const actions = {};

    const containers = this.#api?.containers ?? [];
    actions['recall_container'] = {
      label: 'Recall Container',
      options: [
        {
          type: 'dropdown',
          id: 'containerId',
          default: containers[0]?.id,
          choices: containers.map(({ id, name: label }) => ({ id, label })) ?? [],
          minChoicesForSearch: 0,
        },
      ],
    };

    actions['reset_connection'] = {
      label: 'Reset Connection',
    };

    this.setActions(actions);

    const presets: Array<instanceSkelTypes.CompanionPreset> = [
      {
        category: 'Connection',
        label: 'Reset connection',
        bank: {
          style: 'text',
          text: `Reset connection`,
          size: 'auto',
          color: this.rgb(255, 255, 255),
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
      ...containers.map(
        ({ id, name }) =>
          ({
            category: 'Containers',
            label: 'Recall container',
            bank: {
              style: 'text',
              text: `Recall "${name}"`,
              size: 'auto',
              color: this.rgb(255, 255, 255),
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
          } as instanceSkelTypes.CompanionPreset)
      ),
    ];
    this.setPresetDefinitions(presets);
  }

  action(action: instanceSkelTypes.CompanionActionEvent): void {
    const options = action.options;

    switch (action.action) {
      case 'recall_container':
        this.#api?.recallContainer(options.containerId?.toString() ?? '');
        break;
      case 'reset_connection':
        this.resetConnection();
    }
  }

  updateConfig(config: types.Config): void {
    const didHostChange = this.config.host !== config.host;
    this.config = config;

    if (didHostChange) {
      this.resetConnection();
    }
  }

  resetConnection(): void {
    this.#api?.closeConnection();
    this.initConnection();
  }
}

export = SeervisionInstance;
