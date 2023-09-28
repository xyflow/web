import Image from 'next/image';

import { Text, cn } from 'xy-ui';

import apple from '../../public/img/clients/apple.svg';
import stripe from '../../public/img/clients/stripe.svg';
import microsoft from '../../public/img/clients/microsoft.svg';
import intuit from '../../public/img/clients/intuit.svg';

export default function ClientLogos({
  title = 'Some of our subscribers',
  className,
}: {
  title?: string;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col items-center w-full', className)}>
      <Text variant="light">{title}</Text>
      <div className="flex items-center space-x-12 mt-4">
        <Image src={apple} alt="apple" className="h-7 w-auto" />
        <Image src={stripe} alt="stripe" className="h-7 w-auto" />
        <Image src={microsoft} alt="microsoft" className="h-7 w-auto" />
        <Image src={intuit} alt="intuit" className="h-7 w-auto" />
      </div>
    </div>
  );
}
