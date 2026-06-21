# NOVA - Cyber-Luxury Fashion E-Commerce

NOVA is a premium, cutting-edge fashion e-commerce platform built to demonstrate advanced front-end architecture, immersive design, and highly polished user experiences.

## 🚀 Architecture & Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS + custom glassmorphism & neon aesthetics
- **Animations:** Framer Motion (page transitions, micro-interactions, layout animations)
- **State Management:** Zustand (Cart, Wishlist, Auth)
- **Icons:** Lucide React
- **Toasts:** Sonner (Dark mode optimized)

## ⚠️ Note for Recruiters & Reviewers (Mock Data)

This application is built as a **frontend showcase**. To ensure rapid load times and easy local testing without external dependencies, **all product data, user sessions, and cart operations run entirely on Mock Data / LocalStorage via Zustand.**

While the data is static, the architecture is fully production-ready:
- The data is cleanly isolated in `src/lib/mock-data.ts`.
- State management (`src/store/`) is separated from UI components.
- Replacing the mock hooks with actual API calls (e.g., Supabase, Stripe, Shopify) would require zero changes to the UI layer.

## 🌟 Key Features

- **Premium UI/UX:** Skeletons, loading states, and custom empty states throughout the app.
- **Dynamic Search:** Fully functional search modal filtering through mock products in real-time.
- **Advanced Filtering:** Collections page features desktop sidebars and mobile sliding drawers for filtering by Category, Gender, and Color.
- **Micro-interactions:** Extensive use of Framer Motion for hover states, cart drawer sliding, and mobile menu staggering.
- **Edge Optimized:** Next.js `<Image />` component used heavily for performant LCP.

## 🛠️ Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to experience NOVA.
