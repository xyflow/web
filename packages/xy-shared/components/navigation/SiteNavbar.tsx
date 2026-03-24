'use client';

import {
  useId,
  useRef,
  useState,
  type ComponentType,
  type FocusEvent,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
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
import { getFramework } from '../../lib/get-framework';
import { cn } from '../../lib/utils';
import { Search } from '../search';

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
  href?: string;
};

export function NavDropdown({ label, items, active, href }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);
  const triggerLinkRef = useRef<HTMLAnchorElement>(null);
  const menuId = useId();

  const handleMouseEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  const handleFocus = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    const nextFocused = event.relatedTarget;

    if (nextFocused instanceof Node && containerRef.current?.contains(nextFocused)) {
      return;
    }

    setOpen(false);
  };

  const focusFirstItem = () => {
    const firstItem =
      containerRef.current?.querySelector<HTMLAnchorElement>('a[role="menuitem"]');
    firstItem?.focus();
  };

  const handleTriggerKeyDown = (
    event: KeyboardEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => {
    if (event.key === 'ArrowDown' || event.key === ' ') {
      event.preventDefault();
      setOpen(true);
      requestAnimationFrame(focusFirstItem);
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
      triggerButtonRef.current?.focus();
      triggerLinkRef.current?.focus();
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {href ? (
        <Link
          ref={triggerLinkRef}
          href={href}
          className={cn(
            'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
            'text-foreground/80 hover:text-foreground hover:bg-muted',
            (open || active) && 'bg-muted text-foreground',
          )}
          aria-expanded={open}
          aria-haspopup="menu"
          aria-controls={menuId}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onKeyDown={handleTriggerKeyDown}
        >
          {label}
          <ChevronDownIcon
            className={cn(
              'h-3 w-3 text-muted-foreground transition-transform duration-200',
              open && 'rotate-180',
            )}
          />
        </Link>
      ) : (
        <button
          ref={triggerButtonRef}
          type="button"
          className={cn(
            'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
            'text-foreground/80 hover:text-foreground hover:bg-muted',
            (open || active) && 'bg-muted text-foreground',
          )}
          aria-expanded={open}
          aria-haspopup="menu"
          aria-controls={menuId}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onKeyDown={handleTriggerKeyDown}
        >
          {label}
          <ChevronDownIcon
            className={cn(
              'h-3 w-3 text-muted-foreground transition-transform duration-200',
              open && 'rotate-180',
            )}
          />
        </button>
      )}

      <div
        id={menuId}
        className={cn(
          'absolute left-0 top-full pt-2 z-[201] transition-all duration-150',
          open
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-1 pointer-events-none',
        )}
        role="menu"
        aria-hidden={!open}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
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
                tabIndex={open ? 0 : -1}
                onClick={() => setOpen(false)}
                onKeyDown={(event) => {
                  if (event.key === 'Escape') {
                    event.preventDefault();
                    setOpen(false);
                    triggerButtonRef.current?.focus();
                    triggerLinkRef.current?.focus();
                  }
                }}
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

const PRO_ITEMS_BASE: NavDropdownItem[] = [
  {
    icon: 'sparkles',
    title: 'Pro Content',
    description: 'Advanced example apps and templates to power production-grade UIs.',
    href: '/pro/content',
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

function SiteNavLinks() {
  const pathname = usePathname();
  const { framework } = getFramework();
  const isReact = framework === 'react';

  const proItems = isReact ? [...PRO_ITEMS_BASE, CASE_STUDIES_ITEM] : PRO_ITEMS_BASE;
  const moreItems = isReact ? [...MORE_ITEMS_BASE, PLAYGROUND_ITEM] : MORE_ITEMS_BASE;

  const isActive = (prefix: string) => pathname.startsWith(prefix);

  return (
    <div className="hidden md:flex items-center gap-0.5 mr-auto">
      <NavLink href="/learn" active={isActive('/learn')}>
        Learn
      </NavLink>
      <NavLink href="/api-reference" active={isActive('/api-reference')}>
        Reference
      </NavLink>
      <NavLink href="/examples" active={isActive('/examples')}>
        Examples
      </NavLink>
      {/* <NavDropdown label="Examples" items={EXAMPLES_ITEMS} href="/examples" /> */}
      {isReact && (
        <NavLink href="/ui" active={isActive('/ui')}>
          UI
        </NavLink>
      )}
      <NavLink href="/showcase" active={isActive('/showcase')}>
        Showcase
      </NavLink>
      <NavDropdown label="Pro" href="/pro" items={proItems} active={isActive('/pro')} />
      <NavDropdown label="More" items={moreItems} />
    </div>
  );
}

export function SiteNavbarContent({ initialNavMenu }: { initialNavMenu: ReactNode }) {
  return (
    <>
      <SiteNavLinks />
      <Search />
      <a
        className="xy-link-gray focus-visible:nextra-focus"
        href="https://github.com/xyflow/xyflow"
        target="_blank"
        rel="noreferrer"
      >
        <svg
          className="nav-github-logo"
          fill="currentColor"
          viewBox="3 3 18 18"
          width="20"
        >
          <title>GitHub</title>
          <path d="M12 3C7.0275 3 3 7.12937 3 12.2276C3 16.3109 5.57625 19.7597 9.15374 20.9824C9.60374 21.0631 9.77249 20.7863 9.77249 20.5441C9.77249 20.3249 9.76125 19.5982 9.76125 18.8254C7.5 19.2522 6.915 18.2602 6.735 17.7412C6.63375 17.4759 6.19499 16.6569 5.8125 16.4378C5.4975 16.2647 5.0475 15.838 5.80124 15.8264C6.51 15.8149 7.01625 16.4954 7.18499 16.7723C7.99499 18.1679 9.28875 17.7758 9.80625 17.5335C9.885 16.9337 10.1212 16.53 10.38 16.2993C8.3775 16.0687 6.285 15.2728 6.285 11.7432C6.285 10.7397 6.63375 9.9092 7.20749 9.26326C7.1175 9.03257 6.8025 8.08674 7.2975 6.81794C7.2975 6.81794 8.05125 6.57571 9.77249 7.76377C10.4925 7.55615 11.2575 7.45234 12.0225 7.45234C12.7875 7.45234 13.5525 7.55615 14.2725 7.76377C15.9937 6.56418 16.7475 6.81794 16.7475 6.81794C17.2424 8.08674 16.9275 9.03257 16.8375 9.26326C17.4113 9.9092 17.76 10.7281 17.76 11.7432C17.76 15.2843 15.6563 16.0687 13.6537 16.2993C13.98 16.5877 14.2613 17.1414 14.2613 18.0065C14.2613 19.2407 14.25 20.2326 14.25 20.5441C14.25 20.7863 14.4188 21.0746 14.8688 20.9824C16.6554 20.364 18.2079 19.1866 19.3078 17.6162C20.4077 16.0457 20.9995 14.1611 21 12.2276C21 7.12937 16.9725 3 12 3Z" />
        </svg>
      </a>
      <a
        className="xy-link-gray focus-visible:nextra-focus"
        href="https://discord.gg/RVmnytFmGW"
        target="_blank"
        rel="noreferrer"
      >
        <svg
          className="nav-github-logo"
          fill="currentColor"
          viewBox="0 0 130 90"
          width="23"
        >
          <title>Discord</title>
          <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
        </svg>
      </a>
      {initialNavMenu}
    </>
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
        'flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium transition-colors',
        active
          ? 'text-foreground bg-muted'
          : 'text-foreground/80 hover:text-foreground hover:bg-muted',
      )}
    >
      {children}
    </Link>
  );
}
