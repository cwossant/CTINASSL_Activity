# 🏔️ Ahon Outdoors — Philippine Hiking Gear & Apparel

A modern full-stack MERN e-commerce application designed for outdoor enthusiasts, hikers, and trekkers in the Philippines. Tailored with technical specs for tropical downpours and cold-weather summit gear (such as Mt. Pulag, Mt. Apo, and Kitanglad), featuring persistent cart management, multi-step checkout, and RESTful API endpoints.

---

## 📑 Table of Contents
1. [Architecture & Stack](#-architecture--stack)
2. [Project Structure](#-project-structure)
3. [Quick Start Guide](#-quick-start-guide)
4. [Fixing PowerShell Script Execution (Windows)](#-fixing-powershell-script-execution-windows)
5. [How the App Works](#-how-the-app-works)
6. [How to Change Things (Customization Guide)](#-how-to-change-things-customization-guide)
7. [Database Setup & Seeding](#-database-setup--seeding)
8. [Backend API Reference](#-backend-api-reference)
9. [Troubleshooting & Common Errors](#-troubleshooting--common-errors)

---

## 🛠️ Architecture & Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite 8, Tailwind CSS v4, Framer Motion, Zustand, React Router v7 |
| **Backend** | Node.js, Express.js 5, Mongoose 9 / MongoDB, JWT (JSON Web Tokens), Cookie-Parser |
| **Design System** | Mountain Earth Palette (Forest Green, Ochre Orange, Warm Sand Stone), responsive mobile-first UI |

---

## 📁 Project Structure

```text
CTINASSL_Activity/
├── dev.bat                      # 1-Click Windows developer launcher
├── package.json                 # Root script runner (start client/server from root)
├── README.md                    # Complete project guide and documentation
│
├── client/                      # ─── FRONTEND (React + Vite) ───
│   ├── index.html               # Main HTML entry with Google fonts
│   ├── package.json             # Frontend dependencies & scripts
│   ├── vite.config.js           # Vite configuration with API proxy (/api -> :5000)
│   └── src/
│       ├── App.jsx              # Main router (/ , /shop , /product/:id , /cart , /checkout)
│       ├── index.css            # Tailwind CSS v4 design tokens (--color-primary, fonts)
│       ├── components/
│       │   ├── Navbar.jsx       # Sticky glassmorphic navbar with badge counters & mobile menu
│       │   ├── Footer.jsx       # Mountain-themed footer with trail links & credits
│       │   ├── Layout.jsx       # Shell with route transitions and scroll-to-top
│       │   ├── ProductCard.jsx  # Interactive card with quick-add, badges, and weight tag
│       │   ├── ProductMedia.jsx # Resilient image component with offline SVG fallback
│       │   ├── CartDrawer.jsx   # Slide-out quick cart drawer
│       │   └── CustomSelect.jsx # Custom accessible styled dropdown
│       ├── data/
│       │   └── products.js      # Single source of truth for mock product catalog & specs
│       ├── pages/
│       │   ├── HomePage.jsx     # Hero section, trail-tested categories, featured products
│       │   ├── ShopPage.jsx     # Catalog with multi-filter (category, price, weight, badges, sort)
│       │   ├── ProductDetailPage.jsx # Multi-angle gallery, color/size selection, specs table
│       │   ├── CartPage.jsx     # Dedicated full cart review with quantity toggles
│       │   ├── CheckoutPage.jsx # 3-Step stepper: Address -> Shipping -> Payment -> Success
│       │   └── NotFoundPage.jsx # 404 trail marker page
│       ├── store/
│       │   └── cartStore.js     # Zustand state with localStorage persistence (`ahon-cart`)
│       └── utils/
│           └── format.js        # Currency formatter (₱ PHP) and badge style maps
│
└── server/                      # ─── BACKEND (Express + MongoDB) ───
    ├── .env                     # Environment variables (PORT, MONGO_URI, JWT_SECRET)
    ├── .env.example             # Example environment template
    ├── package.json             # Backend dependencies (express, mongoose, dotenv, nodemon)
    ├── server.js                # Express app entry & server initialization
    ├── config/
    │   ├── db.js                # Mongoose connection guard & retry logging
    │   └── seedProducts.js      # Seed script to populate sample products to MongoDB
    ├── controllers/
    │   ├── authController.js    # Register, login, logout, getMe with secure cookies
    │   ├── productController.js # CRUD endpoints for catalog items
    │   └── orderController.js   # Order creation, order tracking, admin status updates
    ├── middleware/
    │   ├── asyncHandler.js      # Wraps async routes to eliminate try/catch boilerplate
    │   ├── authMiddleware.js    # Protect & adminOnly JWT verification
    │   └── errorMiddleware.js   # Centralized JSON error handler
    ├── models/
    │   ├── User.js              # User schema with bcrypt password hashing
    │   ├── Product.js           # Mongoose schema with technical outdoor specs
    │   └── Order.js             # Order schema with shipping and payment status
    └── routes/
        ├── authRoutes.js        # /api/auth
        ├── productRoutes.js     # /api/products
        └── orderRoutes.js       # /api/orders
```

---

## 🚀 Quick Start Guide

### Option 1: Using the 1-Click Launcher (Windows)
Double-click `dev.bat` in the root folder, or in PowerShell/CMD run:
```bat
.\dev.bat
```
Select `[3]` to launch both Client and Server in separate windows automatically.

---

### Option 2: Running via Terminals (Standard MERN workflow)

Open two terminal tabs:

#### Terminal 1 — Backend Server
```powershell
cd server
npm run dev
```
*The server starts on `http://localhost:5000` with `nodemon` (auto-reloads on file changes).*

#### Terminal 2 — Frontend Client
```powershell
cd client
npm run dev
```
*The Vite development server starts instantly at `http://localhost:5173`.*

---

## ⚡ Fixing PowerShell Script Execution (Windows)

If you see this error when running `npm`:
> `npm : File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled on this system.`

This is Windows PowerShell's default security policy blocking `.ps1` files. Fix it in seconds:

1. Open PowerShell and run:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
2. Type `Y` and press **Enter** when asked for confirmation.
3. Now `npm run dev` will run normally in any PowerShell session.

*Alternatively, you can run `npm.cmd run dev` or use `cmd.exe` directly.*

---

## 🧠 How the App Works

### 1. State Management (Cart & Persistence)
- Located at [client/src/store/cartStore.js](file:///client/src/store/cartStore.js).
- Built with **Zustand** using the `persist` middleware.
- Cart items survive page refreshes and browser restarts by persisting to `localStorage` under the key `'ahon-cart'`.
- Unique item keying: items differentiate by `${product.id}__${size}__${color}`, ensuring different sizes or colors are stored as distinct line items.

### 2. Multi-step Checkout
- Located at [client/src/pages/CheckoutPage.jsx](file:///client/src/pages/CheckoutPage.jsx).
- **Step 1 (Delivery Address):** Validates customer contact, phone, province, city, and barangay.
- **Step 2 (Shipping Method):** Computes rates for Metro Manila Standard (₱150), Metro Manila Express (₱290), Provincial Door-to-Door (₱250), or Cash on Delivery (₱200).
- **Step 3 (Payment):** Select Cash on Delivery (COD) or mock digital payments (GCash / Maya).
- Placing the order automatically clears the cart and triggers a celebration screen.

### 3. Responsive Design & Visuals
- Styled entirely with **Tailwind CSS v4** design tokens in [client/src/index.css](file:///client/src/index.css).
- Mobile-first drawer navigation and quick-cart drawer ([client/src/components/CartDrawer.jsx](file:///client/src/components/CartDrawer.jsx)).
- Route transitions handled smoothly by **Framer Motion** wrapped in [client/src/components/Layout.jsx](file:///client/src/components/Layout.jsx).

---

## 🎨 How to Change Things (Customization Guide)

### 1. How to Add or Edit Products
To modify the product catalog, update [client/src/data/products.js](file:///client/src/data/products.js):
```javascript
{
  id: 'prod-007',
  title: 'Ultralight Titanium Camp Stove',
  price: 1850,                       // Price in Philippine Peso (PHP)
  category: 'gear',                  // 'gear' or 'clothes'
  badges: ['Ultralight', 'Compact'], // Badge tags displayed on the card
  weight: 48,                        // Weight in grams
  waterproofRating: null,            // mm rating (or null for non-waterproof items)
  material: 'Titanium TA1',
  imageSrc: 'https://images.unsplash.com/...',
  gallery: [ /* multi-angle images */ ],
  sizes: null,                       // ['XS', 'S', 'M', 'L'] for clothes, null for gear
  colors: [{ label: 'Titanium Gray', hex: '#8E9297' }],
  stock: 25,
  description: 'Sub-50g stove capable of boiling 500ml water in 2 minutes...',
  specs: [
    { label: 'Weight', value: '48 g' },
    { label: 'Boil Time', value: '2 min 40 sec' },
  ],
}
```

### 2. How to Change Colors & Theme
Open [client/src/index.css](file:///client/src/index.css#L4-L24) and update the `@theme` variables:
```css
@theme {
  --color-primary:          #2D5A27;  /* Deep Pine Green */
  --color-accent:           #C8702A;  /* Sierra Clay / Terracotta */
  --color-background:       #F5F2ED;  /* Sandstone background */
  --color-surface:          #FFFFFF;  /* Card surface */
  --font-display: 'Montserrat', system-ui, sans-serif;
  --font-body:    'Inter', system-ui, sans-serif;
}
```

### 3. How to Adjust Shipping Rates & Couriers
Open [client/src/pages/CheckoutPage.jsx](file:///client/src/pages/CheckoutPage.jsx#L11-L40):
- Modify `DELIVERY_OPTIONS` to adjust delivery costs, labels, estimated days, or courier partners (LBC, J&T, standard courier).

### 4. How to Change Server Port & Database Settings
Edit [server/.env](file:///server/.env):
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/ahon_outdoors
JWT_SECRET=your_custom_secret_key_here
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
```

---

## 🗄️ Database Setup & Seeding

1. **Local MongoDB:** Ensure MongoDB is running on port `27017`:
   - Run `net start MongoDB` in an administrative terminal, or launch the MongoDB service via `services.msc`.
2. **Cloud MongoDB Atlas (Alternative):**
   - Create a free cluster on [cloud.mongodb.com](https://cloud.mongodb.com).
   - In [server/.env](file:///server/.env), set:
     ```env
     MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/ahon_outdoors?retryWrites=true&w=majority
     ```
3. **Seed Database:**
   Populate initial hiking products into your MongoDB database:
   ```powershell
   cd server
   npm run seed
   ```

---

## 📡 Backend API Reference

All backend responses conform to the unified JSON schema:
`{ "success": boolean, "data": any, "message": string }`

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Healthcheck endpoint | No |
| `POST` | `/api/auth/register` | Register new customer account | No |
| `POST` | `/api/auth/login` | Log in and receive HTTP-only JWT cookie | No |
| `POST` | `/api/auth/logout` | Clear auth cookie | Yes |
| `GET` | `/api/auth/me` | Fetch currently authenticated user | Yes |
| `GET` | `/api/products` | Fetch all products (supports category & search query) | No |
| `GET` | `/api/products/:id` | Fetch single product by ID | No |
| `POST` | `/api/products` | Create product | Admin only |
| `PUT` | `/api/products/:id` | Update product | Admin only |
| `DELETE` | `/api/products/:id` | Delete product | Admin only |
| `POST` | `/api/orders` | Create an order (guest or authenticated) | Optional |
| `GET` | `/api/orders/mine` | View authenticated user's orders | Yes |
| `GET` | `/api/orders/:id` | View order details | Yes / Guest owner |
| `PATCH` | `/api/orders/:id/status`| Update order status | Admin only |

---

## ❓ Troubleshooting & Common Errors

#### 1. `MongoDB connection error: connect ECONNREFUSED 127.0.0.1:27017`
- **Cause:** MongoDB service is stopped or not installed locally.
- **Fix:** Start MongoDB via `net start MongoDB` or paste your free MongoDB Atlas connection string into `server/.env` under `MONGO_URI`.

#### 2. `The uri parameter to openUri() must be a string, got undefined`
- **Cause:** `MONGO_URI` environment variable is not loaded prior to Mongoose initialization.
- **Fix:** Fixed in `server/server.js` by invoking `require('dotenv').config()` at the very top of the entry file, backed by a root fallback.

#### 3. `npm : File ... npm.ps1 cannot be loaded because running scripts is disabled`
- **Cause:** Windows PowerShell execution policy restriction.
- **Fix:** Run `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser` in PowerShell or run `npm.cmd run dev`.

---

*Made with ⛰️ for Philippine outdoor adventures.*
