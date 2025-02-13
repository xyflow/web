// TODO: move this file to xy-shared after Nextra 4 migration
import { cn } from '@xyflow/xy-ui';
import { FC } from 'react';

const NUM_DAYS_NEW = 30;
const DAYS_IN_MS = 1000 * 3600 * 24;

function daysFromNow(dateString: string) {
  return Math.ceil(
    (new Date().getTime() - Date.parse(dateString)) / DAYS_IN_MS,
  );
}

export const SidebarTitle: FC<{
  title: string;
  frontMatter: Record<string, any>;
}> = ({ title, frontMatter }) => {
  const isProExample = frontMatter.is_pro_example;
  const isFree = frontMatter.is_free;
  const createdAt = frontMatter.created_at;
  const isNew = createdAt && daysFromNow(createdAt) < NUM_DAYS_NEW;

  const className = cn(
    'sidebar-title',
    { pro: isProExample },
    { free: isFree },
    { new: isNew },
    { pill: isNew || isProExample },
  );

  return <div className={className}>{title}</div>;
};
