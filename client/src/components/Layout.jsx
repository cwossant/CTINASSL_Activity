import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import CartDrawer from './CartDrawer'

/**
 * Layout — persistent application shell with sticky glassmorphic Navbar,
 * global AnimatePresence route transitions, slide-out CartDrawer, and Footer.
 */
function Layout({ children }) {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background)] text-[var(--color-text-main)]">
      <Navbar />
      <CartDrawer />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  )
}

export default Layout
