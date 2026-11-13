const dotenv = require('dotenv')
const connectDB = require('./db')
const Product = require('../models/Product')

dotenv.config()

const SEED_PRODUCTS = [
  {
    sku: 'AHN-001',
    title: 'Ultralight Rain Jacket — 3L Gore-Tex',
    price: 7995,
    category: 'clothes',
    badges: ['Waterproof', 'Ultralight'],
    weight: 285,
    waterproofRating: 20000,
    material: 'Gore-Tex Pro 3L',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1000&q=80',
        label: 'Front Shell View',
      },
      {
        src: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?auto=format&fit=crop&w=1000&q=80',
        label: 'Ridge Weather Test',
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
      "Built for Luzon's unpredictable ridge weather, this 3-layer Gore-Tex shell seals out monsoon rain while staying packable enough for a summit bag.",
    specs: [
      { label: 'Weight', value: '285 g' },
      { label: 'Waterproof Rating', value: '20,000 mm' },
      { label: 'Material', value: 'Gore-Tex Pro 3L' },
    ],
  },
  {
    sku: 'AHN-002',
    title: 'Merino Wool Base Layer Long Sleeve',
    price: 2850,
    category: 'clothes',
    badges: ['Merino', 'Breathable'],
    weight: 190,
    waterproofRating: null,
    material: '100% New Zealand Merino 185 gsm',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=80',
        label: 'Base Layer Fit',
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
      'Natural odour resistance and thermoregulation make this Merino base layer ideal for multi-day traverses from Mt. Pulag to Mt. Dulang-Dulang.',
    specs: [
      { label: 'Weight', value: '190 g' },
      { label: 'Fabric', value: '185 gsm Merino' },
    ],
  },
  {
    sku: 'AHN-003',
    title: 'Windproof Softshell Mid-Layer Hoodie',
    price: 4200,
    category: 'clothes',
    badges: ['Windproof', 'Breathable'],
    weight: 420,
    waterproofRating: 5000,
    material: 'Polartec Power Stretch Pro',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1000&q=80',
        label: 'Mid-Layer Profile',
      },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { label: 'Gunmetal', hex: '#4A4A4A' },
      { label: 'Cobalt', hex: '#1A56A8' },
    ],
    stock: 22,
    description:
      "The Polartec Power Stretch Pro outer face blocks wind chill on exposed ridgelines such as Tarak Ridge and Mt. Ulap's saddle.",
    specs: [
      { label: 'Weight', value: '420 g' },
      { label: 'Waterproof Rating', value: '5,000 mm' },
    ],
  },
  {
    sku: 'AHN-004',
    title: 'Sun-Protective Trail Shirt — UPF 50+',
    price: 1750,
    category: 'clothes',
    badges: ['UV Protect', 'Breathable'],
    weight: 155,
    waterproofRating: null,
    material: 'Nylon-Polyester blend, UPF 50+',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=80',
        label: 'Breathable Weave',
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
      'Designed for harsh midday sun on open volcanic trails like Mayon and Kanlaon with mesh-panelled back ventilation.',
    specs: [
      { label: 'Weight', value: '155 g' },
      { label: 'UV Protection', value: 'UPF 50+' },
    ],
  },
  {
    sku: 'AHN-005',
    title: '45L Alpine Assault Pack — Dyneema Frame',
    price: 11500,
    category: 'gear',
    badges: ['Ultralight', 'Waterproof'],
    weight: 890,
    waterproofRating: 10000,
    material: 'Dyneema Composite Hybrid + 210D ripstop nylon',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80',
        label: 'Pack Profile',
      },
    ],
    sizes: ['One Size'],
    colors: [
      { label: 'Ranger Green', hex: '#3B4A2F' },
      { label: 'Black', hex: '#1A1A1A' },
    ],
    stock: 9,
    description:
      'The lightest 45L pack built for the Philippine ultralight hiking scene with an internal HDPE framesheet for multi-day Cordillera carries.',
    specs: [
      { label: 'Weight', value: '890 g' },
      { label: 'Volume', value: '45 L' },
    ],
  },
  {
    sku: 'AHN-006',
    title: 'Titanium Single-Wall Mug 450ml',
    price: 1250,
    category: 'gear',
    badges: ['Ultralight'],
    weight: 68,
    waterproofRating: null,
    material: 'Grade 1 Titanium',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=1000&q=80',
        label: 'Camp Brew Setup',
      },
    ],
    sizes: ['One Size'],
    colors: [{ label: 'Raw Titanium', hex: '#B2B4B8' }],
    stock: 60,
    description:
      'Direct flame-compatible Grade 1 Titanium mug weighing just 68 g — ideal for boiling water on summit mornings.',
    specs: [
      { label: 'Weight', value: '68 g' },
      { label: 'Capacity', value: '450 mL' },
    ],
  },
  {
    sku: 'AHN-007',
    title: 'Trekking Pole Set — Carbon Fibre Twist-Lock',
    price: 3400,
    category: 'gear',
    badges: ['Ultralight'],
    weight: 440,
    waterproofRating: null,
    material: '100% 3K Carbon Fibre',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1000&q=80',
        label: 'Steep Descent Support',
      },
    ],
    sizes: ['One Size'],
    colors: [
      { label: 'Carbon Black', hex: '#2A2A2A' },
      { label: 'Carbon Grey', hex: '#5C5C5C' },
    ],
    stock: 15,
    description:
      'Engineered for steep descents on Mt. Halcon and loose scree on Mt. Tabayoc with 3K carbon shafts and sweat-wicking cork grips.',
    specs: [
      { label: 'Weight (pair)', value: '440 g' },
      { label: 'Packed Length', value: '38 cm' },
    ],
  },
  {
    sku: 'AHN-008',
    title: 'Waterproof Compression Dry Bag 20L',
    price: 890,
    category: 'gear',
    badges: ['Waterproof'],
    weight: 120,
    waterproofRating: null,
    material: '210D Ripstop TPU-laminated nylon',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1000&q=80',
        label: 'Camp Storage',
      },
    ],
    sizes: ['One Size'],
    colors: [
      { label: 'Signal Orange', hex: '#E05020' },
      { label: 'Cobalt Blue', hex: '#1E4A9A' },
    ],
    stock: 40,
    description:
      'Roll-top closure seals out river crossings and sudden downpours common on Mindanao trails.',
    specs: [
      { label: 'Weight', value: '120 g' },
      { label: 'Volume', value: '20 L' },
    ],
  },
  {
    sku: 'AHN-009',
    title: '2-Person Ultralight Backpacking Tent — 15D Silnylon',
    price: 9450,
    category: 'gear',
    badges: ['Waterproof', 'Ultralight'],
    weight: 1180,
    waterproofRating: 3000,
    material: '15D Ripstop Silnylon PU3000mm',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1000&q=80',
        label: 'Summit Pitch',
      },
    ],
    sizes: ['2 Person'],
    colors: [
      { label: 'Pine Green', hex: '#2E4C23' },
      { label: 'Sunrise Gold', hex: '#D49B28' },
    ],
    stock: 12,
    description:
      'Dual-vestibule, freestanding 3-season shelter engineered to resist heavy rainfall and high-elevation winds on Mt. Pulag and Mt. Apo.',
    specs: [
      { label: 'Weight', value: '1,180 g' },
      { label: 'Waterproof Rating', value: '3,000 mm' },
      { label: 'Capacity', value: '2 Person' },
    ],
  },
  {
    sku: 'AHN-010',
    title: 'Cordillera Quick-Dry Convertible Trail Pants',
    price: 2450,
    category: 'clothes',
    badges: ['Breathable', 'UV Protect'],
    weight: 295,
    waterproofRating: null,
    material: '4-Way Stretch DWR Nylon',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=1000&q=80',
        label: 'Trail Fit Front',
      },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { label: 'Earth Khaki', hex: '#8B7D6B' },
      { label: 'Granite Slate', hex: '#4A4E53' },
    ],
    stock: 24,
    description:
      'Converts from full-length pants to trail shorts in seconds via concealed leg zippers.',
    specs: [
      { label: 'Weight', value: '295 g' },
      { label: 'Sun Protection', value: 'UPF 50+' },
    ],
  },
  {
    sku: 'AHN-011',
    title: '800-Lumen Rechargeable LED Headlamp — IPX8',
    price: 1950,
    category: 'gear',
    badges: ['Waterproof', 'Ultralight'],
    weight: 78,
    waterproofRating: 10000,
    material: 'Anodized Aero Aluminum + Elastic Band',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=1000&q=80',
        label: 'Night Trek Beam',
      },
    ],
    sizes: ['One Size'],
    colors: [
      { label: 'Matte Black', hex: '#1C1C1C' },
      { label: 'Signal Orange', hex: '#D35400' },
    ],
    stock: 35,
    description:
      'Critical summit dawn-assault illumination with dual white flood/spot and red night-vision LEDs.',
    specs: [
      { label: 'Weight', value: '78 g' },
      { label: 'Max Output', value: '800 Lumens' },
    ],
  },
  {
    sku: 'AHN-012',
    title: '850FP Hydrophobic Down Summit Sleeping Bag (0°C)',
    price: 8850,
    category: 'gear',
    badges: ['Ultralight', 'Windproof'],
    weight: 680,
    waterproofRating: null,
    material: '10D Toray Ripstop Nylon + 850FP Down',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=1000&q=80',
        label: 'Bivy Camp Setup',
      },
    ],
    sizes: ['Regular', 'Long'],
    colors: [
      { label: 'Rust Clay', hex: '#B85435' },
      { label: 'Forest Green', hex: '#2E4C23' },
    ],
    stock: 14,
    description:
      'Sub-700g cold-campsite essential for Mt. Pulag summit freezes. 850FP treated goose down.',
    specs: [
      { label: 'Weight', value: '680 g' },
      { label: 'Comfort Temp', value: '0°C' },
    ],
  },
  {
    sku: 'AHN-013',
    title: 'Cushioned Merino Wool Trail Socks (2-Pack)',
    price: 780,
    category: 'clothes',
    badges: ['Merino', 'Breathable'],
    weight: 80,
    waterproofRating: null,
    material: '72% Australian Merino, 24% Nylon, 4% Lycra',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1582966772680-860e372bb558?auto=format&fit=crop&w=1000&q=80',
        label: 'Trail Pair View',
      },
    ],
    sizes: ['S', 'M', 'L'],
    colors: [
      { label: 'Heather Pine', hex: '#3B5336' },
      { label: 'Oatmeal Taupe', hex: '#A89F91' },
    ],
    stock: 50,
    description:
      'Seamless toe construction prevents hot spots and trail blisters during steep Cordillera descents.',
    specs: [
      { label: 'Weight', value: '80 g' },
      { label: 'Material', value: '72% Merino Wool' },
    ],
  },
  {
    sku: 'AHN-014',
    title: '2.5L Insulated Trail Hydration Reservoir',
    price: 1450,
    category: 'gear',
    badges: ['Ultralight'],
    weight: 145,
    waterproofRating: null,
    material: 'BPA-Free TPU + Thermal Neoprene Sleeve',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1517865288-978fcb780652?auto=format&fit=crop&w=1000&q=80',
        label: 'Reservoir Setup',
      },
    ],
    sizes: ['2.5 L'],
    colors: [{ label: 'Glacier Blue', hex: '#5DADE2' }],
    stock: 30,
    description:
      'Wide-mouth slide-seal opening for easy ice loading and stream refills.',
    specs: [
      { label: 'Weight', value: '145 g' },
      { label: 'Capacity', value: '2.5 Liters' },
    ],
  },
  {
    sku: 'AHN-015',
    title: 'Mt. Pulag Summit Badge Technical Trail Tee',
    price: 950,
    category: 'clothes',
    badges: ['Breathable', 'UV Protect'],
    weight: 135,
    waterproofRating: null,
    material: '100% Recycled Poly Micro-Waffle',
    images: [
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
      'Lightweight technical running and hiking shirt with moisture-wicking micro-waffle fabric and UPF 40+.',
    specs: [
      { label: 'Weight', value: '135 g' },
      { label: 'Sun Shield', value: 'UPF 40+' },
    ],
  },
  {
    sku: 'AHN-016',
    title: 'Titanium Ultralight Isobutane Backpacking Stove',
    price: 1650,
    category: 'gear',
    badges: ['Ultralight', 'Windproof'],
    weight: 48,
    waterproofRating: null,
    material: 'Grade TA1 Titanium Alloy + Brass Valve',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1000&q=80',
        label: 'Pocket Size Scale',
      },
    ],
    sizes: ['One Size'],
    colors: [{ label: 'Titanium Gray', hex: '#777A80' }],
    stock: 28,
    description:
      'Pocket-sized 48g titan stove engineered with a concave burner head to resist ridge winds.',
    specs: [
      { label: 'Weight', value: '48 g' },
      { label: 'Output', value: '2,700 Watts' },
    ],
  },
]

const seedProducts = async () => {
  try {
    await connectDB()
    await Product.deleteMany({})
    const inserted = await Product.insertMany(SEED_PRODUCTS)
    process.stdout.write(`Seeded ${inserted.length} Ahon Outdoors products.\n`)
    process.exit(0)
  } catch (error) {
    process.stderr.write(`Seed error: ${error.message}\n`)
    process.exit(1)
  }
}

seedProducts()

