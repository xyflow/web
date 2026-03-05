'use client';

import { useState, useRef, type ComponentType, type ReactNode } from 'react';
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
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
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
