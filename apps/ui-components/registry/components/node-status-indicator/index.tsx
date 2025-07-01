import clsx from "clsx";
import { LoaderCircle } from "lucide-react";
import { ReactNode } from "react";

export type NodeStatus = "loading" | "success" | "error" | "initial";

export type NodeStatusLoadingVariant = "overlay" | "border";

export type NodeStatusIndicatorProps = {
  status?: NodeStatus;
  loadingVariant?: NodeStatusLoadingVariant;
  children: ReactNode;
};

export const SpinnerLoadingIndicator = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <div className="relative">
      {/* Your content */}
      <StatusBorder className="border-blue-700">{children}</StatusBorder>

      <>
        <div className="absolute inset-0 z-50 rounded-[7px] bg-background/50 backdrop-blur-sm" />
        <div className="absolute inset-0 z-50">
          {/* <Spinner size="small" /> */}
          <span className="absolute left-[calc(50%-1.25rem)] top-[calc(50%-1.25rem)] inline-block h-10 w-10 animate-ping rounded-full bg-blue-700/20" />

          <LoaderCircle className="absolute left-[calc(50%)] top-[calc(50%)] size-6 animate-spin text-blue-700" />
        </div>
      </>
    </div>
  );
};

export const BorderLoadingIndicator = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <>
      <div className="absolute -left-[1px] -top-[1px] h-[calc(100%+2px)] w-[calc(100%+2px)]">
        <style>
          {`
        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .spinner {
          animation: spin 2s linear infinite;
          position: absolute;
          left: 50%;
          top: 50%;
          width: 140%;
          aspect-ratio: 1;
          transform-origin: center;
        }
      `}
        </style>
        <div className="absolute inset-0 overflow-hidden rounded-[7px]">
          <div className="spinner rounded-full bg-[conic-gradient(from_0deg_at_50%_50%,_rgb(42,67,233)_0deg,_rgba(42,138,246,0)_360deg)]" />
        </div>
      </div>
      {children}
    </>
  );
};

const StatusBorder = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <>
      <div
        className={clsx(
          "absolute -left-[1px] -top-[1px] h-[calc(100%+2px)] w-[calc(100%+2px)] rounded-[7px] border-2",
          className,
        )}
      />
      {children}
    </>
  );
};

export const NodeStatusIndicator = ({
  status,
  loadingVariant = "border",
  children,
}: NodeStatusIndicatorProps) => {
  switch (status) {
    case "loading":
      return loadingVariant === "border" ? (
        <BorderLoadingIndicator>{children}</BorderLoadingIndicator>
      ) : (
        <SpinnerLoadingIndicator>{children}</SpinnerLoadingIndicator>
      );
    case "success":
      return (
        <StatusBorder className="border-emerald-600">{children}</StatusBorder>
      );
    case "error":
      return <StatusBorder className="border-red-400">{children}</StatusBorder>;
    default:
      return <>{children}</>;
  }
};
