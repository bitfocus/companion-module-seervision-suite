import Api from '../../api';
import InstanceSkeleton from '../..';

import getActions from '../actions';
import getPresets from '../presets';
import getFeedbacks from '../feedbacks';

jest.mock('../../api');
jest.mock('../..');

const PRESETS_COUNT = 14;

const api: Api = new (Api as jest.Mock)();
const instance: InstanceSkeleton = new (InstanceSkeleton as any)();

describe('feedbacks', () => {
  it(`returns ${PRESETS_COUNT} presets`, () => {
    const presets = getPresets(api, instance);
    expect(presets.length).toEqual(PRESETS_COUNT);
  });

  it('has valid actions associated with each preset', () => {
    const presets = getPresets(api, instance);
    const actions = getActions(api);

    presets.forEach((preset) => {
      preset.actions.forEach((action) => {
        expect(actions[action.action]).toBeTruthy();
      });
    });
  });

  it('has valid feedbacks associated with each preset', () => {
    const presets = getPresets(api, instance);
    const feedbacks = getFeedbacks(api, instance);

    presets.forEach((preset) => {
      preset.feedbacks.forEach((feedback) => {
        expect(feedbacks[feedback.type]).toBeTruthy();
      });
    });
  });
});
