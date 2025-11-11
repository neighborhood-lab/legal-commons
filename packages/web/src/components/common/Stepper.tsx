/**
 * Multi-step form stepper component
 * Displays progress through a multi-step form with accessibility support
 */

import { Check } from 'lucide-react';

export interface Step {
  id: string;
  title: string;
  description?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  // eslint-disable-next-line no-unused-vars
  onStepClick?: (stepIndex: number) => void;
}

export function Stepper({ steps, currentStep, onStepClick }: StepperProps) {
  return (
    <nav aria-label="Progress" className="w-full">
      <ol role="list" className="flex items-center justify-between space-x-2 md:space-x-4">
        {steps.map((step, index) => {
          const isComplete = index < currentStep;
          const isCurrent = index === currentStep;
          const isClickable = onStepClick && index < currentStep;

          return (
            <li
              key={step.id}
              className="flex-1"
            >
              <button
                type="button"
                onClick={() => isClickable && onStepClick(index)}
                disabled={!isClickable}
                className={`group w-full ${
                  isClickable ? 'cursor-pointer' : 'cursor-default'
                }`}
                aria-current={isCurrent ? 'step' : undefined}
              >
                <div className="flex flex-col items-center">
                  {/* Step indicator */}
                  <div
                    className={`
                      flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors
                      ${
                        isComplete
                          ? 'border-primary-600 bg-primary-600 text-white'
                          : isCurrent
                            ? 'border-primary-600 bg-white text-primary-600 dark:bg-gray-900'
                            : 'border-gray-300 bg-white text-gray-500 dark:bg-gray-900 dark:border-gray-600'
                      }
                      ${
                        isClickable
                          ? 'group-hover:border-primary-700 group-hover:bg-primary-700'
                          : ''
                      }
                    `}
                  >
                    {isComplete ? (
                      <Check className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <span className="text-sm font-medium">{index + 1}</span>
                    )}
                  </div>

                  {/* Step title */}
                  <div className="mt-2 text-center">
                    <p
                      className={`text-sm font-medium ${
                        isCurrent
                          ? 'text-primary-600 dark:text-primary-400'
                          : isComplete
                            ? 'text-gray-900 dark:text-gray-100'
                            : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {step.title}
                    </p>
                    {step.description && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 hidden md:block">
                        {step.description}
                      </p>
                    )}
                  </div>
                </div>
              </button>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-5 left-1/2 -ml-px h-0.5 w-full"
                  aria-hidden="true"
                >
                  <div
                    className={`h-full ${
                      isComplete
                        ? 'bg-primary-600'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
