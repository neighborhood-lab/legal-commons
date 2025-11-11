/**
 * Dashboard page for authenticated users
 */

import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Here's what's happening with your legal documents
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Stats cards */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Documents</h3>
          <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">0</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Total documents created</p>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            In Progress
          </h3>
          <p className="text-3xl font-bold text-warning-600 dark:text-warning-400">0</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Documents being prepared</p>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Completed</h3>
          <p className="text-3xl font-bold text-success-600 dark:text-success-400">0</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Documents finalized</p>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-8 card">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link to="/llc-formation" className="btn-primary text-center">
            Start LLC Formation
          </Link>
          <button className="btn-secondary">View All Documents</button>
          <button className="btn-secondary">Schedule Consultation</button>
        </div>
      </div>

      {/* Recent activity placeholder */}
      <div className="mt-8 card">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Recent Activity
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center py-8">
          No recent activity to display
        </p>
      </div>
    </div>
  )
}
