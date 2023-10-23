import Image from 'next/image';

import { Text, cn } from 'xy-ui';

import benchling from '../../public/img/clients/benchling.svg';
import stripe from '../../public/img/clients/stripe.svg';
import cartoworkflows from '../../public/img/clients/cartoworkflows.svg';
import intuit from '../../public/img/clients/intuit.svg';
import railway from '../../public/img/clients/railway.svg';
import retool from '../../public/img/clients/retool.svg';
import doubleloop from '../../public/img/clients/doubleloop.svg';
import onesignal from '../../public/img/clients/onesignal.svg';

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
      <div className="grid grid-cols-4 gap-12 place-items-center">
        {/* <div className="flex items-center space-x-12 mt-4"> */}
        <Image src={benchling} alt="benchling" className="h-7 w-auto" />
        <Image src={stripe} alt="stripe" className="h-7 w-auto" />
        <Image
          src={cartoworkflows}
          alt="carto workflows"
          className="h-7 w-auto"
        />
        <Image src={intuit} alt="intuit" className="h-7 w-auto" />
        <Image src={railway} alt="railway" className="h-7 w-auto" />
        <Image src={retool} alt="retool" className="h-7 w-auto" />
        <Image src={doubleloop} alt="doubleloop" className="h-7 w-auto" />
        <Image src={onesignal} alt="onesignal" className="h-7 w-auto" />
      </div>
    </div>
  );
}
