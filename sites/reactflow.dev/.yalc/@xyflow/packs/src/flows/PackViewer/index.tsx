import type { Sample } from "../../utils/paths";
import Flow from "./flow";
import { useEffect, useState } from "react";
import { ReactFlowProvider } from "reactflow";

import { CodeViewer } from "./CodeViewer";

export function createPackViewer(flowConfig: ReactFlowConfig) {
  return ({
    samples,
    initialLocation,
  }: {
    samples: Record<string, Sample>;
    initialLocation: string;
  }) => {
    return (
      <PackViewer
        samples={samples}
        flowConfig={flowConfig}
        initialLocation={initialLocation}
        pack="music"
      />
    );
  };
}

function PackViewer({
  samples,
  initialLocation,
  flowConfig,
  pack,
}: {
  samples: Record<string, Sample>;
  initialLocation: string;
  flowConfig: ReactFlowConfig;
  pack: string;
}) {
  const [currentSample, setCurentSample] = useState<Sample>();
  const [focus, setFocus] = useState<{ node?: string; edge?: string }>({});
  const [skipAnimation, setSkipAnimation] = useState(
    initialLocation !== "home",
  );

  function backToHome() {
    setSkipAnimation(false);
    history.pushState({ location: "home" }, "", `/multiverse/${pack}`);
    setCurentSample(undefined);
    setFocus({});
  }

  function popState(event: PopStateEvent) {
    if (event.state?.location === "home") {
      setSkipAnimation(false);
      setCurentSample(undefined);
      setFocus({});
    } else {
      navigateToSample(event.state?.location);
    }
  }

  function navigateToSample(sample: string) {
    const _currentSample = samples[sample];

    if (_currentSample) {
      setCurentSample(_currentSample);

      const possibleNode = flowConfig.flowProps?.nodes.find(
        (node) => node.type.toLowerCase() === sample,
      );

      if (possibleNode) {
        setFocus({
          node: possibleNode.id,
          edge: undefined,
        });
      } else {
        const possibleEdge = flowConfig.flowProps?.edges?.find(
          (edge) => edge.type.toLowerCase() === sample,
        );

        if (possibleEdge) {
          setFocus({
            node: undefined,
            edge: possibleEdge.id,
          });
        }
      }
    }
  }

  useEffect(() => {
    window.addEventListener("popstate", popState);

    if (initialLocation === "home") {
      history.replaceState({ location: initialLocation }, "");
    } else {
      navigateToSample(initialLocation);
    }

    return () => {
      window.removeEventListener("popstate", popState);
    };
  }, []);

  function onElementClick(type: string, id: string, kind: string) {
    const _currentSample = samples[type.toLowerCase()];
    console.log(_currentSample, samples, type.toLowerCase());
    if (_currentSample) {
      // TODO: This routing is just temporary (switch to next router later)
      history.pushState(
        { pack: "music", location: type.toLowerCase() },
        "",
        `${window.location}/${type.toLowerCase()}`,
      );
      setCurentSample(_currentSample);
      setFocus({
        node: kind === "node" ? id : undefined,
        edge: kind === "edge" ? id : undefined,
      });
    }
  }

  return (
    <>
      <div className="relative mx-auto box-border h-full w-full max-w-[78rem] py-8">
        <ReactFlowProvider>
          <Flow
            flowConfig={flowConfig}
            onNodeClick={(nodeType: string, nodeId: string) => {
              onElementClick(nodeType, nodeId, "node");
            }}
            onEdgeClick={(edgeType: string, edgeId: string) => {
              onElementClick(edgeType, edgeId, "edge");
            }}
            focus={focus}
            focusedFlowSize={{
              /* TODO: This should not be hardcoded but responsive */
              width: 600,
              height: 480,
            }}
            skipAnimation={skipAnimation}
          />
        </ReactFlowProvider>
        {currentSample && (
          <div className="absolute top-0 box-border flex h-full w-full">
            <div className="flex h-full w-[39rem] flex-col">
              {/* window for react flow */}
              <div
                className="h-[30rem]"
                onClick={() => {
                  backToHome();
                }}
              />
              <div
                className={`${
                  skipAnimation ? "" : "animate-fade-in-delayed"
                } grow bg-white p-5 transition-opacity`}
              >
                <h1 className="pt-4 text-3xl font-bold">
                  {"<"}
                  {currentSample.title} {"/>"}
                </h1>
                <p className="pt-4 text-lg">{currentSample.description}</p>
              </div>
            </div>
            <div
              className={`w-100 
              ${skipAnimation ? "" : "animate-fade-in-delayed"} 
              grow bg-white transition-opacity`}
            >
              <div className="m-auto max-w-2xl p-10">
                <p>1. install music-third-party</p>
                <CodeViewer
                  editorHeight={"4em"}
                  files={{ "App.js": "pnpm install music-third-party" }}
                  readOnly
                />
                <p>2. Copy this into your project</p>
                <CodeViewer
                  // editorHeight={"70vh"}
                  files={{ "App.js": currentSample.react }}
                  readOnly
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default PackViewer;
