'use client';

import useConnectionDrawer from '@/hooks/use-connection-drawer';
import Feature, { FeatureProps } from './feature';

type FeaturesProps = {
  features: FeatureProps[];
  className?: string;
  variant?: 'react' | 'svelte' | 'xyflow';
};

export default function Features({
  features,
  variant = 'react',
  className,
}: FeaturesProps) {
  const ref = useConnectionDrawer();

  return (
    <div className={className} ref={ref}>
      {features.map((feature, index) => (
        <Feature
          key={`feature-${index}`}
          variant={variant}
          featureCount={features.length}
          index={index}
          {...feature}
        />
      ))}
    </div>
  );
}
