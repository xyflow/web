'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '../../lib/utils';
import { NavDropdown, type NavDropdownItem } from '../pro/Navigation/NavDropdown';
import NavMenu from '../pro/Navigation/NavMenu';
import { Search } from '../search';
import { LogoLabel } from '../ui/logo';

// ─── Dropdown item definitions ───────────────────────────────────────────────

const EXAMPLES_ITEMS: NavDropdownItem[] = [
  {
    icon: 'squares-2x2',
    title: 'All Examples',
    description: 'Browse all example apps.',
    href: '/examples',
  },
  {
    icon: 'sparkles',
    title: 'Pro Examples',
    description: 'Advanced example apps to power production-grade UIs.',
    href: '/pro/examples',
  },
];

const PRO_ITEMS_BASE: NavDropdownItem[] = [
  {
    icon: 'sparkles',
    title: 'Pro Examples',
    description: 'Advanced example apps to power production-grade UIs.',
    href: '/pro/examples',
  },
  {
    icon: 'credit-card',
    title: 'Pricing',
    description: 'Subscribe to unlock Pro Examples and support our team.',
    href: '/pro',
  },
];

const CASE_STUDIES_ITEM: NavDropdownItem = {
  icon: 'document-text',
  title: 'Case Studies',
  description: 'See how teams use React Flow to build incredible products.',
  href: '/pro/case-studies',
};

const MORE_ITEMS_BASE: NavDropdownItem[] = [
  {
    icon: 'megaphone',
    title: 'Changelog',
    description: "What's new in the latest releases.",
    href: '/whats-new',
  },
  {
    icon: 'chat',
    title: 'Contact Us',
    description: 'Get in touch with the team.',
    href: 'https://xyflow.com/contact',
    external: true,
  },
  {
    icon: 'newspaper',
    title: 'Blog',
    description: 'Articles, announcements and community stories.',
    href: 'https://xyflow.com/blog',
    external: true,
  },
];

const PLAYGROUND_ITEM: NavDropdownItem = {
  icon: 'beaker',
  title: 'Playground',
  description: 'Try React Flow live in your browser.',
  href: 'https://play.reactflow.dev',
  external: true,
};

// ─── SiteNavLinks — used as a child of NextraNavbar ──────────────────────────
// mr-auto pushes the right-side icons (Search, GitHub, Discord, NavMenu) to the
// far right while keeping these links flush against the logo on the left.

type SiteNavLinksProps = {
  siteName?: 'React Flow' | 'Svelte Flow';
};

export function SiteNavLinks({ siteName = 'React Flow' }: SiteNavLinksProps) {
  const pathname = usePathname();
  const isReact = siteName === 'React Flow';

  const proItems = isReact ? [...PRO_ITEMS_BASE, CASE_STUDIES_ITEM] : PRO_ITEMS_BASE;
  const moreItems = isReact ? [...MORE_ITEMS_BASE, PLAYGROUND_ITEM] : MORE_ITEMS_BASE;

  const isActive = (prefix: string) => pathname.startsWith(prefix);

  return (
    <div className="hidden md:flex items-center gap-0.5 mr-auto ml-2">
      <NavLink href="/learn" active={isActive('/learn')}>
        Learn
      </NavLink>
      <NavLink href="/api-reference" active={isActive('/api-reference')}>
        Reference
      </NavLink>
      <NavDropdown
        label="Examples"
        items={EXAMPLES_ITEMS}
        active={isActive('/examples')}
      />
      {isReact && (
        <NavLink href="/ui" active={isActive('/ui')}>
          UI
        </NavLink>
      )}
      <NavDropdown label="Pro" items={proItems} active={isActive('/pro')} />
      <NavLink href="/showcase" active={isActive('/showcase')}>
        Showcase
      </NavLink>
      <NavDropdown label="More" items={moreItems} />
    </div>
  );
}

// ─── SiteNavbar — standalone full custom navbar (desktop-only) ───────────────

type SiteNavbarProps = {
  siteName?: 'React Flow' | 'Svelte Flow';
  logoLabel?: string;
  logoLabelClassName?: string;
};

export function SiteNavbar({
  siteName = 'React Flow',
  logoLabel,
  logoLabelClassName,
}: SiteNavbarProps) {
  return (
    <header className="nextra-nav-container sticky top-0 z-[200] w-full bg-transparent print:hidden">
      <div className="nextra-nav-container-blur pointer-events-none absolute inset-0 z-[-1] select-none bg-background shadow-[0_2px_4px_rgba(0,0,0,.02),0_1px_0_rgba(0,0,0,.06)] dark:shadow-[0_-1px_0_rgba(255,255,255,.1)_inset,0_2px_4px_rgba(0,0,0,.2)]" />
      <nav className="mx-auto flex h-[var(--nextra-navbar-height,4rem)] max-w-[90rem] items-center gap-2 pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]">
        <Link
          href="/"
          className="flex shrink-0 items-center hover:opacity-90 transition-opacity"
        >
          <LogoLabel label={logoLabel ?? siteName} labelClassName={logoLabelClassName} />
        </Link>
        <SiteNavLinks siteName={siteName} />
        <div className="flex items-center gap-2">
          <Search />
          <NavMenu siteName={siteName} />
        </div>
      </nav>
    </header>
  );
}

// ─── NavLink helper ───────────────────────────────────────────────────────────

function NavLink({
  href,
  children,
  active,
}: {
  href: string;
  children: React.ReactNode;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
        active
          ? 'text-foreground bg-muted'
          : 'text-foreground/80 hover:text-foreground hover:bg-muted',
      )}
    >
      {children}
    </Link>
  );
}
