import Link from 'next/link';

const FooterHeading = (props: React.PropsWithChildren) => <div className="my-6 font-bold" {...props} />;

const FooterLink = ({
  isExternal = false,
  href,
  ...rest
}: React.PropsWithChildren & { isExternal?: boolean; href: string }) => (
  <div>{isExternal ? <a href={href} {...rest} /> : <Link href={href} {...rest} />}</div>
);

export default function Footer() {
  return (
    <div className="min-h-300 border-t">
      <div className="max-w-7xl px-4 pt-4 pb-10 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div>
            <FooterHeading>React Flow Pro</FooterHeading>
            <FooterLink href="/">Home</FooterLink>
            <FooterLink href="/pricing">Pricing</FooterLink>
            <FooterLink href="/pro-examples">Pro Examples</FooterLink>
            <FooterLink href="/info">Info</FooterLink>
            <FooterLink href="/signup">Sign up</FooterLink>
            <FooterLink href="/login">Sign in</FooterLink>
          </div>
          <div>
            <FooterHeading>Resources</FooterHeading>
            <FooterLink isExternal href="https://reactflow.dev/docs">
              Documentation
            </FooterLink>
            <FooterLink isExternal href="https://reactflow.dev/examples">
              Examples
            </FooterLink>
            <FooterLink isExternal href="https://github.com/xyflow/xyflow">
              Github
            </FooterLink>
            <FooterLink isExternal href="https://discord.gg/Bqt6xrs">
              Discord
            </FooterLink>
          </div>
          <div>
            <FooterHeading>Company</FooterHeading>
            <FooterLink href="/contact">Contact</FooterLink>
            <FooterLink href="/terms">Terms of Use</FooterLink>
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/about-us">About Us</FooterLink>
          </div>
        </div>
        <div className="text-sm text-gray-500 text-center mt-10">
          <a href="mailto:info@xyflow.com">info@xyflow.com</a> — Copyright © 2023 webkid GmbH. All rights reserved.
        </div>
      </div>
    </div>
  );
}
