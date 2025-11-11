/**
 * Dashboard page for authenticated users
 * Displays user's LLCs with search, filter, and quick actions
 */

import { useState, useEffect, useCallback, type ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { apiClient } from '../lib/api-client'

interface LLCCompany {
  id: string
  company_name: string
  state: string
  created_at: string
  updated_at: string
  memberCount: number
}

interface LLCListResponse {
  companies: LLCCompany[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export function DashboardPage() {
  const { user } = useAuth()
  const [llcs, setLlcs] = useState<LLCCompany[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [stateFilter, setStateFilter] = useState('')

  const fetchLLCs = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
      })

      if (searchTerm) {
        params.append('search', searchTerm)
      }

      if (stateFilter) {
        params.append('state', stateFilter)
      }

      const response = await apiClient.get<LLCListResponse>(`/llc/companies?${params.toString()}`)

      setLlcs(response.companies)
      setTotalPages(response.totalPages)
    } catch (err) {
      setError('Failed to load LLCs. Please try again.')
      console.error('Error fetching LLCs:', err)
    } finally {
      setLoading(false)
    }
  }, [page, searchTerm, stateFilter])

  useEffect(() => {
    fetchLLCs()
  }, [fetchLLCs])

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setPage(1) // Reset to first page on search
  }

  const handleStateFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setStateFilter(e.target.value)
    setPage(1) // Reset to first page on filter
  }

  const downloadDocuments = async (llcId: string, companyName: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/llc/companies/${llcId}/documents/operating-agreement/download`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      )

      if (!response.ok) throw new Error('Failed to download document')

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${companyName}_Operating_Agreement.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err) {
      console.error('Error downloading document:', err)
      window.alert('Failed to download document. Please try again.')
    }
  }

  if (loading && llcs.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your LLCs...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 rounded-lg p-4">
          <p className="text-error-800 dark:text-error-200">{error}</p>
          <button onClick={fetchLLCs} className="mt-2 btn-secondary">
            Try Again
          </button>
        </div>
      </div>
    )
  }

  // Empty state for new users
  if (!loading && llcs.length === 0 && !searchTerm && !stateFilter) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Welcome to Legal Commons, {user?.firstName}!
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Start your business journey today</p>
        </div>

        <div className="card text-center py-12">
          <svg
            className="mx-auto h-16 w-16 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">No LLCs yet</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Ready to form your LLC? It only takes 10 minutes to get started. We'll guide you through
            every step and generate professional documents.
          </p>
          <div className="mt-6">
            <Link to="/llc-formation" className="btn-primary">
              Start LLC Formation
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">My LLCs</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your limited liability companies
          </p>
        </div>
        <Link to="/llc-formation" className="btn-primary">
          + New LLC
        </Link>
      </div>

      {/* Search and filter bar */}
      <div className="mb-6 card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="search" className="sr-only">
              Search companies
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search by company name..."
              className="input w-full"
            />
          </div>
          <div>
            <label htmlFor="state-filter" className="sr-only">
              Filter by state
            </label>
            <select
              id="state-filter"
              value={stateFilter}
              onChange={handleStateFilterChange}
              className="input w-full"
            >
              <option value="">All States</option>
              <option value="CA">California</option>
              <option value="NY">New York</option>
              <option value="TX">Texas</option>
              <option value="FL">Florida</option>
              <option value="DE">Delaware</option>
            </select>
          </div>
        </div>
      </div>

      {/* LLC list */}
      {llcs.length === 0 ? (
        <div className="card text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">No LLCs found matching your filters.</p>
          <button
            onClick={() => {
              setSearchTerm('')
              setStateFilter('')
              setPage(1)
            }}
            className="mt-4 btn-secondary"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6">
            {llcs.map((llc) => (
              <div key={llc.id} className="card hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      {llc.company_name}
                    </h3>
                    <div className="mt-2 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span className="inline-flex items-center">
                        <svg
                          className="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {llc.state}
                      </span>
                      <span className="inline-flex items-center">
                        <svg
                          className="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        {llc.memberCount} {llc.memberCount === 1 ? 'member' : 'members'}
                      </span>
                      <span>Created {new Date(llc.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Link to={`/llc/${llc.id}`} className="btn-secondary text-sm">
                      View
                    </Link>
                    <button
                      onClick={() => downloadDocuments(llc.id, llc.company_name)}
                      className="btn-primary text-sm"
                    >
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-gray-600 dark:text-gray-400 px-4">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
