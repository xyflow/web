import { useState, useEffect, useCallback } from "react";
import { Node, NodeProps, Handle, Position } from "@xyflow/react";
import { BaseNode } from "@/registry/components/base-node";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Minus, Plus, RotateCcw } from "lucide-react";

/**
 * Defines the properties for the StepperNode component.
 *
 * @typedef {object} StepperNodeType
 * @property {string} label - The text label displayed on the node.
 * @property {number} [step] - The initial step value (default is 0).
 * @property {number} [minStep] - The minimum step value allowed (default is 0).
 * @property {number} [maxStep] - The maximum step value allowed (default is 10).
 * @property {number} [stepSize] - The increment/decrement size for each step (default is 1).
 * @property {"counter" | "timer"} [mode] - The mode of operation: "counter" for manual updates or "timer" for auto-increment (default is "counter").
 * @property {"linear" | "circular"} [design] - The visual design of the stepper: linear or circular (default is "linear").
 * @property {boolean} [persist] - Whether to persist the step value in localStorage (default is false).
 * @property {(newStep: number) => void} [onStepChange] - Optional callback invoked when the step changes.
 */
export type StepperNodeType = Node<{
  label: string;
  step?: number;
  minStep?: number;
  maxStep?: number;
  stepSize?: number;
  mode?: "counter" | "timer";
  design?: "linear" | "circular";
  persist?: boolean;
  onStepChange?: (newStep: number) => void;
}>;

/**
 * StepperNode component renders a node with step increment functionality.
 * It supports both linear and circular designs and can operate in timer mode.
 *
 * @param {NodeProps<StepperNodeType>} props - The node properties including id, data, and selection state.
 * @returns {JSX.Element} The rendered StepperNode component.
 */
export function StepperNode({ id, data, selected }: NodeProps<StepperNodeType>) {
  // Destructure node data with default values.
  const {
    step = 0,
    minStep = 0,
    maxStep = 10,
    stepSize = 1,
    mode = "counter",
    design = "linear",
    persist = false,
    onStepChange,
  } = data;

  /**
   * Retrieves the persisted step value from localStorage if persistence is enabled.
   * Falls back to the provided step value if no persisted value exists.
   *
   * @returns {number} The initial step value.
   */
  const getPersistedStep = useCallback(() => {
    if (persist) {
      try {
        const stored = localStorage.getItem(`stepper-node-${id}`);
        return stored !== null ? Number(stored) : step;
      } catch {
        return step;
      }
    }
    return step;
  }, [persist, id, step]);

  // Local state for the step value.
  const [localStep, setLocalStep] = useState(getPersistedStep);

  /**
   * Updates the step value by a delta while ensuring it stays within [minStep, maxStep].
   *
   * @param {number} delta - The change to be applied to the current step.
   */
  const updateStep = useCallback(
    (delta: number) => {
      setLocalStep((prev) => Math.min(maxStep, Math.max(minStep, prev + delta)));
    },
    [maxStep, minStep]
  );

  /**
   * Sets the step value to an absolute number, ensuring it remains within boundaries.
   *
   * @param {number} value - The new step value.
   */
  const setStepAbsolute = useCallback(
    (value: number) => {
      setLocalStep(Math.min(maxStep, Math.max(minStep, value)));
    },
    [maxStep, minStep]
  );

  /**
   * Resets the step value to its initial default value.
   */
  const resetStep = useCallback(() => setLocalStep(step), [step]);

  // Persist the step value to localStorage and notify the parent component of changes.
  useEffect(() => {
    if (persist) {
      try {
        localStorage.setItem(`stepper-node-${id}`, localStep.toString());
      } catch (e) {
        console.error("Failed to persist step:", e);
      }
    }
    onStepChange?.(localStep);
  }, [localStep, persist, id, onStepChange]);

  // If in "timer" mode, auto-increment the step value every second.
  useEffect(() => {
    if (mode === "timer") {
      const interval = setInterval(() => updateStep(stepSize), 1000);
      return () => clearInterval(interval);
    }
  }, [mode, stepSize, updateStep]);

  return (
    <BaseNode
      selected={selected}
      className="relative flex w-full max-w-sm flex-col items-center rounded-xl border border-border bg-background p-4 shadow-md transition-colors duration-300"
    >
      {/* Reset button to restore the step to its initial value */}
      <ResetButton onClick={resetStep} />
      {/* Display the node label */}
      <div className="mt-4 text-sm font-semibold text-foreground">{data.label}</div>
      {/* Conditionally render the design based on the "design" prop */}
      {design === "linear" ? (
        <LinearDesign
          localStep={localStep}
          updateStep={updateStep}
          setStepAbsolute={setStepAbsolute}
          minStep={minStep}
          maxStep={maxStep}
          stepSize={stepSize}
        />
      ) : (
        <CircularDesign localStep={localStep} updateStep={updateStep} maxStep={maxStep} />
      )}

      {/* Handles for connecting nodes in a flow diagram */}
      <Handle type="target" position={Position.Top} className="!bg-border" />
      <Handle type="source" position={Position.Bottom} className="!bg-border" />
    </BaseNode>
  );
}

