import InstanceSkel = require('../../../instance_skel');
import Api from './api';
import getElements from './elements';

import * as instanceSkelTypes from '../../../instance_skel_types';
import * as types from './types';

class SeervisionInstance extends InstanceSkel<types.Config> {
  #api: Api | null;

  constructor(system: instanceSkelTypes.CompanionSystem, id: string, config: types.Config) {
    super(system, id, config);

    this.#api = null;
    this.initConnection();
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
    this.initElements();
    this.initConnection();
  }

  initConnection(): void {
    this.#api = new Api(this.config.host, () => this.initElements());
    this.#api.init();
  }

  initElements(): void {
    if (!this.#api) {
      this.setActions({});
      this.setPresetDefinitions([]);
      return;
    }

    const { actions, presets } = getElements(this.#api, this);

    this.setActions(actions);
    this.setPresetDefinitions(presets);
  }

  action(action: instanceSkelTypes.CompanionActionEvent): void {
    const options = action.options;

    switch (action.action) {
      case 'recall_container':
        this.#api?.containersManager.recallContainer(options.containerId?.toString() ?? '');
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
