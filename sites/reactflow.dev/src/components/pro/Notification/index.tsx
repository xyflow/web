import { Button, cn } from '@xyflow/xy-ui';

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
        'bg-pink-50 text-react p-5 rounded-3xl flex justify-between items-center',
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
