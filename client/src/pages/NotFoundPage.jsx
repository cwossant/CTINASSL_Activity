import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4
                    bg-[var(--color-background)] text-center">
      <p className="text-6xl mb-4">🏔️</p>
      <h1
        className="text-4xl font-bold text-[var(--color-text-main)] mb-2"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Trail Not Found
      </h1>
      <p className="text-[var(--color-text-muted)] mb-8 max-w-sm">
        Looks like you&apos;ve wandered off the path. This page doesn&apos;t exist.
      </p>
      <Link
        to="/"
        className="px-6 py-2.5 rounded-lg bg-[var(--color-primary)] text-white
                   font-semibold hover:bg-[var(--color-primary-light)]
                   transition-colors duration-150"
      >
        Back to Base Camp
      </Link>
    </div>
  )
}

export default NotFoundPage

