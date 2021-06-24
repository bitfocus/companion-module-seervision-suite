import { CompanionPreset, CompanionActions } from '../../../../instance_skel_types';
import InstanceSkel from '../../../../instance_skel';

import Api from '../api';

import getActions from './actions';
import getPresets from './presets';

import * as types from '../types';

type Elements = {
  presets: Array<CompanionPreset>;
  actions: CompanionActions;
};

export default function getElements(api: Api, instance: InstanceSkel<types.Config>): Elements {
  return {
    presets: getPresets(api, instance),
    actions: getActions(api),
  };
}
