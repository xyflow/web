import { Text } from 'xy-ui';

type CaseStudyQAProps = {
  question?: string;
  answer?: string;
  className?: string;
};

export default function CaseStudyQA({
  question,
  answer,
  className,
}: CaseStudyQAProps) {
  return (
    <div className={className}>
      <Text size="lg" className="mt-12 font-semibold leading-relaxed">
        {question}
      </Text>
      <Text size="lg" className="mt-2 leading-relaxed">
        {answer}
      </Text>
    </div>
  );
}
