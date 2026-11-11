# Ahon Outdoors - E-Commerce Implementation Plan

## Project Overview
A full-stack MERN (MongoDB, Express.js, React, Node.js) e-commerce platform specializing in hiking gears and outdoor apparel optimized for the Philippine market (e.g., tropical trekking, Mt. Pulag cold-weather gear).

## Architecture & Stack
*   **Frontend:** React (Vite) + Tailwind CSS + Zustand (State Management)
*   **Backend:** Node.js + Express.js
*   **Database:** MongoDB + Mongoose
*   **Authentication:** JWT (JSON Web Tokens) + HTTP-only cookies
*   **Payment Gateway:** Mock integration (prepare for GCash/PayMaya via PayMongo later)

## Phase 1: Environment & Setup
- [ ] Initialize frontend (`client`) and backend (`server`) directories.
- [ ] Set up ESLint and Prettier for strict code formatting.
- [ ] Configure MongoDB connection and environment variables.
- [ ] Set up a unified Express server structure with `routes`, `controllers`, and `models`.

## Phase 2: Database & Backend (Data Models)
- [ ] **User Model:** Name, Email, Password (hashed), Role (Admin/Customer), Shipping Address.
- [ ] **Product Model (Hiking Gear & Clothes):**
  - Standard fields: Title, Description, Price (PHP), SKU, Stock, Images.
  - Hiking-specific technical fields: Weight (grams), Waterproof Rating, Material.
  - Variant fields (Clothes): Size (XS-XXL), Color.
- [ ] **Order Model:** User reference, Product list, Total amount, Payment status, Delivery status (e.g., Metro Manila vs. Provincial shipping).
- [ ] Build RESTful API endpoints (CRUD for products, user auth, cart management).

## Phase 3: Frontend Foundation & UI
- [ ] Setup Tailwind CSS with an "Outdoors" design token set (Forest greens, earth browns, slate grays).
- [ ] Build reusable UI components: Buttons, Modals, Product Cards, Nav Bar.
- [ ] Implement responsive layout (Mobile-first for on-the-go browsing).
- [ ] Integrate React Router for navigation (`/`, `/shop`, `/product/:id`, `/cart`, `/checkout`).

## Phase 4: Core E-Commerce Features
- [ ] **Product Catalog:** Grid view with robust filtering (Filter by: Gear vs. Clothes, Price, Weight, Activity type).
- [ ] **Product Detail Page:** Image gallery (support for 360-views or detailed fabric zooms), variant selector, technical specs table, "Add to Cart".
- [ ] **Shopping Cart:** Slide-out drawer or dedicated page, persistent local storage state.
- [ ] **Checkout Flow:** Guest checkout, address input, shipping calculation, order summary.

## Phase 5: Polish & Security
- [ ] Implement robust error handling on all API routes.
- [ ] Add loading states and skeleton loaders for all data fetching.
- [ ] Finalize responsive design testing.