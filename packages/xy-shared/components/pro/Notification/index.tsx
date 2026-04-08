import { Button } from '../../ui/button';
import { cn } from '../../../lib/utils';

type NotificationProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  button?: { label: string; href: string };
} & React.HTMLAttributes<HTMLDivElement>;

// @todo maybe move this into ui package
export default function Notification({
  title,
  description,
  button,
  className,
  ...rest
}: NotificationProps) {
  return (
    <div
      className={cn(
        'text-primary flex items-center justify-between rounded-3xl bg-pink-50 p-5',
        className,
      )}
      {...rest}
    >
      <div>
        {title && <div className="font-black">{title}</div>}
        {description && <div>{description}</div>}
      </div>
      {button && (
        <a href={button.href}>
          <Button>{button.label}</Button>
        </a>
      )}
    </div>
  );
}
