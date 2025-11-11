/**
 * LLC Formation Workflow - Main Page
 * Multi-step form for LLC formation with state-specific requirements
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stepper, type Step } from '../../components/common/Stepper';
import { StateSelectionStep } from './steps/StateSelectionStep';
import { CompanyInfoStep } from './steps/CompanyInfoStep';
import { RegisteredAgentStep } from './steps/RegisteredAgentStep';
import { MembersStep} from './steps/MembersStep';
import { ReviewStep } from './steps/ReviewStep';

const STEPS: Step[] = [
  { id: 'state', title: 'State', description: 'Select state' },
  { id: 'company', title: 'Company', description: 'Business details' },
  { id: 'agent', title: 'Agent', description: 'Registered agent' },
  { id: 'members', title: 'Members', description: 'Ownership' },
  { id: 'review', title: 'Review', description: 'Confirm & generate' },
];

interface LLCFormData {
  state: string;
  companyName: string;
  businessPurpose: string;
  managementType: 'member-managed' | 'manager-managed';
  agentName: string;
  agentStreet: string;
  agentCity: string;
  agentState: string;
  agentZip: string;
  officeStreet: string;
  officeCity: string;
  officeState: string;
  officeZip: string;
  sameAsAgent: boolean;
  members: Array<{
    name: string;
    email: string;
    ownershipPercentage: number;
    isManager: boolean;
  }>;
}

const INITIAL_FORM_DATA: LLCFormData = {
  state: '',
  companyName: '',
  businessPurpose: '',
  managementType: 'member-managed',
  agentName: '',
  agentStreet: '',
  agentCity: '',
  agentState: '',
  agentZip: '',
  officeStreet: '',
  officeCity: '',
  officeState: '',
  officeZip: '',
  sameAsAgent: false,
  members: [],
};

export function LLCFormationPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<LLCFormData>(INITIAL_FORM_DATA);

  const handleNext = (stepData: Partial<LLCFormData>) => {
    setFormData((prev) => ({ ...prev, ...stepData }));
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const handleSubmit = async () => {
    // TODO: Submit to API, generate documents
    console.warn('LLC Formation submitted:', formData);
    navigate('/dashboard');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <StateSelectionStep
            initialData={{ state: formData.state }}
            onNext={handleNext}
            onBack={() => navigate('/dashboard')}
          />
        );
      case 1:
        return (
          <CompanyInfoStep
            initialData={{
              companyName: formData.companyName,
              businessPurpose: formData.businessPurpose,
              managementType: formData.managementType,
            }}
            state={formData.state}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <RegisteredAgentStep
            initialData={{
              agentName: formData.agentName,
              agentStreet: formData.agentStreet,
              agentCity: formData.agentCity,
              agentState: formData.agentState,
              agentZip: formData.agentZip,
              officeStreet: formData.officeStreet,
              officeCity: formData.officeCity,
              officeState: formData.officeState,
              officeZip: formData.officeZip,
              sameAsAgent: formData.sameAsAgent,
            }}
            state={formData.state}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <MembersStep
            initialData={{ members: formData.members }}
            managementType={formData.managementType}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <ReviewStep
            formData={formData}
            onSubmit={handleSubmit}
            onBack={handleBack}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Form an LLC
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Complete the steps below to generate your LLC formation documents
        </p>
      </div>

      {/* Stepper */}
      <div className="mb-12">
        <Stepper
          steps={STEPS}
          currentStep={currentStep}
          onStepClick={handleStepClick}
        />
      </div>

      {/* Current Step Content */}
      <div className="card">{renderStep()}</div>
    </div>
  );
}
