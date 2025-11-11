/**
 * Home page / landing page
 */

import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export function HomePage() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <div className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Legal Services for Everyone
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Open-source platform democratizing access to legal document preparation, filing
            assistance, and affordable legal guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn-primary text-lg">
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn-primary text-lg">
                  Get Started Free
                </Link>
                <Link to="/login" className="btn-secondary text-lg">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">
          What We Offer
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card text-center">
            <div className="text-4xl mb-4">📄</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Document Preparation
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Guided workflows to prepare legal documents with confidence and accuracy.
            </p>
          </div>

          <div className="card text-center">
            <div className="text-4xl mb-4">🏢</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Business Formation
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Form your LLC or corporation quickly with state-specific requirements handled.
            </p>
          </div>

          <div className="card text-center">
            <div className="text-4xl mb-4">⚖️</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Legal Guidance
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Connect with licensed attorneys for consultations and legal advice when needed.
            </p>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-primary-600 dark:bg-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
          <p className="text-xl text-primary-100 mb-8">
            Create your account today and access affordable legal services.
          </p>
          {!isAuthenticated && (
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-3 bg-white text-primary-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Create Free Account
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
