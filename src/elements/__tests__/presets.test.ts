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

  describe('preset actions', () => {
    const actions = getActions(api);

    const presetActions: Set<string> = getPresets(api, instance).reduce((acc, preset) => {
      preset.actions.forEach((action) => acc.add(action.action));
      return acc;
    }, new Set() as Set<string>);
    const actionTests: Array<{ action: string }> = Array.from(presetActions).map((action) => ({
      action,
    }));

    test.each(actionTests)('$action is a valid action', ({ action }) => {
      expect(actions[action]).toBeTruthy();
    });
  });

  describe('preset feedbacks', () => {
    const feedbacks = getFeedbacks(api, instance);

    const presetFeedbacks: Set<string> = getPresets(api, instance).reduce((acc, preset) => {
      preset.feedbacks.forEach((feedback) => acc.add(feedback.type));
      return acc;
    }, new Set() as Set<string>);
    const feedbackTests: Array<{ feedback: string }> = Array.from(presetFeedbacks).map(
      (feedback) => ({
        feedback,
      })
    );

    test.each(feedbackTests)('$feedback is a valid feedback', ({ feedback }) => {
      expect(feedbacks[feedback]).toBeTruthy();
    });
  });
});
