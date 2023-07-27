import { useMemo } from "react";
import { useRouter } from "next/router";

export default function useXYSite(): {
  site: "react" | "svelte" | "xyflow";
  lib: "React Flow" | "Svelte Flow" | null;
  isOrg: boolean;
} {
  const router = useRouter();

  const site = useMemo(() => {
    const segments = router.pathname.split("/");
    if (segments.includes("react-flow")) {
      return "react";
    } else if (segments.includes("svelte-flow")) {
      return "svelte";
    } else {
      return "xyflow";
    }
  }, [router.pathname]);

  const lib = useMemo(() => {
    if (site === "xyflow") {
      return null;
    }

    return `${site.charAt(0).toUpperCase() + site.slice(1)} Flow` as
      | "React Flow"
      | "Svelte Flow";
  }, [site]);

  return {
    site,
    lib,
    isOrg: site === "xyflow",
  };
}
