'use client';

import { type ComponentType, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  BeakerIcon,
  ChatBubbleLeftRightIcon,
  CreditCardIcon,
  DocumentTextIcon,
  MegaphoneIcon,
  NewspaperIcon,
  SparklesIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu';
import { getFramework } from '../../lib/get-framework';
import { cn } from '../../lib/utils';
import { DynamicCTAAcountMenu } from './dynamic-cta-account-menu';
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

const navDropdownItemClass =
  'group/nav-item flex items-start gap-3 rounded-lg p-3 text-foreground transition-colors hover:bg-muted focus:bg-muted focus:outline-none';

const navDropdownAccentClass =
  'transition-colors group-hover/nav-item:text-primary group-focus/nav-item:text-primary';

function SiteNavLinks() {
  const pathname = usePathname();
  const { framework } = getFramework();
  const isReact = framework === 'react';

  const proItems = isReact ? [...PRO_ITEMS_BASE, CASE_STUDIES_ITEM] : PRO_ITEMS_BASE;
  const moreItems = isReact ? [...MORE_ITEMS_BASE, PLAYGROUND_ITEM] : MORE_ITEMS_BASE;

  const isActive = (prefix: string) => pathname.startsWith(prefix);

  return (
    <NavigationMenu className="mr-auto hidden max-w-none flex-none md:flex">
      <NavigationMenuList className="gap-0.5 space-x-0">
        <SiteNavLink href="/learn" active={isActive('/learn')}>
          Learn
        </SiteNavLink>
        <SiteNavLink href="/api-reference" active={isActive('/api-reference')}>
          Reference
        </SiteNavLink>
        <SiteNavLink href="/examples" active={isActive('/examples')}>
          Examples
        </SiteNavLink>
        {isReact && (
          <SiteNavLink href="/ui" active={isActive('/ui')}>
            UI
          </SiteNavLink>
        )}
        <SiteNavLink href="/showcase" active={isActive('/showcase')}>
          Showcase
        </SiteNavLink>
        <SiteNavDropdown
          label="Pro"
          href="/pro"
          items={proItems}
          active={isActive('/pro')}
        />
        <SiteNavDropdown label="More" items={moreItems} />
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export function SiteNavbarContent() {
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
      <DynamicCTAAcountMenu />
    </>
  );
}

function SiteNavLink({
  href,
  children,
  active,
}: {
  href: string;
  children: ReactNode;
  active: boolean;
}) {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        asChild
        className={cn(
          navigationMenuTriggerStyle(),
          'focus:bg-muted focus:text-foreground h-auto bg-transparent px-2 py-1.5',
          active
            ? 'bg-muted text-foreground hover:bg-muted'
            : 'text-foreground/80 hover:bg-muted hover:text-foreground',
        )}
      >
        <Link href={href}>{children}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}

function SiteNavDropdown({
  label,
  href,
  items,
  active,
}: {
  label: ReactNode;
  href?: string;
  items: NavDropdownItem[];
  active?: boolean;
}) {
  const router = useRouter();

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        className={cn(
          'focus:bg-muted focus:text-foreground data-[state=open]:bg-muted data-[state=open]:text-foreground data-[state=open]:hover:bg-muted data-[state=open]:focus:bg-muted h-auto bg-transparent px-3 py-1.5',
          href && 'cursor-pointer',
          active
            ? 'bg-muted text-foreground hover:bg-muted'
            : 'text-foreground/80 hover:bg-muted hover:text-foreground',
        )}
        onClick={href ? () => router.push(href) : undefined}
      >
        {label}
      </NavigationMenuTrigger>
      <NavigationMenuContent className="bg-background text-foreground rounded-xl p-2 shadow-2xl md:w-[340px]">
        <div className="grid gap-1">
          {items.map((item) => {
            const Icon = iconMap[item.icon];

            return (
              <NavigationMenuLink asChild key={item.href}>
                <Link
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noreferrer' : undefined}
                  className={navDropdownItemClass}
                >
                  <Icon
                    className={cn(
                      'text-muted-foreground mt-0.5 h-5 w-5 shrink-0',
                      navDropdownAccentClass,
                    )}
                  />
                  <div>
                    <div className={cn('text-sm font-semibold', navDropdownAccentClass)}>
                      {item.title}
                    </div>
                    <div className="text-muted-foreground mt-1 text-xs leading-relaxed">
                      {item.description}
                    </div>
                  </div>
                </Link>
              </NavigationMenuLink>
            );
          })}
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
