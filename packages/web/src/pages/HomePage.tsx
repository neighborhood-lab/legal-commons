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
            Form Your LLC in Minutes, Not Months
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Affordable, accessible legal document preparation for entrepreneurs. No lawyer required.
            Support for CA, NY, TX, FL, and DE. Spanish language available.
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
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-4">
          Why Legal Commons?
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          We believe everyone should have access to legal services, regardless of income or
          language.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Fast</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Complete your LLC formation in 10 minutes. Instant document generation with
              professional templates.
            </p>
          </div>

          <div className="card text-center">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Affordable
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Free document generation. Pay only state filing fees ($90-$300). No $500-2000 lawyer
              fees.
            </p>
          </div>

          <div className="card text-center">
            <div className="text-4xl mb-4">🌍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Accessible
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Spanish language support. Plain English explanations. Mobile-friendly. Built for
              everyone.
            </p>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="bg-gray-50 dark:bg-gray-800 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Fill Out Form
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Answer simple questions about your business. We'll guide you through every step with
                plain language explanations.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Generate Documents
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We instantly create your Articles of Organization and Operating Agreement using
                professional legal templates.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                File with State
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Download your documents and follow our filing instructions. Your LLC will be
                official in days, not months.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* State coverage */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-4">
          Supported States
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          Form your LLC in any of these states with state-specific templates and requirements
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-3xl mx-auto">
          <div className="card text-center">
            <div className="text-2xl mb-2">🌴</div>
            <div className="font-semibold text-gray-900 dark:text-gray-100">California</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Filing Fee: $70</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl mb-2">🗽</div>
            <div className="font-semibold text-gray-900 dark:text-gray-100">New York</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Filing Fee: $200</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl mb-2">🤠</div>
            <div className="font-semibold text-gray-900 dark:text-gray-100">Texas</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Filing Fee: $300</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl mb-2">🌊</div>
            <div className="font-semibold text-gray-900 dark:text-gray-100">Florida</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Filing Fee: $125</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl mb-2">🏛️</div>
            <div className="font-semibold text-gray-900 dark:text-gray-100">Delaware</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Filing Fee: $90</div>
          </div>
        </div>
      </div>

      {/* FAQ section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <details className="card group">
            <summary className="cursor-pointer font-semibold text-lg text-gray-900 dark:text-gray-100 list-none flex justify-between items-center">
              What is an LLC and do I need one?
              <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              An LLC (Limited Liability Company) protects your personal assets from business debts
              and lawsuits. If you're starting a business, freelancing, or managing rental
              properties, an LLC provides legal protection and tax benefits.
            </p>
          </details>

          <details className="card group">
            <summary className="cursor-pointer font-semibold text-lg text-gray-900 dark:text-gray-100 list-none flex justify-between items-center">
              How much does it cost to form an LLC?
              <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Legal Commons provides free document generation. You only pay state filing fees
              ($70-$300 depending on your state). Compare that to lawyers who charge $500-$2,000 or
              services like LegalZoom that charge $300+ in addition to state fees.
            </p>
          </details>

          <details className="card group">
            <summary className="cursor-pointer font-semibold text-lg text-gray-900 dark:text-gray-100 list-none flex justify-between items-center">
              Do I need a lawyer to form an LLC?
              <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              No! Our platform guides you through the entire process with simple questions and
              generates state-compliant legal documents. We use the same templates lawyers use. You
              can form your LLC yourself and save thousands of dollars.
            </p>
          </details>

          <details className="card group">
            <summary className="cursor-pointer font-semibold text-lg text-gray-900 dark:text-gray-100 list-none flex justify-between items-center">
              How long does it take to form an LLC?
              <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              You can complete our form in about 10 minutes. After you file your documents with the
              state, approval typically takes 1-2 weeks depending on the state. Some states offer
              expedited processing for an additional fee.
            </p>
          </details>

          <details className="card group">
            <summary className="cursor-pointer font-semibold text-lg text-gray-900 dark:text-gray-100 list-none flex justify-between items-center">
              What states do you support?
              <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              We currently support California, New York, Texas, Florida, and Delaware. These states
              represent over 40% of all US businesses. We're continuously expanding to more states.
            </p>
          </details>

          <details className="card group">
            <summary className="cursor-pointer font-semibold text-lg text-gray-900 dark:text-gray-100 list-none flex justify-between items-center">
              Is Legal Commons available in Spanish?
              <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Yes! We offer full Spanish language support for the entire platform. Use the language
              switcher in the header to switch between English and Spanish (Español).
            </p>
          </details>
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