/**
 * LinearDesign component displays a stepper with a linear layout.
 * It includes increment/decrement buttons and a progress bar.
 *
 * @param {object} props - Component properties.
 * @param {number} props.localStep - Current step value.
 * @param {(delta: number) => void} props.updateStep - Function to adjust the step value.
 * @param {(value: number) => void} props.setStepAbsolute - Function to set the step value absolutely.
 * @param {number} props.minStep - Minimum allowed step value.
 * @param {number} props.maxStep - Maximum allowed step value.
 * @param {number} props.stepSize - Step increment/decrement size.
 * @returns {JSX.Element} The linear design layout.
 */
const LinearDesign = ({
  localStep,
  updateStep,
  setStepAbsolute,
  minStep,
  maxStep,
  stepSize,
}: {
  localStep: number;
  updateStep: (delta: number) => void;
  setStepAbsolute: (value: number) => void;
  minStep: number;
  maxStep: number;
  stepSize: number;
}) => (
  <>
    <div className="mt-3 flex items-center gap-4">
      {/* Decrease button */}
      <StepButton
        ariaLabel="Decrease step"
        icon={<Minus className="h-5 w-5" />}
        onClick={() => updateStep(-stepSize)}
        disabled={localStep <= minStep}
      />
      {/* Display current step */}
      <span className="w-16 text-center text-3xl font-bold text-foreground">{localStep}</span>
      {/* Increase button */}
      <StepButton
        ariaLabel="Increase step"
        icon={<Plus className="h-5 w-5" />}
        onClick={() => updateStep(stepSize)}
        disabled={localStep >= maxStep}
      />
    </div>
    <div className="w-full mt-4 px-2">
      {/* Progress bar showing how far along the stepper is */}
      <Progress
        value={((localStep - minStep) / (maxStep - minStep)) * 100}
        className="mt-2 h-3 w-full rounded-lg bg-muted"
      />
    </div>
  </>
);

/**
 * CircularDesign component displays a stepper with a circular layout.
 * It uses an SVG to render a circular progress indicator.
 *
 * @param {object} props - Component properties.
 * @param {number} props.localStep - Current step value.
 * @param {(delta: number) => void} props.updateStep - Function to adjust the step value.
 * @param {number} props.maxStep - Maximum allowed step value.
 * @returns {JSX.Element} The circular design layout.
 */
const CircularDesign = ({
  localStep,
  updateStep,
  maxStep,
}: {
  localStep: number;
  updateStep: (delta: number) => void;
  maxStep: number;
}) => (
  <>
    <div className="relative mt-4">
      <svg className="w-28 h-28 drop-shadow-lg" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="40"
          strokeWidth="8"
          fill="none"
          className="stroke-muted"
        />
        {/* Foreground circle showing progress */}
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="url(#grad1)"
          strokeWidth="8"
          fill="none"
          strokeDasharray="251.2"
          strokeDashoffset={251.2 - (localStep / maxStep) * 251.2}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
          className="transition-all"
        />
        <defs>
          {/* Gradient definition for the progress circle */}
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
        </defs>
        {/* Display the current step in the center of the circle */}
        <text x="50" y="55" textAnchor="middle" fontSize="18" fontWeight="bold" fill="currentColor">
          {localStep}
        </text>
      </svg>
    </div>
    <div className="mt-4 flex gap-4">
      {/* Decrease button */}
      <StepButton
        ariaLabel="Decrease step"
        icon={<Minus className="h-5 w-5" />}
        onClick={() => updateStep(-1)}
        disabled={localStep <= 0}
      />
      {/* Increase button */}
      <StepButton
        ariaLabel="Increase step"
        icon={<Plus className="h-5 w-5" />}
        onClick={() => updateStep(1)}
        disabled={localStep >= maxStep}
      />
    </div>
  </>
);

/**
 * ResetButton component renders a button that resets the step value.
 *
 * @param {object} props - Component properties.
 * @param {() => void} props.onClick - Callback function invoked when the reset button is clicked.
 * @returns {JSX.Element} The reset button.
 */
const ResetButton = ({ onClick }: { onClick: () => void }) => (
  <Button
    size="icon"
    variant="link"
    onClick={onClick}
    aria-label="Reset step"
    className="transition-all duration-300 ease-in-out hover:rotate-180 absolute top-0 right-0"
  >
    <RotateCcw className="h-5 w-5 text-foreground" />
  </Button>
);

/**
 * StepButton component renders an icon button for incrementing or decrementing the step.
 *
 * @param {object} props - Component properties.
 * @param {JSX.Element} props.icon - The icon to be displayed inside the button.
 * @param {() => void} props.onClick - Callback function invoked when the button is clicked.
 * @param {boolean} [props.disabled] - Whether the button is disabled.
 * @param {string} props.ariaLabel - Accessibility label for the button.
 * @returns {JSX.Element} The step button.
 */
const StepButton = ({
  icon,
  onClick,
  disabled,
  ariaLabel,
}: {
  icon: JSX.Element;
  onClick: () => void;
  disabled?: boolean;
  ariaLabel: string;
}) => (
  <Button
    size="icon"
    variant="outline"
    onClick={onClick}
    disabled={disabled}
    aria-label={ariaLabel}
    className="rounded-full p-2 transition-colors dark:hover:bg-muted hover:bg-muted"
  >
    {icon}
  </Button>
);
