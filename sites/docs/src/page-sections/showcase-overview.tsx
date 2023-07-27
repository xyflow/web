import Link from "next/link";
import { useState, useCallback, useEffect, ReactNode } from "react";
import {
  Button,
  Container,
  Heading,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
  cn,
} from "xy-ui";

import useXYSite from "@/hooks/use-xy-site";

// ShowcaseOverview ------------------------------------------------------------

export type ShowcaseOverviewProps = {
  className?: string;
  items?: ShowcaseItem[];
};

type ShowcaseItem = {
  name: string;
  text: string;
  content: ReactNode;
};

export default function ShowcaseOverview({
  className,
  items = [],
}: ShowcaseOverviewProps) {
  const { site } = useXYSite();

  return (
    <Container variant="dark" className={className}>
      <div className="p-14">
        <div className="grid lg:grid-cols-2 lg:gap-40">
          <div>
            <Text
              className={cn(
                "font-bold mb-2",
                site !== "xyflow" ? `text-${site}` : "text-gray-300"
              )}
            >
              Project Showcase
            </Text>

            <Heading className="mb-4">Used by thousands of people</Heading>
          </div>
          <div>
            <Text className="mt-4 mb-4">
              From solo open-source developers, to companies like Stripe and
              Typeform. We’ve seen the library used for data processing tools,
              chatbot builders, machine learning, musical synthezisers, and
              more.
            </Text>
            <Button asChild variant="secondary" className={`text-${site}`}>
              <Link href="/showcase">See all projects</Link>
            </Button>
          </div>
        </div>

        <div className="mt-8">
          {items.length && (
            <ShowcaseOverviewItems
              items={items}
              duration={5000}
              start={items[0].name}
            />
          )}
        </div>
      </div>
    </Container>
  );
}

// ShowcaseOverviewItems -------------------------------------------------------

type ShowcaseOverviewItemsProps = {
  items: ShowcaseItem[];
  start?: string;
  duration?: number;
};

const activeBarColours = {
  xyflow: "from-xyflow/40 to-xyflow/70",
  react: "from-react/40 to-react/70",
  svelte: "from-svelte/40 to-svelte/70",
};

function ShowcaseOverviewItems({
  items,
  duration,
  start,
}: ShowcaseOverviewItemsProps) {
  const [active, setActive] = useState(start ?? items[0].name);
  const [elapsed, setelapsed] = useState(0);
  const [shouldCycle, setShouldCycle] = useState(Boolean(duration));
  const onValueChange = useCallback((value) => {
    setActive(value);
    setelapsed(0);
    setShouldCycle(false);
  }, []);
  const activeBarWidth = shouldCycle ? (elapsed / duration) * 100 : 100;

  useEffect(() => {
    if (!shouldCycle && duration) {
      const resume = setTimeout(() => {
        setShouldCycle(true);
      }, 1000 * 10);

      return () => clearTimeout(resume);
    }

    window.requestAnimationFrame(() => {
      if (elapsed >= duration) {
        const index = items.findIndex((item) => item.name === active);
        const nextIndex = index === items.length - 1 ? 0 : index + 1;

        setActive(items[nextIndex].name);
        setelapsed(0);
      } else {
        setelapsed(elapsed + 16.66);
      }
    });
  }, [active, duration, elapsed, shouldCycle]);

  return (
    <Tabs value={active} onValueChange={onValueChange} className="relative">
      <div className="relative mx-auto h-[40vh]">
        {items.map((item, index) => (
          <TabsContent key={index} forceMount value={item.name}>
            <div
              className={cn(
                "transition duration-300 motion-reduce:transition-none",
                active === item.name
                  ? "ease-out opacity-100"
                  : "ease-in opacity-0"
              )}
            >
              {item.content}
            </div>
          </TabsContent>
        ))}
      </div>

      <TabsList className="flex justify-around gap-8 mt-8 bg-transparent">
        {items.map((item, index) => (
          <TabsTrigger key={index} value={item.name} className="w-full group">
            <TabsActiveBar
              isActive={item.name === active}
              activeWidth={activeBarWidth}
            />

            <div
              className={cn(
                "text-muted transition duration-300 motion-reduce:transition-none",
                "group-hover:opacity-100",
                active === item.name ? " opacity-100" : " opacity-70"
              )}
            >
              <Text className="my-2 font-mono font-bold text-center">
                {item.name}
              </Text>
              <Text className="text-muted">{item.text}</Text>
            </div>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

// TabsActiveBar ---------------------------------------------------------------

type TabsActiveBarProps = {
  isActive: boolean;
  activeWidth: number;
};

function TabsActiveBar({ isActive, activeWidth }: TabsActiveBarProps) {
  const { site } = useXYSite();

  return (
    <div className="relative mb-8 h-1.5 rounded">
      <div className="absolute w-full h-full rounded bg-black/20" />
      {isActive && (
        <div
          style={{ width: `${activeWidth}%` }}
          className={cn(
            "absolute h-full rounded bg-gradient-to-r",
            activeBarColours[site]
          )}
        />
      )}
    </div>
  );
}
