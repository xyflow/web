'use client';

import { useState, useRef, type ComponentType, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  BeakerIcon,
  ChatBubbleLeftRightIcon,
  ChevronDownIcon,
  CreditCardIcon,
  DocumentTextIcon,
  MegaphoneIcon,
  NewspaperIcon,
  SparklesIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';
import { cn } from '../../../lib/utils';
import NavMenu from './NavMenu';
import { Search } from '../../search';
import { LogoLabel } from '../../ui/logo';

export type NavDropdownIcon =
  | 'beaker'
  | 'chat'
  | 'credit-card'
  | 'document-text'
  | 'megaphone'
  | 'newspaper'
  | 'sparkles'
  | 'squares-2x2';

const iconMap = {
  beaker: BeakerIcon,
  chat: ChatBubbleLeftRightIcon,
  'credit-card': CreditCardIcon,
  'document-text': DocumentTextIcon,
  megaphone: MegaphoneIcon,
  newspaper: NewspaperIcon,
  sparkles: SparklesIcon,
  'squares-2x2': Squares2X2Icon,
} satisfies Record<NavDropdownIcon, ComponentType<{ className?: string }>>;

export type NavDropdownItem = {
  icon: NavDropdownIcon;
  title: string;
  description: string;
  href: string;
  external?: boolean;
};

type NavDropdownProps = {
  label: ReactNode;
  items: NavDropdownItem[];
  active?: boolean;
};

export function NavDropdown({ label, items, active }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button
        className={cn(
          'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
          'text-foreground/80 hover:text-foreground hover:bg-muted',
          (open || active) && 'bg-muted text-foreground',
        )}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {label}
        <ChevronDownIcon
          className={cn(
            'h-3 w-3 text-muted-foreground transition-transform duration-200',
            open && 'rotate-180',
          )}
        />
      </button>

      <div
        className={cn(
          'absolute left-0 top-full pt-2 z-[201] transition-all duration-150',
          open
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-1 pointer-events-none',
        )}
        role="menu"
        aria-hidden={!open}
      >
        <div className="bg-background border border-border rounded-xl shadow-2xl p-2 w-[340px]">
          {items.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <Link
                key={item.href}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noreferrer' : undefined}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
                role="menuitem"
                onClick={() => setOpen(false)}
              >
                <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors mt-0.5 shrink-0" />
                <div>
                  <div className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {item.description}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

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

function NavLink({
  href,
  children,
  active,
}: {
  href: string;
  children: ReactNode;
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
