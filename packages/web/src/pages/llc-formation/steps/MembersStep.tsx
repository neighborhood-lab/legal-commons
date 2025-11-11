/**
 * Step 4: Members
 */

import { useState, type FormEvent } from 'react'
import { Plus, Trash2 } from 'lucide-react'

interface Member {
  name: string
  email: string
  ownershipPercentage: number
  isManager: boolean
}

interface MembersStepProps {
  initialData: { members: Member[] }
  managementType: 'member-managed' | 'manager-managed'
  // eslint-disable-next-line no-unused-vars
  onNext: (data: { members: Member[] }) => void
  onBack: () => void
}

export function MembersStep({ initialData, managementType, onNext, onBack }: MembersStepProps) {
  const [members, setMembers] = useState<Member[]>(
    initialData.members.length > 0
      ? initialData.members
      : [{ name: '', email: '', ownershipPercentage: 100, isManager: true }]
  )

  const addMember = () => {
    setMembers([...members, { name: '', email: '', ownershipPercentage: 0, isManager: false }])
  }

  const removeMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index))
  }

  const updateMember = (index: number, field: keyof Member, value: string | number | boolean) => {
    const updated = [...members]
    updated[index] = { ...updated[index], [field]: value } as Member
    setMembers(updated)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onNext({ members })
  }

  const totalOwnership = members.reduce((sum, m) => sum + m.ownershipPercentage, 0)

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">LLC Members</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Add all members (owners) of the LLC. Ownership must total 100%.
        </p>
      </div>

      {members.map((member, index) => (
        <div key={index} className="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-900 dark:text-gray-100">Member {index + 1}</h3>
            {members.length > 1 && (
              <button
                type="button"
                onClick={() => removeMember(index)}
                className="text-error-600 hover:text-error-700"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Name</label>
              <input
                type="text"
                className="input"
                value={member.name}
                onChange={(e) => updateMember(index, 'name', e.target.value)}
                required
              />
            </div>
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                className="input"
                value={member.email}
                onChange={(e) => updateMember(index, 'email', e.target.value)}
                required
              />
            </div>
            <div>
              <label className="label">Ownership %</label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.01"
                className="input"
                value={member.ownershipPercentage}
                onChange={(e) =>
                  updateMember(index, 'ownershipPercentage', parseFloat(e.target.value) || 0)
                }
                required
              />
            </div>
            {managementType === 'manager-managed' && (
              <div className="flex items-center">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={member.isManager}
                    onChange={(e) => updateMember(index, 'isManager', e.target.checked)}
                    className="mr-2"
                  />
                  <span>Is Manager</span>
                </label>
              </div>
            )}
          </div>
        </div>
      ))}

      <button type="button" onClick={addMember} className="btn-secondary">
        <Plus className="h-5 w-5 mr-2 inline" />
        Add Member
      </button>

      <div
        className={`p-4 rounded-lg ${totalOwnership === 100 ? 'bg-success-50 dark:bg-success-900/20' : 'bg-warning-50 dark:bg-warning-900/20'}`}
      >
        <p className="text-sm">
          Total Ownership: <strong>{totalOwnership.toFixed(2)}%</strong>
          {totalOwnership !== 100 && (
            <span className="text-warning-700 dark:text-warning-400"> (Must equal 100%)</span>
          )}
        </p>
      </div>

      <div className="flex justify-between pt-6">
        <button type="button" onClick={onBack} className="btn-secondary">
          Back
        </button>
        <button type="submit" className="btn-primary" disabled={totalOwnership !== 100}>
          Continue
        </button>
      </div>
    </form>
  )
}
