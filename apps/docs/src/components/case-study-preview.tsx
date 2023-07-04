import Link from 'next/link';
import { RxArrowRight } from 'react-icons/rx';

type CaseStudyPreviewProps = {
  client: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  route: string;
  className?: string;
};

export default function CaseStudyPreview({
  client,
  title,
  description,
  route,
  className,
}: CaseStudyPreviewProps) {
  return (
    <div className={className}>
      <div className="text-sm text-light">{client}</div>
      <div className="font-bold text-2xl mb-4 mt-1">{title}</div>
      <div className="text-light leading-snug mb-4">{description}</div>
      <div>
        <Link href={route}>
          Read more <RxArrowRight className="inline w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
