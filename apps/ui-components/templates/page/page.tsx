"use client";

import $CAMELCOMPONENTApp from "@/registry/components/$COMPONENT/app-example";

import DemoWrapper from "@/components/demo-wrapper";

export default function Page() {
  return (
    <DemoWrapper>
      <$CAMELCOMPONENTApp />
    </DemoWrapper>
  );
}
