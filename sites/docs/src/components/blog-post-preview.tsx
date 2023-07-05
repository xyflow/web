import Link from 'next/link';
import { RxArrowRight } from 'react-icons/rx';

import AuthorList from '@/components/authors-list';

type BlogPostPreviewProps = {
  date: React.ReactNode;
  title: React.ReactNode;
  intro: React.ReactNode;
  authors: string[];
  route: string;
  className?: string;
};

export default function BlogPostPreview({
  date,
  title,
  intro,
  authors,
  route,
  className,
}: BlogPostPreviewProps) {
  return (
    <div className={className}>
      <div className="text-sm text-light">{date}</div>
      <div className="font-bold text-4xl mb-4 mt-1 underline-offset-2 underline">
        {title}
      </div>
      <div className="text-light leading-snug mb-4">{intro}</div>

      <AuthorList authors={authors} className="mb-2" />

      <div>
        <Link href={route}>
          Read more <RxArrowRight className="inline w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
