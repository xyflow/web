import type { Metadata } from 'next'
import { Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import type { FC, ReactNode } from 'react'
import reactFlowPackageJson from '@xyflow/react/package.json';
import './global.css'
import { Search } from './search';
import { Footer } from './footer';

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
    logo={<LogoLabel label="React Flow" labelClassName="mr-5 md:max-lg:hidden" />}
    logoLink={false}
    projectLink="https://github.com/shuding/nextra"
  />
)
const footer = (
  <Footer />
)

import { ntDapperFont, fontClassNames } from 'xy-shared/fonts';
import { LogoLabel } from '@xyflow/xy-ui';

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
