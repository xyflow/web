'use client';

import useConnectionDrawer from '@/hooks/use-connection-drawer';
import Feature, { FeatureProps } from './feature';

type FeaturesProps = {
  features: FeatureProps[];
  className?: string;
};

export default function Features({ features, className }: FeaturesProps) {
  const ref = useConnectionDrawer();

  return (
    <div className={className} ref={ref}>
      {features.map((feature, index) => (
        <Feature
          key={`feature-${index}`}
          featureCount={features.length}
          index={index}
          {...feature}
        />
      ))}
    </div>
  );
}
