/**
 * Shared product catalog data — single source of truth for mock products.
 * Both ShopPage and ProductDetailPage import from here.
 */

export const ALL_PRODUCTS = [
  {
    id: 'prod-001',
    title: 'Ultralight Rain Jacket — 3L Gore-Tex',
    price: 7995,
    category: 'clothes',
    badges: ['Waterproof', 'Ultralight'],
    weight: 285,          // grams
    waterproofRating: 20000, // mm
    material: 'Gore-Tex Pro 3L',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { label: 'Forest Olive', hex: '#4A5D23' },
      { label: 'Slate Gray',   hex: '#708090' },
      { label: 'Burnt Orange', hex: '#C8460A' },
    ],
    stock: 18,
    description:
      "Built for Luzon's unpredictable ridge weather, this 3-layer Gore-Tex shell seals out monsoon rain while staying packable enough for a summit bag. Fully taped seams, underarm zips for ventilation, and a helmet-compatible hood rated for Class 4 gusts.",
    specs: [
      { label: 'Weight', value: '285 g' },
      { label: 'Waterproof Rating', value: '20,000 mm' },
      { label: 'Breathability', value: '15,000 g/m²/24hr' },
      { label: 'Material', value: 'Gore-Tex Pro 3L' },
      { label: 'Seams', value: 'Fully taped' },
      { label: 'Packability', value: 'Stuffs into chest pocket' },
      { label: 'Activity', value: 'Alpine, Thru-Hike' },
    ],
  },
  {
    id: 'prod-002',
    title: 'Merino Wool Base Layer Long Sleeve',
    price: 2850,
    category: 'clothes',
    badges: ['Merino', 'Breathable'],
    weight: 190,
    waterproofRating: null,
    material: '100% New Zealand Merino 185 gsm',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { label: 'Natural Ecru', hex: '#F5F0E8' },
      { label: 'Charcoal',     hex: '#3D3D3D' },
      { label: 'Forest Green', hex: '#2D5A27' },
    ],
    stock: 34,
    description:
      'Natural odour resistance and thermoregulation make this Merino base layer ideal for multi-day traverses from Mt. Pulag to Mt. Dulang-Dulang. The flat-lock seams prevent chafing under a pack, and the itch-free 185 gsm knit dries faster than synthetic alternatives at elevation.',
    specs: [
      { label: 'Weight', value: '190 g' },
      { label: 'Fabric', value: '185 gsm Merino' },
      { label: 'Origin', value: 'New Zealand Merino' },
      { label: 'Seams', value: 'Flat-lock (anti-chafe)' },
      { label: 'Odour Control', value: 'Natural lanolin' },
      { label: 'Activity', value: 'Day Hike, Overnight, Alpine' },
    ],
  },
  {
    id: 'prod-003',
    title: 'Windproof Softshell Mid-Layer Hoodie',
    price: 4200,
    category: 'clothes',
    badges: ['Windproof', 'Breathable'],
    weight: 420,
    waterproofRating: 5000,
    material: 'Polartec Power Stretch Pro',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { label: 'Gunmetal',   hex: '#4A4A4A' },
      { label: 'Cobalt',     hex: '#1A56A8' },
    ],
    stock: 22,
    description:
      "The Polartec Power Stretch Pro outer face blocks wind chill on exposed ridgelines (think Tarak Ridge or Mt. Ulap's saddle), while the brushed inner traps warmth without bulk. Stretchy four-way construction lets you move freely on technical scrambles.",
    specs: [
      { label: 'Weight', value: '420 g' },
      { label: 'Windproof Rating', value: 'Class 3 (EN 13528)' },
      { label: 'Waterproof Rating', value: '5,000 mm' },
      { label: 'Fabric', value: 'Polartec Power Stretch Pro' },
      { label: 'Stretch', value: '4-way mechanical stretch' },
      { label: 'Activity', value: 'Alpine, Day Hike' },
    ],
  },
  {
    id: 'prod-004',
    title: 'Sun-Protective Trail Shirt — UPF 50+',
    price: 1750,
    category: 'clothes',
    badges: ['UV Protect', 'Breathable'],
    weight: 155,
    waterproofRating: null,
    material: 'Nylon-Polyester blend, UPF 50+',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { label: 'Desert Sand', hex: '#C2A97A' },
      { label: 'Sky Blue',    hex: '#6EB0D6' },
      { label: 'White',       hex: '#F8F8F8' },
    ],
    stock: 50,
    description:
      'Designed for the harsh midday sun on open volcanic trails (Mayon, Kanlaon), the tight-woven UPF 50+ fabric shields your skin while the mesh-panelled back vents heat. Roll up the sleeves and secure them with the button tab for summit selfie mode.',
    specs: [
      { label: 'Weight', value: '155 g' },
      { label: 'UV Protection', value: 'UPF 50+' },
      { label: 'Fabric', value: 'Nylon-Polyester blend' },
      { label: 'Fit', value: 'Relaxed / active' },
      { label: 'Activity', value: 'Day Hike, Trail Run' },
    ],
  },
  {
    id: 'prod-005',
    title: '45L Alpine Assault Pack — Dyneema Frame',
    price: 11500,
    category: 'gear',
    badges: ['Ultralight', 'Waterproof'],
    weight: 890,
    waterproofRating: 10000,
    material: 'Dyneema Composite Hybrid + 210D ripstop nylon',
    sizes: ['One Size'],
    colors: [
      { label: 'Ranger Green', hex: '#3B4A2F' },
      { label: 'Black',        hex: '#1A1A1A' },
    ],
    stock: 9,
    description:
      'The lightest 45L pack designed for the Philippine ultralight hiking scene. The Dyneema composite fabric sheds water and resists abrasion on rocky Cordillera trails. The internal HDPE framesheet transfers load to the hip belt for 20+ km carries.',
    specs: [
      { label: 'Weight', value: '890 g' },
      { label: 'Volume', value: '45 L' },
      { label: 'Waterproof Rating', value: '10,000 mm DWR' },
      { label: 'Frame', value: 'HDPE framesheet + aluminium stay' },
      { label: 'Fabric', value: 'Dyneema CH + 210D ripstop' },
      { label: 'Activity', value: 'Overnight, Multi-day, Alpine' },
    ],
  },
  {
    id: 'prod-006',
    title: 'Titanium Single-Wall Mug 450ml',
    price: 1250,
    category: 'gear',
    badges: ['Ultralight'],
    weight: 68,
    waterproofRating: null,
    material: 'Grade 1 Titanium',
    sizes: ['One Size'],
    colors: [{ label: 'Raw Titanium', hex: '#B2B4B8' }],
    stock: 60,
    description:
      'At 68 g, this titanium mug is lighter than a banana. Direct flame-compatible — place it straight on your Primus LiTech or MSR PocketRocket stove. Doubles as a lightweight cooking pot for instant rice or ramen after a Pulag summit.',
    specs: [
      { label: 'Weight', value: '68 g' },
      { label: 'Capacity', value: '450 mL' },
      { label: 'Material', value: 'Grade 1 Titanium' },
      { label: 'Direct Flame', value: 'Yes (no coatings)' },
      { label: 'Handle', value: 'Foldable wire bail' },
      { label: 'Activity', value: 'Backpacking, Alpine, UL' },
    ],
  },
  {
    id: 'prod-007',
    title: 'Trekking Pole Set — Carbon Fibre Twist-Lock',
    price: 3400,
    category: 'gear',
    badges: ['Ultralight'],
    weight: 440,
    waterproofRating: null,
    material: '100% 3K Carbon Fibre',
    sizes: ['One Size'],
    colors: [
      { label: 'Carbon Black', hex: '#2A2A2A' },
      { label: 'Carbon Grey',  hex: '#5C5C5C' },
    ],
    stock: 15,
    description:
      'Engineered for the steep descents on Mt. Halcon and the loose scree of Mt. Tabayoc. The 3K carbon shafts reduce vibration on rocky sections, while the cork grips wick sweat during sweaty Visayas climbs. Folds to 38 cm for pack attachment.',
    specs: [
      { label: 'Weight (pair)', value: '440 g' },
      { label: 'Material', value: '100% 3K Carbon Fibre' },
      { label: 'Length Range', value: '100–135 cm (twist-lock)' },
      { label: 'Grip', value: 'Natural cork + EVA extension' },
      { label: 'Basket', value: 'Trekking + Snow baskets included' },
      { label: 'Packed Length', value: '38 cm (3-section fold)' },
      { label: 'Activity', value: 'Trekking, Alpine, Trail Run' },
    ],
  },
  {
    id: 'prod-008',
    title: 'Waterproof Compression Dry Bag 20L',
    price: 890,
    category: 'gear',
    badges: ['Waterproof'],
    weight: 120,
    waterproofRating: null,
    material: '210D Ripstop TPU-laminated nylon',
    sizes: ['One Size'],
    colors: [
      { label: 'Signal Orange', hex: '#E05020' },
      { label: 'Cobalt Blue',   hex: '#1E4A9A' },
    ],
    stock: 40,
    description:
      'Roll-top closure seals out river crossings and sudden downpours common on Mindanao trails. Compression straps shrink the packed volume by 40% when partially filled. High-vis orange makes camp gear easy to find inside a large pack.',
    specs: [
      { label: 'Weight', value: '120 g' },
      { label: 'Volume', value: '20 L' },
      { label: 'Fabric', value: '210D Ripstop + TPU laminate' },
      { label: 'Closure', value: 'Roll-top (3-roll seal)' },
      { label: 'Submersion', value: 'IPX6 — full submersion 1 m/30 min' },
      { label: 'Activity', value: 'Backpacking, River Crossing' },
    ],
  },
]

/** Look up a single product by ID. */
export function getProductById(id) {
  return ALL_PRODUCTS.find((p) => p.id === id) ?? null
}

