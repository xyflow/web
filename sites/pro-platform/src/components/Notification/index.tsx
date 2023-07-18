import { Button } from 'xy-ui';

type NotificationProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  button?: { label: string; href: string };
};

// @todo maybe move this into ui package
export default function ({ title, description, button }: NotificationProps) {
  return (
    <div className="bg-pink-50 text-react border-react p-5 border rounded-3xl flex justify-between items-center">
      <div>
        {title && <div className="font-black">{title}</div>}
        {description && <div>{description}</div>}
      </div>
      {button && (
        <a href={button.href}>
          <Button variant="react">{button.label}</Button>
        </a>
      )}
    </div>
  );
}
