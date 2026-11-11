import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function IconChevron({ open }) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.2 }}
      className="text-gray-500 shrink-0"
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </motion.svg>
  )
}

function IconCheck() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-[var(--color-primary)] shrink-0"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

/**
 * CustomSelect — design-system dropdown replacing native OS <select> menus.
 * Supports 'pill' (filter/sort bars) and 'floating' (checkout form fields) variants.
 */
function CustomSelect({
  value,
  onChange,
  options,
  label,
  prefix,
  variant = 'pill',
  ariaLabel,
  className = '',
}) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)

  const selectedOption = options.find((o) => o.value === value) ?? options[0]

  useEffect(() => {
    if (!open) return

    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
      }
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  const isFloating = variant === 'floating'

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel ?? label}
        className={[
          'w-full flex items-center justify-between gap-3 bg-white border text-left transition-all duration-200 cursor-pointer',
          isFloating
            ? 'px-4 pt-5 pb-2 rounded-2xl shadow-sm'
            : 'px-4 py-2.5 rounded-full shadow-sm min-w-[190px]',
          open
            ? 'border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/20'
            : 'border-gray-200 hover:border-[var(--color-primary)]/60',
        ].join(' ')}
      >
        {isFloating && label && (
          <span className="pointer-events-none absolute left-4 top-2 text-[11px] font-bold uppercase tracking-wider text-[var(--color-primary)]">
            {label}
          </span>
        )}

        <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 truncate">
          {prefix && (
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              {prefix}
            </span>
          )}
          <span className="truncate">{selectedOption?.label}</span>
        </span>

        <IconChevron open={open} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label={ariaLabel ?? label}
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="absolute right-0 mt-2 w-full min-w-[220px] max-h-64 overflow-y-auto z-40
                       bg-white rounded-2xl border border-gray-200 shadow-xl p-1.5 flex flex-col gap-0.5"
          >
            {options.map((opt) => {
              const isSelected = opt.value === value
              return (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(opt.value)
                    setOpen(false)
                  }}
                  className={[
                    'flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl text-sm cursor-pointer transition-colors duration-150',
                    isSelected
                      ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-bold'
                      : 'text-gray-700 font-medium hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-primary)]',
                  ].join(' ')}
                >
                  <span className="truncate">{opt.label}</span>
                  {isSelected && <IconCheck />}
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CustomSelect

