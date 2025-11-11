/**
 * Step 3: Registered Agent
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  agentName: z.string().min(1, 'Agent name is required'),
  agentStreet: z.string().min(1, 'Street address is required'),
  agentCity: z.string().min(1, 'City is required'),
  agentState: z.string().length(2, 'State code must be 2 letters'),
  agentZip: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code'),
  officeStreet: z.string(),
  officeCity: z.string(),
  officeState: z.string(),
  officeZip: z.string(),
  sameAsAgent: z.boolean(),
});

type FormData = z.infer<typeof schema>;

interface RegisteredAgentStepProps {
  initialData: FormData;
  state: string;
  // eslint-disable-next-line no-unused-vars
  onNext: (data: FormData) => void;
  onBack: () => void;
}

export function RegisteredAgentStep({ initialData, state, onNext, onBack }: RegisteredAgentStepProps) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData,
  });

  const sameAsAgent = watch('sameAsAgent');

  const onSubmit = (data: FormData) => {
    if (data.sameAsAgent) {
      data.officeStreet = data.agentStreet;
      data.officeCity = data.agentCity;
      data.officeState = data.agentState;
      data.officeZip = data.agentZip;
    }
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Registered Agent
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          A registered agent receives legal documents on behalf of your LLC in {state}.
        </p>
      </div>

      <div>
        <label htmlFor="agentName" className="label">
          Agent Name <span className="text-error-600">*</span>
        </label>
        <input id="agentName" type="text" className={`input ${errors.agentName ? 'input-error' : ''}`} {...register('agentName')} />
        {errors.agentName && <p className="error-message">{errors.agentName.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label htmlFor="agentStreet" className="label">Street Address</label>
          <input id="agentStreet" type="text" className={`input ${errors.agentStreet ? 'input-error' : ''}`} {...register('agentStreet')} />
        </div>
        <div>
          <label htmlFor="agentCity" className="label">City</label>
          <input id="agentCity" type="text" className={`input ${errors.agentCity ? 'input-error' : ''}`} {...register('agentCity')} />
        </div>
        <div>
          <label htmlFor="agentState" className="label">State</label>
          <input id="agentState" type="text" maxLength={2} className={`input ${errors.agentState ? 'input-error' : ''}`} {...register('agentState')} />
        </div>
        <div>
          <label htmlFor="agentZip" className="label">ZIP Code</label>
          <input id="agentZip" type="text" className={`input ${errors.agentZip ? 'input-error' : ''}`} {...register('agentZip')} />
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
        <label className="flex items-center mb-4">
          <input type="checkbox" {...register('sameAsAgent')} className="mr-2" />
          <span className="text-gray-900 dark:text-gray-100">Principal office is same as registered agent</span>
        </label>

        {!sameAsAgent && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="officeStreet" className="label">Office Street Address</label>
              <input id="officeStreet" type="text" className="input" {...register('officeStreet')} />
            </div>
            <div>
              <label htmlFor="officeCity" className="label">City</label>
              <input id="officeCity" type="text" className="input" {...register('officeCity')} />
            </div>
            <div>
              <label htmlFor="officeState" className="label">State</label>
              <input id="officeState" type="text" maxLength={2} className="input" {...register('officeState')} />
            </div>
            <div>
              <label htmlFor="officeZip" className="label">ZIP Code</label>
              <input id="officeZip" type="text" className="input" {...register('officeZip')} />
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between pt-6">
        <button type="button" onClick={onBack} className="btn-secondary">Back</button>
        <button type="submit" className="btn-primary">Continue</button>
      </div>
    </form>
  );
}
