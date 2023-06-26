import type { PlanId } from '../../../config/plans';

export type Subscription = {
  id: string;
  user_id: string;
  subscription_plan_id: PlanId;
  stripe_customer_id?: string;
  sent_welcome_mail: boolean;
};
