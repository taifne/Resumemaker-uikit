import React, { useState, ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Step = {
  label: string;
  content: ReactNode;
  icon?: ReactNode;
};

type StepInputProps = {
  steps: Step[];
  onFinish: () => void;
  onStepChange?: (currentStep: number) => void;
  width?: string;
  height?: string;
  // New configuration options
  buttonPosition?: "top" | "bottom" | "both";
  progressBarStyle?: "line" | "dots" | "none";
  transitionType?: "fade" | "slide" | "none";
  customButtonLabels?: {
    back?: string;
    next?: string;
    finish?: string;
  };
  colorTheme?: {
    primary?: string;
    secondary?: string;
    text?: string;
  };
  disableNextOn?: (stepIndex: number) => boolean;
  beforeStepChange?: (
    currentStep: number,
    direction: "next" | "prev"
  ) => Promise<boolean>;
};

export const StepInput: React.FC<StepInputProps> = ({
  steps,
  onFinish,
  onStepChange,
  width = "100%",
  height = "auto",
  buttonPosition = "both",
  progressBarStyle = "line",
  transitionType = "fade",
  customButtonLabels,
  colorTheme = {
    primary: "#3b82f6",
    secondary: "#f3f4f6",
    text: "#1f2937",
  },
  disableNextOn,
  beforeStepChange,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const {
    primary = "#3b82f6",
    secondary = "#f3f4f6",
    text = "#1f2937",
  } = colorTheme;

  // Calculate progress percentage
  const progressPercent = ((currentStep + 1) / steps.length) * 100;

  // Handle step transitions with animation control
  const changeStep = async (direction: "next" | "prev") => {
    if (isTransitioning) return;

    setIsTransitioning(true);

    // Run beforeStepChange hook if provided
    const shouldProceed = beforeStepChange
      ? await beforeStepChange(currentStep, direction)
      : true;

    if (!shouldProceed) {
      setIsTransitioning(false);
      return;
    }

    if (direction === "next") {
      if (currentStep < steps.length - 1) {
        const nextStep = currentStep + 1;
        setCurrentStep(nextStep);
        onStepChange?.(nextStep);
      } else {
        onFinish();
      }
    } else {
      if (currentStep > 0) {
        const prevStep = currentStep - 1;
        setCurrentStep(prevStep);
        onStepChange?.(prevStep);
      }
    }

    // Reset transitioning state after animation would complete
    setTimeout(() => setIsTransitioning(false), 300);
  };

  // Animation variants
  const transitionVariants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slide: {
      initial: { x: 100, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: -100, opacity: 0 },
    },
    none: {
      initial: { opacity: 1 },
      animate: { opacity: 1 },
      exit: { opacity: 1 },
    },
  };

  // Determine if next button should be disabled
  const isNextDisabled = disableNextOn ? disableNextOn(currentStep) : false;

  // Button labels with custom overrides
  const buttonLabels = {
    back: customButtonLabels?.back || "Back",
    next: customButtonLabels?.next || "Next",
    finish: customButtonLabels?.finish || "Finish",
  };

  return (
    <div
      className="border border-gray-200 rounded-2xl shadow-lg bg-white p-6 flex flex-col gap-4 overflow-auto"
      style={{
        width,
        height,
        maxWidth: width === "100%" ? "100%" : undefined,
        boxShadow:
          "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Top Actions - Conditionally rendered */}
      {(buttonPosition === "top" || buttonPosition === "both") && (
        <div className="flex justify-between items-center mb-2">
          <div className="flex gap-2">
            <button
              onClick={() => changeStep("prev")}
              disabled={currentStep === 0 || isTransitioning}
              className="px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: secondary,
                color: text,
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              {buttonLabels.back}
            </button>
          </div>

          <div className="text-sm font-medium" style={{ color: text }}>
            Step {currentStep + 1} / {steps.length}
          </div>
        </div>
      )}

      {/* Progress Indicators */}
      {progressBarStyle !== "none" && (
        <div className="mb-4">
          {progressBarStyle === "line" ? (
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-auto">
              <motion.div
                className="h-full rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progressPercent}%` }} // wrapped in backticks
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{ backgroundColor: primary }}
              />
            </div>
          ) : (
            <div className="flex justify-center gap-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index <= currentStep ? "scale-125" : ""
                  }`}
                  style={{
                    backgroundColor: index <= currentStep ? primary : secondary,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Step Header */}
      <div className="text-center mb-4">
        <div className="flex items-center justify-center gap-3">
          {steps[currentStep].icon && (
            <div
              className="p-2 rounded-full"
              style={{ backgroundColor: `${primary}20` }} // wrap in backticks correctly
            >
              {steps[currentStep].icon}
            </div>
          )}

          <h2 className="text-xl font-bold" style={{ color: text }}>
            {steps[currentStep].label}
          </h2>
        </div>
      </div>

      {/* Step Content with Animation */}
      <div className="flex-1 min-h-[150px] overflow-auto relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            variants={transitionVariants[transitionType]}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="absolute inset-0 p-4"
          >
            <div className="border rounded-xl bg-gray-50 p-4 h-full">
              {steps[currentStep].content}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Actions - Conditionally rendered */}
      {(buttonPosition === "bottom" || buttonPosition === "both") && (
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm font-medium" style={{ color: text }}>
            Step {currentStep + 1} / {steps.length}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => changeStep("prev")}
              disabled={currentStep === 0 || isTransitioning}
              className="px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: secondary,
                color: text,
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              {buttonLabels.back}
            </button>

            <button
              onClick={() => changeStep("next")}
              disabled={isTransitioning || isNextDisabled}
              className="px-4 py-2 rounded-lg text-white transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: primary,
                opacity: isNextDisabled ? 0.7 : 1,
              }}
            >
              {currentStep === steps.length - 1
                ? buttonLabels.finish
                : buttonLabels.next}
              {currentStep < steps.length - 1 && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
