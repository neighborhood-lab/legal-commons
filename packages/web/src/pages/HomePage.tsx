/**
 * Home page / landing page
 */

import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../contexts/AuthContext'

export function HomePage() {
  const { isAuthenticated } = useAuth()
  const { t } = useTranslation('home')

  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <div className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn-primary text-lg">
                {t('hero.cta_dashboard')}
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn-primary text-lg">
                  {t('hero.cta_register')}
                </Link>
                <Link to="/login" className="btn-secondary text-lg">
                  {t('hero.cta_login')}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-4">
          {t('features.title')}
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          {t('features.subtitle')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {t('features.fast.title')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">{t('features.fast.description')}</p>
          </div>

          <div className="card text-center">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {t('features.affordable.title')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t('features.affordable.description')}
            </p>
          </div>

          <div className="card text-center">
            <div className="text-4xl mb-4">🌍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {t('features.accessible.title')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t('features.accessible.description')}
            </p>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="bg-gray-50 dark:bg-gray-800 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">
            {t('how_it_works.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {t('how_it_works.step1.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t('how_it_works.step1.description')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {t('how_it_works.step2.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t('how_it_works.step2.description')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {t('how_it_works.step3.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t('how_it_works.step3.description')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* State coverage */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-4">
          {t('states.title')}
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          {t('states.subtitle')}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-3xl mx-auto">
          <div className="card text-center">
            <div className="text-2xl mb-2">🌴</div>
            <div className="font-semibold text-gray-900 dark:text-gray-100">
              {t('states.california')}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {t('states.filing_fee', { fee: '70' })}
            </div>
          </div>
          <div className="card text-center">
            <div className="text-2xl mb-2">🗽</div>
            <div className="font-semibold text-gray-900 dark:text-gray-100">
              {t('states.new_york')}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {t('states.filing_fee', { fee: '200' })}
            </div>
          </div>
          <div className="card text-center">
            <div className="text-2xl mb-2">🤠</div>
            <div className="font-semibold text-gray-900 dark:text-gray-100">
              {t('states.texas')}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {t('states.filing_fee', { fee: '300' })}
            </div>
          </div>
          <div className="card text-center">
            <div className="text-2xl mb-2">🌊</div>
            <div className="font-semibold text-gray-900 dark:text-gray-100">
              {t('states.florida')}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {t('states.filing_fee', { fee: '125' })}
            </div>
          </div>
          <div className="card text-center">
            <div className="text-2xl mb-2">🏛️</div>
            <div className="font-semibold text-gray-900 dark:text-gray-100">
              {t('states.delaware')}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {t('states.filing_fee', { fee: '90' })}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">
          {t('faq.title')}
        </h2>
        <div className="space-y-6">
          <details className="card group">
            <summary className="cursor-pointer font-semibold text-lg text-gray-900 dark:text-gray-100 list-none flex justify-between items-center">
              {t('faq.question1.question')}
              <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-4 text-gray-600 dark:text-gray-400">{t('faq.question1.answer')}</p>
          </details>

          <details className="card group">
            <summary className="cursor-pointer font-semibold text-lg text-gray-900 dark:text-gray-100 list-none flex justify-between items-center">
              {t('faq.question2.question')}
              <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-4 text-gray-600 dark:text-gray-400">{t('faq.question2.answer')}</p>
          </details>

          <details className="card group">
            <summary className="cursor-pointer font-semibold text-lg text-gray-900 dark:text-gray-100 list-none flex justify-between items-center">
              {t('faq.question3.question')}
              <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-4 text-gray-600 dark:text-gray-400">{t('faq.question3.answer')}</p>
          </details>

          <details className="card group">
            <summary className="cursor-pointer font-semibold text-lg text-gray-900 dark:text-gray-100 list-none flex justify-between items-center">
              {t('faq.question4.question')}
              <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-4 text-gray-600 dark:text-gray-400">{t('faq.question4.answer')}</p>
          </details>

          <details className="card group">
            <summary className="cursor-pointer font-semibold text-lg text-gray-900 dark:text-gray-100 list-none flex justify-between items-center">
              {t('faq.question5.question')}
              <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-4 text-gray-600 dark:text-gray-400">{t('faq.question5.answer')}</p>
          </details>

          <details className="card group">
            <summary className="cursor-pointer font-semibold text-lg text-gray-900 dark:text-gray-100 list-none flex justify-between items-center">
              {t('faq.question6.question')}
              <span className="text-2xl group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-4 text-gray-600 dark:text-gray-400">{t('faq.question6.answer')}</p>
          </details>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-primary-600 dark:bg-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">{t('cta.title')}</h2>
          <p className="text-xl text-primary-100 mb-8">{t('cta.subtitle')}</p>
          {!isAuthenticated && (
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-3 bg-white text-primary-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              {t('cta.button')}
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
