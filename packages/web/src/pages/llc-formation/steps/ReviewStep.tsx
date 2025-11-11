/**
 * Step 5: Review & Submit
 */

interface ReviewStepProps {
  formData: {
    state: string
    companyName: string
    businessPurpose: string
    managementType: string
    agentName: string
    agentStreet: string
    agentCity: string
    agentState: string
    agentZip: string
    members: Array<{
      name: string
      ownershipPercentage: number
      isManager: boolean
    }>
  }
  onSubmit: () => void
  onBack: () => void
  isSubmitting?: boolean
}

export function ReviewStep({ formData, onSubmit, onBack, isSubmitting = false }: ReviewStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Review & Submit
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Review your information before generating documents.
        </p>
      </div>

      <div className="space-y-4">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Company Information</h3>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div>
              <dt className="text-gray-600 dark:text-gray-400">State:</dt>
              <dd className="font-medium">{formData.state}</dd>
            </div>
            <div>
              <dt className="text-gray-600 dark:text-gray-400">Company Name:</dt>
              <dd className="font-medium">{formData.companyName}</dd>
            </div>
            <div className="md:col-span-2">
              <dt className="text-gray-600 dark:text-gray-400">Purpose:</dt>
              <dd className="font-medium">{formData.businessPurpose}</dd>
            </div>
            <div>
              <dt className="text-gray-600 dark:text-gray-400">Management:</dt>
              <dd className="font-medium">{formData.managementType}</dd>
            </div>
          </dl>
        </div>

        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Registered Agent</h3>
          <dl className="text-sm space-y-1">
            <div>
              <dt className="text-gray-600 dark:text-gray-400">Name:</dt>
              <dd className="font-medium">{formData.agentName}</dd>
            </div>
            <div>
              <dt className="text-gray-600 dark:text-gray-400">Address:</dt>
              <dd className="font-medium">
                {formData.agentStreet}, {formData.agentCity}, {formData.agentState}{' '}
                {formData.agentZip}
              </dd>
            </div>
          </dl>
        </div>

        <div>
          <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Members</h3>
          {formData.members.map((member, i: number) => (
            <div key={i} className="text-sm py-2">
              <strong>{member.name}</strong> - {member.ownershipPercentage}% ownership
              {member.isManager && (
                <span className="text-primary-600 dark:text-primary-400"> (Manager)</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-4">
        <h4 className="font-medium text-primary-900 dark:text-primary-100 mb-2">
          What happens next?
        </h4>
        <ul className="text-sm text-primary-800 dark:text-primary-200 space-y-1 list-disc list-inside">
          <li>We'll generate your Articles of Organization</li>
          <li>We'll create your Operating Agreement</li>
          <li>You'll be able to download and review all documents</li>
          <li>Follow the provided filing instructions for {formData.state}</li>
        </ul>
      </div>

      <div className="flex justify-between pt-6">
        <button type="button" onClick={onBack} className="btn-secondary" disabled={isSubmitting}>
          Back
        </button>
        <button type="button" onClick={onSubmit} className="btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Generate Documents'}
        </button>
      </div>
    </div>
  )
}
