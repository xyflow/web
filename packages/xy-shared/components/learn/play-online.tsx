import { Cards } from 'nextra/components';
import { useMDXComponents } from 'nextra-theme-docs';

type PlayOnlineProps = {
  frameworkName: string;
  jsHref: string;
  tsHref: string;
};

const { h2: H2, p: P, a: A } = useMDXComponents();

export default function PlayOnline({ frameworkName, jsHref, tsHref }: PlayOnlineProps) {
  return (
    <div>
      <H2>Play online</H2>
      <P>
        You can try {frameworkName} without setting anything up locally by checking out
        the starter projects we have on{' '}
        <A href="https://codesandbox.io" target="_blank">
          CodeSandbox
        </A>
        :
      </P>
      <Cards num={2}>
        <Cards.Card
          title={`${jsHref.replace('https://', '')}`}
          href={jsHref}
          icon={
            <div className="rounded-full w-10 h-10 bg-yellow-200 text-gray-700 font-black flex items-center justify-center">
              JS
            </div>
          }
        />
        <Cards.Card
          title={`${tsHref.replace('https://', '')}`}
          href={tsHref}
          icon={
            <div className="rounded-full w-10 h-10 bg-blue-500 text-white font-black flex items-center justify-center">
              TS
            </div>
          }
        />
      </Cards>
    </div>
  );
}
