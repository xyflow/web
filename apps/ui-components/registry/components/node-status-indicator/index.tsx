import React, { memo, ReactNode } from "react";

interface NodeStatusIndicatorProps {
  status?: "loading" | "success" | "error";
  children: ReactNode;
}

export interface IndicatorProps {
  children: ReactNode;
}

export function LoadingIndicator({ children }: IndicatorProps) {
  return (
    <div className="relative p-0.5">
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
      <div className="absolute inset-0 overflow-hidden rounded-lg">
        <div className="spinner rounded-full bg-[conic-gradient(from_0deg_at_50%_50%,_rgb(42,67,233)_0deg,_rgba(42,138,246,0)_360deg)]" />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function SuccessIndicator({ children }: IndicatorProps) {
  return (
    <div className="rounded-[8px] border-2 border-emerald-600">{children}</div>
  );
}

export function ErrorIndicator({ children }: IndicatorProps) {
  return (
    <div className="rounded-[8px] border-2 border-red-400">{children}</div>
  );
}

export function NodeStatusIndicator({
  status,
  children,
}: NodeStatusIndicatorProps) {
  switch (status) {
    case "loading":
      return <LoadingIndicator>{children}</LoadingIndicator>;
    case "success":
      return <SuccessIndicator>{children}</SuccessIndicator>;
    case "error":
      return <ErrorIndicator>{children}</ErrorIndicator>;
    default:
      return <>{children}</>;
  }
}
