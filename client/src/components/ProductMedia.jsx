import { useState } from 'react'

/**
 * ProductMedia — renders high-res product photography with a smooth fallback
 * to a custom vector silhouette if the image is unavailable offline.
 */
function ProductMedia({ src, alt, category, className = '', iconSize = 72 }) {
  const [failed, setFailed] = useState(false)
  const isClothing = category === 'clothes'

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={alt}
        onError={() => setFailed(true)}
        className={`w-full h-full object-cover ${className}`}
        loading="lazy"
      />
    )
  }

  return (
    <div
      className={`w-full h-full bg-gradient-to-br from-[#EDE9E3] via-[#E3DDD4] to-[#D4CFC8]
                  flex flex-col items-center justify-center gap-3 ${className}`}
      aria-hidden="true"
    >
      {isClothing ? (
        <svg width={iconSize} height={iconSize} viewBox="0 0 72 72" fill="none">
          <path
            d="M22 10 L9 24 L18 28 L18 60 H54 V28 L63 24 L50 10 L41 18 H31 L22 10Z"
            fill="var(--color-primary)"
            fillOpacity=".14"
            stroke="var(--color-primary)"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M31 18 Q36 26 41 18"
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="1.8"
          />
        </svg>
      ) : (
        <svg width={iconSize} height={iconSize} viewBox="0 0 72 72" fill="none">
          <rect
            x="18"
            y="24"
            width="36"
            height="38"
            rx="5"
            fill="var(--color-primary)"
            fillOpacity=".14"
            stroke="var(--color-primary)"
            strokeWidth="1.8"
          />
          <path
            d="M27 24 Q27 12 36 12 Q45 12 45 24"
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="1.8"
          />
          <rect
            x="24"
            y="34"
            width="24"
            height="14"
            rx="3"
            fill="var(--color-primary)"
            fillOpacity=".2"
          />
          <line
            x1="36"
            y1="24"
            x2="36"
            y2="62"
            stroke="var(--color-primary)"
            strokeWidth="1"
            strokeOpacity=".3"
          />
        </svg>
      )}
      <span className="text-[11px] font-bold tracking-widest uppercase text-[var(--color-text-muted)]">
        {isClothing ? 'Apparel' : 'Gear'}
      </span>
    </div>
  )
}

export default ProductMedia

