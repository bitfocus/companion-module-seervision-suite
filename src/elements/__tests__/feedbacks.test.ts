import getFeedbacks from '../feedbacks';
import Api from '../../api';
import InstanceSkeleton from '../..';

jest.mock('../../api');
jest.mock('../..');

const FEEDBACKS_COUNT = 3;

const api: Api = new (Api as jest.Mock)();
const instance: InstanceSkeleton = new (InstanceSkeleton as any)();

describe('feedbacks', () => {
  it(`returns ${FEEDBACKS_COUNT} feedbacks`, () => {
    const feedbacks = getFeedbacks(api, instance);
    expect(Object.keys(feedbacks).length).toEqual(FEEDBACKS_COUNT);
  });
});
