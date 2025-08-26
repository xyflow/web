// TODO check if we can have static layout here
// export const dynamic = 'force-static';
export const dynamicParams = false;

export default function Layout({ children }: LayoutProps<'/'>) {
  return children;
}
