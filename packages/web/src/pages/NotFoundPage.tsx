/**
 * 404 Not Found page
 */

import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary-600 dark:text-primary-400">
          404
        </h1>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-4 mb-2">
          Page not found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Link to="/" className="btn-primary">
          Go back home
        </Link>
      </div>
    </div>
  );
}
