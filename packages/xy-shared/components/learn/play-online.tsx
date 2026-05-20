import { Cards } from 'nextra/components';
import { useMDXComponents } from 'nextra-theme-docs';
import { getFramework } from '../../lib/get-framework';

export default function PlayOnline() {
  const { framework, library } = getFramework();
  const jsHref = `https://new.${framework}flow.dev/js`;
  const tsHref = `https://new.${framework}flow.dev/ts`;

  const mdxComponents = useMDXComponents();

  const H2 = mdxComponents.h2 ?? 'h2';
  const P = mdxComponents.p ?? 'p';
  const A = mdxComponents.a ?? 'a';

  return (
    <div>
      <H2>Play online</H2>
      <P>
        You can try {library} without setting anything up locally by checking out the
        starter projects we have on{' '}
        <A href="https://codesandbox.io" target="_blank" rel="noopener noreferrer">
          CodeSandbox
        </A>
        :
      </P>
      <Cards num={2}>
        <Cards.Card
          title={`${jsHref.replace('https://', '')}`}
          href={jsHref}
          icon={
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-200 font-black text-gray-700">
              JS
            </div>
          }
        />
        <Cards.Card
          title={`${tsHref.replace('https://', '')}`}
          href={tsHref}
          icon={
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 font-black text-white">
              TS
            </div>
          }
        />
      </Cards>
    </div>
  );
}
