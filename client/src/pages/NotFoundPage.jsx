import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-20 text-center">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 max-w-md w-full flex flex-col items-center">
        <p className="text-6xl mb-4">🏔️</p>
        <h1
          className="text-3xl font-extrabold text-gray-900 mb-2"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Trail Not Found
        </h1>
        <p className="text-sm text-[var(--color-text-muted)] mb-8">
          Looks like you&apos;ve wandered off the ridge. This page doesn&apos;t exist.
        </p>
        <Link
          to="/"
          className="px-7 py-3.5 rounded-full bg-[var(--color-primary)] text-white text-sm font-bold
                     shadow-sm hover:brightness-110 active:scale-95 transition-all duration-300"
        >
          Back to Base Camp
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
