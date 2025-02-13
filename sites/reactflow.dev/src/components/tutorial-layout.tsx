import { FC } from 'react';
import { BaseBlogPostLayout } from 'xy-shared';
import { useConfig } from 'nextra-theme-docs';

export const TutorialLayout: FC = () => {
  const { activeMetadata } = useConfig().normalizePagesResult;
  return (
    <BaseBlogPostLayout frontMatter={activeMetadata}>
      {children}
    </BaseBlogPostLayout>
  );
};
