import { Framework, ProExampleConfig, Currency } from '@/types';

export async function getExampleList({
  framework,
}: {
  framework?: Framework;
} = {}): Promise<ProExampleConfig[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PRO_EXAMPLES_URL}/examples.json`,
    {
      next: { tags: ['examples'] },
    },
  );
  const examples = await response.json();
  return examples
    .filter((example) => (framework ? example.framework === framework : true))
    .map((example) => ({ ...example, framework: 'react' }));
}

export async function getExampleConfig({ id }: { id: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PRO_EXAMPLES_URL}/${id}/config.json`,
    {
      next: { tags: ['examples'] },
    },
  );
  const config = await response.json();
  return config;
}

export function getCurrencySign(currency?: Currency) {
  switch (currency) {
    case Currency.EUR:
      return '€';
    case Currency.INR:
      return '₹';
    default:
      return '$';
  }
}
