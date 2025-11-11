/**
 * Main layout component wrapping all pages
 */

import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Skip to main content link for keyboard users */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Header />

      <main
        id="main-content"
        className="flex-1 bg-gray-50 dark:bg-gray-900"
        role="main"
      >
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
