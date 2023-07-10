'use client';

import useConnectionDrawer from '@/hooks/use-connection-drawer';
import Feature, { FeatureProps } from './feature';

type FeatureSectionProps = {
  features: FeatureProps[];
  className?: string;
  variant?: 'react' | 'svelte' | 'xyflow';
};

export default function FeatureSection({
  features,
  variant = 'react',
  className,
}: FeatureSectionProps) {
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
