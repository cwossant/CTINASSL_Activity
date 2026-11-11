import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

/**
 * Layout — wraps every page with the global nav and applies the
 * design-token background/text colors defined in index.css.
 */
function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background)] text-[var(--color-text-main)]">
      <Navbar />

      {/* Page content sits below the fixed navbar */}
      <main className="flex-1 pt-[var(--spacing-navbar)]">
        <Outlet />
      </main>

      <footer className="border-t border-[var(--color-border)] py-6 text-center text-sm text-[var(--color-text-muted)]">
        © {new Date().getFullYear()} Ahon Outdoors · Philippine Hiking Gear
      </footer>
    </div>
  )
}

export default Layout

