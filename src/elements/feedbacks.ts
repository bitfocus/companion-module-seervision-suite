import { CompanionFeedbacks } from '../../../../instance_skel_types';

import Api from '../api';
import { Instance } from '../types';

export default function getFeedbacks(api: Api, instance: Instance): CompanionFeedbacks {
  return {
    set_is_tracking: {
      type: 'advanced',
      label: 'Is system tracking',
      description: 'Changes button style based on whether the system is tracking or not',
      options: [],
      callback: () => {
        return api.trackingManager.isTracking()
          ? {
              text: 'Stop tracking',
              bgcolor: instance.rgb(192, 37, 40),
              color: instance.rgb(255, 255, 255),
            }
          : {
              text: 'Start tracking',
              bgcolor: instance.rgb(29, 129, 57),
              color: instance.rgb(255, 255, 255),
            };
      },
    },
  };
}
