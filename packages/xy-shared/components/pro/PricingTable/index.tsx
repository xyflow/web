import { requireSession } from '../../../lib/nhost';
import PricingTableComponent from './pricing-table';

export default async function PricingTable() {
  const { user } = await requireSession();
  return <PricingTableComponent user={user} />;
}
