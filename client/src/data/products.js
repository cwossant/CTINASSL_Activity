/**
 * Shared product catalog data — single source of truth for mock products.
 * Includes Philippine hiking gear & apparel with technical specs and multi-angle images.
 */

export const HERO_IMAGE =
  'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1800&q=80'

export const ALL_PRODUCTS = [
  {
    id: 'prod-001',
    title: 'Ultralight Rain Jacket — 3L Gore-Tex',
    price: 7995,
    category: 'clothes',
    badges: ['Waterproof', 'Ultralight'],
    weight: 285,
    waterproofRating: 20000,
    material: 'Gore-Tex Pro 3L',
    imageSrc:
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=80',
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1000&q=80',
        label: 'Front Shell View',
      },
      {
        src: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?auto=format&fit=crop&w=1000&q=80',
        label: 'Ridge Weather Test',
      },
      {
        src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80',
        label: 'Alpine Condition Field Shot',
      },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { label: 'Forest Olive', hex: '#4A5D23' },
      { label: 'Slate Gray', hex: '#708090' },
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
    imageSrc:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=80',
        label: 'Base Layer Fit',
      },
      {
        src: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=1000&q=80',
        label: 'Trail Layering',
      },
      {
        src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
        label: 'Cold Summit Wear',
      },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { label: 'Natural Ecru', hex: '#F5F0E8' },
      { label: 'Charcoal', hex: '#3D3D3D' },
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
    imageSrc:
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80',
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1000&q=80',
        label: 'Mid-Layer Profile',
      },
      {
        src: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1000&q=80',
        label: 'Ridgeline Wind Test',
      },
      {
        src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80',
        label: 'Pre-Dawn Ascent',
      },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { label: 'Gunmetal', hex: '#4A4A4A' },
      { label: 'Cobalt', hex: '#1A56A8' },
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
    imageSrc:
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=80',
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=80',
        label: 'Breathable Weave',
      },
      {
        src: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1000&q=80',
        label: 'Open Ridge Sun',
      },
      {
        src: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1000&q=80',
        label: 'Active Mobility',
      },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { label: 'Desert Sand', hex: '#C2A97A' },
      { label: 'Sky Blue', hex: '#6EB0D6' },
      { label: 'White', hex: '#F8F8F8' },
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
    imageSrc:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80',
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80',
        label: 'Pack Profile',
      },
      {
        src: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=1000&q=80',
        label: 'Trail Carry',
      },
      {
        src: 'https://images.unsplash.com/photo-1622260614153-03223fb72052?auto=format&fit=crop&w=1000&q=80',
        label: 'Harness & Compression',
      },
    ],
    sizes: ['One Size'],
    colors: [
      { label: 'Ranger Green', hex: '#3B4A2F' },
      { label: 'Black', hex: '#1A1A1A' },
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
    imageSrc:
      'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=900&q=80',
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=1000&q=80',
        label: 'Camp Brew Setup',
      },
      {
        src: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1000&q=80',
        label: 'Basecamp Essential',
      },
      {
        src: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1000&q=80',
        label: 'Morning Trail Stove',
      },
    ],
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
    imageSrc:
      'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=900&q=80',
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1000&q=80',
        label: 'Steep Descent Support',
      },
      {
        src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
        label: 'Cordillera Scree Trail',
      },
      {
        src: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1000&q=80',
        label: 'Foldable Storage',
      },
    ],
    sizes: ['One Size'],
    colors: [
      { label: 'Carbon Black', hex: '#2A2A2A' },
      { label: 'Carbon Grey', hex: '#5C5C5C' },
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
    imageSrc:
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=900&q=80',
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1000&q=80',
        label: 'Camp Storage',
      },
      {
        src: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80',
        label: 'Pack Liner Setup',
      },
      {
        src: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1000&q=80',
        label: 'Monsoon Protection',
      },
    ],
    sizes: ['One Size'],
    colors: [
      { label: 'Signal Orange', hex: '#E05020' },
      { label: 'Cobalt Blue', hex: '#1E4A9A' },
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
  {
    id: 'prod-009',
    title: '2-Person Ultralight Backpacking Tent — 15D Silnylon',
    price: 9450,
    category: 'gear',
    badges: ['Waterproof', 'Ultralight'],
    weight: 1180,
    waterproofRating: 3000,
    material: '15D Ripstop Silnylon PU3000mm',
    imageSrc:
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=900&q=80',
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1000&q=80',
        label: 'Summit Pitch',
      },
      {
        src: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1000&q=80',
        label: 'Vestibule Setup',
      },
      {
        src: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1000&q=80',
        label: 'Monsoon Wind Test',
      },
    ],
    sizes: ['2 Person'],
    colors: [
      { label: 'Pine Green', hex: '#2E4C23' },
      { label: 'Sunrise Gold', hex: '#D49B28' },
    ],
    stock: 12,
    description:
      'Dual-vestibule, freestanding 3-season shelter engineered to resist heavy rainfall and high-elevation winds on Mt. Pulag and Mt. Apo. High-ceiling geometry with reflective guy lines and DAC aluminum poles.',
    specs: [
      { label: 'Weight', value: '1,180 g (trail weight)' },
      { label: 'Capacity', value: '2 Persons' },
      { label: 'Waterproof Rating', value: '3,000 mm (Fly & Tub)' },
      { label: 'Poles', value: 'DAC Featherlite NSL 8.5mm' },
      { label: 'Packed Size', value: '40 x 12 cm' },
      { label: 'Activity', value: 'Thru-Hiking, Alpine Camp' },
    ],
  },
  {
    id: 'prod-010',
    title: 'Cordillera Quick-Dry Convertible Trail Pants',
    price: 2450,
    category: 'clothes',
    badges: ['Breathable', 'UV Protect'],
    weight: 295,
    waterproofRating: null,
    material: '4-Way Stretch DWR Nylon',
    imageSrc:
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=900&q=80',
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=1000&q=80',
        label: 'Trail Fit Front',
      },
      {
        src: 'https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=1000&q=80',
        label: 'Climbing Mobility',
      },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { label: 'Earth Khaki', hex: '#8B7D6B' },
      { label: 'Granite Slate', hex: '#4A4E53' },
    ],
    stock: 24,
    description:
      'Converts from full-length pants to trail shorts in seconds via concealed leg zippers. Water-repellent DWR finish sheds light mud and mist, with reinforced seat and knee panels designed for Luzon jungle scrambles.',
    specs: [
      { label: 'Weight', value: '295 g' },
      { label: 'Sun Protection', value: 'UPF 50+' },
      { label: 'Pockets', value: '6 Cargo & Zippered Pockets' },
      { label: 'Material', value: '92% Nylon, 8% Spandex with DWR' },
      { label: 'Activity', value: 'Trekking, River Trek' },
    ],
  },
  {
    id: 'prod-011',
    title: '800-Lumen Rechargeable LED Headlamp — IPX8',
    price: 1950,
    category: 'gear',
    badges: ['Waterproof', 'Ultralight'],
    weight: 78,
    waterproofRating: 10000,
    material: 'Anodized Aero Aluminum + Elastic Band',
    imageSrc:
      'https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=900&q=80',
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=1000&q=80',
        label: 'Night Trek Beam',
      },
      {
        src: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1000&q=80',
        label: 'Camp Lighting',
      },
    ],
    sizes: ['One Size'],
    colors: [
      { label: 'Matte Black', hex: '#1C1C1C' },
      { label: 'Signal Orange', hex: '#D35400' },
    ],
    stock: 35,
    description:
      'Critical summit dawn-assault illumination with dual white flood/spot and red night-vision LEDs. USB-C fast charging with 45-hour runtime on eco mode and IPX8 waterproofing for torrential monsoon downpours.',
    specs: [
      { label: 'Weight', value: '78 g (with battery)' },
      { label: 'Max Output', value: '800 Lumens' },
      { label: 'Beam Distance', value: '120 meters' },
      { label: 'Battery', value: '1,800mAh Li-ion USB-C' },
      { label: 'Waterproof', value: 'IPX8 (2m submersible)' },
      { label: 'Activity', value: 'Dawn Summit, Night Trek' },
    ],
  },
  {
    id: 'prod-012',
    title: '850FP Hydrophobic Down Summit Sleeping Bag (0°C)',
    price: 8850,
    category: 'gear',
    badges: ['Ultralight', 'Windproof'],
    weight: 680,
    waterproofRating: null,
    material: '10D Toray Ripstop Nylon + 850FP Down',
    imageSrc:
      'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=900&q=80',
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=1000&q=80',
        label: 'Bivy Camp Setup',
      },
      {
        src: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1000&q=80',
        label: 'Packed Size Compression',
      },
    ],
    sizes: ['Regular (up to 183cm)', 'Long (up to 198cm)'],
    colors: [
      { label: 'Rust Clay', hex: '#B85435' },
      { label: 'Forest Green', hex: '#2E4C23' },
    ],
    stock: 14,
    description:
      'Sub-700g cold-campsite essential for Mt. Pulag summit freezes. Treated hydrophobic down resists tropical mist and condensation while compressing to the size of a water bottle in your pack.',
    specs: [
      { label: 'Weight', value: '680 g' },
      { label: 'Comfort Temp', value: '0°C (Limit -4°C)' },
      { label: 'Insulation', value: '850FP Hydrophobic Goose Down' },
      { label: 'Packed Size', value: '28 x 14 cm' },
      { label: 'Activity', value: 'Pulag Cold Camp, High Alpine' },
    ],
  },
  {
    id: 'prod-013',
    title: 'Cushioned Merino Wool Trail Socks (2-Pack)',
    price: 780,
    category: 'clothes',
    badges: ['Merino', 'Breathable'],
    weight: 80,
    waterproofRating: null,
    material: '72% Australian Merino, 24% Nylon, 4% Lycra',
    imageSrc:
      'https://images.unsplash.com/photo-1582966772680-860e372bb558?auto=format&fit=crop&w=900&q=80',
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1582966772680-860e372bb558?auto=format&fit=crop&w=1000&q=80',
        label: 'Trail Pair View',
      },
    ],
    sizes: ['S (35-38)', 'M (39-42)', 'L (43-46)'],
    colors: [
      { label: 'Heather Pine', hex: '#3B5336' },
      { label: 'Oatmeal Taupe', hex: '#A89F91' },
    ],
    stock: 50,
    description:
      'Seamless toe construction prevents hot spots and trail blisters during steep Cordillera descents. Naturally odor-resistant wool retains warmth even when soaked from river crossings.',
    specs: [
      { label: 'Weight', value: '80 g / pair' },
      { label: 'Cushioning', value: 'Medium Density Underfoot' },
      { label: 'Fabric', value: '72% Merino, 24% Nylon, 4% Lycra' },
      { label: 'Activity', value: 'Multi-Day Trek, Thru-Hike' },
    ],
  },
  {
    id: 'prod-014',
    title: '2.5L Insulated Trail Hydration Reservoir',
    price: 1450,
    category: 'gear',
    badges: ['Ultralight'],
    weight: 145,
    waterproofRating: null,
    material: 'BPA-Free TPU + Thermal Neoprene Sleeve',
    imageSrc:
      'https://images.unsplash.com/photo-1517865288-978fcb780652?auto=format&fit=crop&w=900&q=80',
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1517865288-978fcb780652?auto=format&fit=crop&w=1000&q=80',
        label: 'Reservoir Setup',
      },
    ],
    sizes: ['2.5 L'],
    colors: [{ label: 'Glacier Blue', hex: '#5DADE2' }],
    stock: 30,
    description:
      'Wide-mouth slide-seal opening for easy ice loading and stream refills. Anti-microbial, taste-free TPU bladder with bite valve shut-off and insulated hose covering for tropical humidity.',
    specs: [
      { label: 'Weight', value: '145 g' },
      { label: 'Capacity', value: '2.5 Liters' },
      { label: 'Hose Length', value: '100 cm insulated' },
      { label: 'Valve', value: 'High-Flow 360° Surge Valve' },
      { label: 'Activity', value: 'Trail Running, Mountain Trek' },
    ],
  },
  {
    id: 'prod-015',
    title: 'Mt. Pulag Summit Badge Technical Trail Tee',
    price: 950,
    category: 'clothes',
    badges: ['Breathable', 'UV Protect'],
    weight: 135,
    waterproofRating: null,
    material: '100% Recycled Poly Micro-Waffle',
    imageSrc:
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
        label: 'Front Elevation Graphic',
      },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { label: 'Terracotta Earth', hex: '#B85D36' },
      { label: 'Deep Moss', hex: '#2D4428' },
    ],
    stock: 45,
    description:
      'Lightweight technical running and hiking shirt with moisture-wicking micro-waffle fabric. UPF 40+ sun shielding with Philippine highland topographic elevation print on the back.',
    specs: [
      { label: 'Weight', value: '135 g' },
      { label: 'Sun Shield', value: 'UPF 40+' },
      { label: 'Fabric', value: 'Recycled Micro-Waffle Poly' },
      { label: 'Fit', value: 'Athletic Trail Cut' },
      { label: 'Activity', value: 'Hiking, Trail Run, Everyday' },
    ],
  },
  {
    id: 'prod-016',
    title: 'Titanium Ultralight Isobutane Backpacking Stove',
    price: 1650,
    category: 'gear',
    badges: ['Ultralight', 'Windproof'],
    weight: 48,
    waterproofRating: null,
    material: 'Grade TA1 Titanium Alloy + Brass Valve',
    imageSrc:
      'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=900&q=80',
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1000&q=80',
        label: 'Pocket Size Scale',
      },
      {
        src: 'https://images.unsplash.com/photo-1517865288-978fcb780652?auto=format&fit=crop&w=1000&q=80',
        label: 'Camp Boil Test',
      },
    ],
    sizes: ['One Size'],
    colors: [{ label: 'Titanium Gray', hex: '#777A80' }],
    stock: 28,
    description:
      'Pocket-sized 48g titan stove engineered with a concave burner head to resist ridge winds without extra windshields. Boils 500ml water in 2 minutes 45 seconds for hot summit camp coffee.',
    specs: [
      { label: 'Weight', value: '48 g' },
      { label: 'Output', value: '2,700 Watts (9,200 BTU)' },
      { label: 'Boil Time', value: '2m 45s (500ml water)' },
      { label: 'Compatibility', value: 'Standard Lindal EN417 Canisters' },
      { label: 'Activity', value: 'Ultralight Fastpacking, Camp Cooking' },
    ],
  },
]

/** Look up a single product by ID. */
export function getProductById(id) {
  return ALL_PRODUCTS.find((p) => p.id === id) ?? null
}
