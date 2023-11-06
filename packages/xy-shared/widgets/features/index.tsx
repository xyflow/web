'use client';

import { ReactNode } from 'react';
import { useConnectionDrawer } from '../../hooks/use-connection-drawer';
import { Feature, type FeatureProps } from './feature';

type Feature = {
  title: ReactNode;
  text: string;
  route: string;
  flowComponent?: React.ComponentType;
};

type FeaturesProps = {
  features: Feature[];
  className?: string;
};

function Features({ features, className }: FeaturesProps) {
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

export { Features, Feature, type FeatureProps, type FeaturesProps };
