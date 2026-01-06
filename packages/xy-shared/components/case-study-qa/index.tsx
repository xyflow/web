import { Text, cn } from '../../';

type CaseStudyQAProps = {
  question: string;
  answer: string;
  className?: string;
};

export default function CaseStudyQA({ question, answer, className }: CaseStudyQAProps) {
  return (
    <>
      <Text size="lg" className={cn(['font-semibold leading-relaxed', className])}>
        {question}
      </Text>

      <blockquote>
        <Text size="lg" className="mt-2 mb-12 leading-relaxed">
          {answer}
        </Text>
      </blockquote>
    </>
  );
}
