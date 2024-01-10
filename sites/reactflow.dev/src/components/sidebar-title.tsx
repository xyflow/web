import { cn } from '@xyflow/xy-ui';
import { isProExample } from '@/utils';

export default function SidebarTitle({
  title,
  type,
  route,
}: {
  title: string;
  type: string;
  route: string;
}) {
  const className = cn('sidebar-title', { pro: isProExample(route) });

  console.log(cn(className, undefined));

  // displayPill(route);

  // console.log(title, type, route);

  return <div className={className}>{title}</div>;
}
