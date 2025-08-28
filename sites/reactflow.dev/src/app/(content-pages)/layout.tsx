// export const dynamic = 'force-static';

export const revalidate = false;

export default function Layout({ children }: LayoutProps<'/'>) {
  return children;
}
