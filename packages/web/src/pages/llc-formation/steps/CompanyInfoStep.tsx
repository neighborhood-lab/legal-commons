/**
 * Step 2: Company Information
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  businessPurpose: z.string().min(10, 'Please provide a brief description (at least 10 characters)'),
  managementType: z.enum(['member-managed', 'manager-managed']),
});

type FormData = z.infer<typeof schema>;

interface CompanyInfoStepProps {
  initialData: FormData;
  state: string;
  // eslint-disable-next-line no-unused-vars
  onNext: (data: FormData) => void;
  onBack: () => void;
}

export function CompanyInfoStep({ initialData, state, onNext, onBack }: CompanyInfoStepProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Company Information
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Forming LLC in {state}
        </p>
      </div>

      <div>
        <label htmlFor="companyName" className="label">
          Company Name <span className="text-error-600">*</span>
        </label>
        <input
          id="companyName"
          type="text"
          className={`input ${errors.companyName ? 'input-error' : ''}`}
          placeholder="Acme LLC"
          {...register('companyName')}
        />
        {errors.companyName && (
          <p className="error-message">{errors.companyName.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="businessPurpose" className="label">
          Business Purpose <span className="text-error-600">*</span>
        </label>
        <textarea
          id="businessPurpose"
          rows={4}
          className={`input ${errors.businessPurpose ? 'input-error' : ''}`}
          placeholder="Describe the nature of your business..."
          {...register('businessPurpose')}
        />
        {errors.businessPurpose && (
          <p className="error-message">{errors.businessPurpose.message}</p>
        )}
      </div>

      <div>
        <label className="label">Management Type</label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              value="member-managed"
              {...register('managementType')}
              className="mr-2"
            />
            <span className="text-gray-900 dark:text-gray-100">Member-Managed (owners run the business)</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="manager-managed"
              {...register('managementType')}
              className="mr-2"
            />
            <span className="text-gray-900 dark:text-gray-100">Manager-Managed (designated managers run the business)</span>
          </label>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <button type="button" onClick={onBack} className="btn-secondary">
          Back
        </button>
        <button type="submit" className="btn-primary">
          Continue
        </button>
      </div>
    </form>
  );
}
