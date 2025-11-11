/**
 * Step 1: State Selection
 * Allows user to select which state to form LLC in
 */

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { MapPin } from 'lucide-react'

const SUPPORTED_STATES = [
  { code: 'CA', name: 'California', filingFee: 70 },
  { code: 'NY', name: 'New York', filingFee: 200 },
  { code: 'TX', name: 'Texas', filingFee: 300 },
  { code: 'FL', name: 'Florida', filingFee: 125 },
  { code: 'DE', name: 'Delaware', filingFee: 90 },
]

const schema = z.object({
  state: z.string().min(2, 'Please select a state'),
})

type FormData = z.infer<typeof schema>

interface StateSelectionStepProps {
  initialData: { state: string }
  // eslint-disable-next-line no-unused-vars
  onNext: (data: { state: string }) => void
  onBack: () => void
}

export function StateSelectionStep({ initialData, onNext, onBack }: StateSelectionStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData,
  })

  const onSubmit = (data: FormData) => {
    onNext(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Where would you like to form your LLC?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Select the state where your LLC will be registered. Most businesses choose the state where
          they primarily operate.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SUPPORTED_STATES.map((state) => (
          <label
            key={state.code}
            className={`
              relative flex cursor-pointer rounded-lg border p-4 
              focus:outline-none
              ${errors.state ? 'border-error-500' : 'border-gray-300 dark:border-gray-600'}
              hover:border-primary-600 dark:hover:border-primary-400
            `}
          >
            <input type="radio" value={state.code} {...register('state')} className="sr-only" />
            <div className="flex flex-1">
              <div className="flex flex-col flex-1">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2" />
                  <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {state.name}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Filing fee: ${state.filingFee}
                </p>
              </div>
            </div>
            <div
              className="pointer-events-none absolute -inset-px rounded-lg border-2 border-transparent peer-checked:border-primary-600"
              aria-hidden="true"
            />
          </label>
        ))}
      </div>

      {errors.state && (
        <p className="error-message" role="alert">
          {errors.state.message}
        </p>
      )}

      <div className="flex justify-between pt-6">
        <button type="button" onClick={onBack} className="btn-secondary">
          Cancel
        </button>
        <button type="submit" className="btn-primary">
          Continue
        </button>
      </div>
    </form>
  )
}
