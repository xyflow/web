import { cn } from '@xyflow/xy-ui';
import { getFrontmatterTag } from '../lib/utils';

const NUM_DAYS_NEW = 30;
const DAYS_IN_MS = 1000 * 3600 * 24;

function daysFromNow(dateString: string) {
  return Math.ceil(
    (new Date().getTime() - Date.parse(dateString)) / DAYS_IN_MS,
  );
}

export function SidebarTitle({
  title,
  route,
}: {
  title: string;
  route: string;
}) {
  const isProExample = getFrontmatterTag(route, 'is_pro_example');
  const isFree = getFrontmatterTag(route, 'is_free');
  const createdAt = getFrontmatterTag(route, 'created_at');
  const isNew = createdAt && daysFromNow(createdAt) < NUM_DAYS_NEW;

  const className = cn(
    'sidebar-title',
    { pro: isProExample },
    { free: isFree },
    { new: isNew },
    { pill: isNew || isProExample },
  );

  return <div className={className}>{title}</div>;
}
