import type { Metadata } from 'next'
import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import type { FC, ReactNode } from 'react'
import reactFlowPackageJson from '@xyflow/react/package.json';
import '../global.css';

export const metadata: Metadata = {
  description: 'React Flow - Customizable library for rendering workflows, diagrams and node-based UIs.',
  // metadataBase: new URL('https://nextra.site'),
  keywords: reactFlowPackageJson.keywords,
  generator: 'Next.js',
  applicationName: 'React Flow',
  appleWebApp: {
    title: 'React Flow'
  },
  title: {
    default: 'Node-Based UIs in React',
    template: '%s - React Flow'
  },
  openGraph: {
    // https://github.com/vercel/next.js/discussions/50189#discussioncomment-10826632
    url: './',
    siteName: 'React Flow',
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    site: 'https://x.com/xyflowdev',
    card: 'summary_large_image',
    creator: '@xyflowdev'
  },
  alternates: {
    // https://github.com/vercel/next.js/discussions/50189#discussioncomment-10826632
    canonical: './'
  }
}

const navbar = (
  <Navbar
    // logo={
    //   <NextraLogo
    //     height="20"
    //     className={cn(
    //       'hover:transition-all hover:duration-1000 motion-reduce:hover:transition-none',
    //       '[mask-image:linear-gradient(60deg,#000_25%,rgba(0,0,0,.2)_50%,#000_75%)] [mask-position:0] [mask-size:400%]',
    //       'hover:[mask-position:100%]'
    //     )}
    //   />
    // }
    logo={<b>Hello</b>}
    projectLink="https://github.com/shuding/nextra"
  />
)
const footer = (
  <Footer className="flex-col items-center md:items-start">
    <a
      className="x:focus-visible:nextra-focus flex items-center gap-1"
      target="_blank"
      rel="noreferrer"
      title="vercel.com homepage"
      href="https://vercel.com?utm_source=nextra.site"
    >
      Powered by
      {/*<VercelLogo height="20" />*/}
    </a>
    <p className="mt-6 text-xs">
      © {new Date().getFullYear()} The Nextra Project.
    </p>
  </Footer>
)

import { ntDapperFont, fontClassNames } from 'xy-shared/fonts';

const RootLayout: FC<{
  children: ReactNode
}> = async ({ children }) => {
  const pageMap = await getPageMap()
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning className={ntDapperFont.className}>
    <Head />
    <body>
    <Layout
      navbar={navbar}
      footer={footer}
      pageMap={pageMap}
      docsRepositoryBase="https://github.com/xyflow/web/tree/main/sites/reactflow.dev"
      editLink="Edit this page on GitHub"
      darkMode={false}
      search={null}
      nextThemes={{
       forcedTheme: 'light',
       defaultTheme: 'light',
     }}
    >
      {children}
    </Layout>
    </body>
    </html>
  )
}

export default RootLayout
