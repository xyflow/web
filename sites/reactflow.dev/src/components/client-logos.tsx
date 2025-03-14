import Image from 'next/image';
import { Text, cn } from '@xyflow/xy-ui';

import zapier from '../../public/img/clients/zapier.svg';
import stripe from '../../public/img/clients/stripe.svg';
import cartoWorkflows from '../../public/img/clients/carto.svg';
import railway from '../../public/img/clients/railway.svg';
import retool from '../../public/img/clients/retool.svg';
import doubleloop from '../../public/img/clients/doubleloop.svg';
import onesignal from '../../public/img/clients/onesignal.svg';
import close from '../../public/img/clients/close.svg';

export default function ClientLogos({
  title = 'Used By',
  className,
}: {
  title?: string;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col items-center w-full', className)}>
      <Text variant="light" className="mb-8">
        {title}
      </Text>
      <div className="grid md:grid-cols-4 grid-cols-2 md:gap-12 gap-8 place-items-center">
        <Image src={zapier} alt="zapier" className="h-7 w-auto" />
        <Image src={stripe} alt="stripe" className="h-7 w-auto" />
        <Image
          src={cartoWorkflows}
          alt="carto workflows"
          className="h-9 w-auto"
        />
        <Image src={close} alt="close" className="h-7 w-auto" />
        <Image src={railway} alt="railway" className="h-9 w-auto" />
        <Image src={retool} alt="retool" className="h-6 w-auto" />
        <Image src={doubleloop} alt="doubleloop" className="h-7 w-auto" />
        <Image src={onesignal} alt="onesignal" className="h-7 w-auto" />
      </div>
    </div>
  );
}
