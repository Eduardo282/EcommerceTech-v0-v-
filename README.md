# EvoHance - Professional Ecommerce Platform

EvoHance is a cutting-edge, full-stack ecommerce solution designed with a sophisticated "Glassmorphism" aesthetic. It features a unique dual-market system that caters to both **Technology** and **Gaming** sectors, providing a tailored experience for buyers and sellers alike.

![EvoHance Preview](https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2070)

## 🚀 Key Features

### 🛍️ Dual Market System (Rubros)

- **Technology Sector:** Dashboards, templates, plugins, and courses.
- **Gaming Sector:** Game keys, assets, soundtracks, and tools.
- **Smart Context:** The application adapts its content based on the selected sector.
- **Auto-Locking:**
  - Guests and Customers default to Technology.
  - Sellers are locked to their chosen sector to ensure store consistency.

### 👤 User Roles & Authentication

- **Secure Auth:** JWT-based Login and Registration.
- **Guest:** Browse catalogs with restricted features.
- **Customer:** Manage Cart, Wishlist, and Profile.
- **Seller:** Dedicated onboarding flow to create a store, manage inventory (backend ready), and profile.

### 🎨 Modern UI/UX

- **Design System:** Custom "Gold & Onyx" theme with glassmorphism effects.
- **Tech Stack:** Built with **Tailwind CSS v4** and **Radix UI** primitives.
- **Responsive:** Fully adaptive layout for all device sizes.
- **Interactive:** Smooth transitions, 3D card effects, and neon accents.

## 🛠️ Tech Stack

### Frontend

- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS v4, CSS Modules
- **State Management:** Apollo Client (GraphQL), React Context (RubroContext)
- **UI Components:** Radix UI, Lucide React, Sonner (Toasts)

### Backend

- **Runtime:** Node.js + Express
- **API:** Apollo Server (GraphQL)
- **Database:** MongoDB + Mongoose ODM
- **Auth:** JSON Web Tokens (JWT), bcryptjs

## 📂 Project Structure

```
├── src/                  # Frontend Source
│   ├── components/       # React Components (UI, Layout, Features)
│   ├── context/          # Global State (RubroContext)
│   ├── graphql/          # Queries & Mutations
│   ├── styles/           # Global CSS & Tailwind Config
│   └── App.jsx           # Main Application Entry
├── server/               # Backend Source
│   ├── src/
│   │   ├── graphql/      # TypeDefs & Resolvers
│   │   ├── models/       # Mongoose Schemas (User, Product, Order)
│   │   └── scripts/      # Database Seeders
│   └── package.json
└── package.json          # Frontend Dependencies
```

## ⚡ Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB (Local instance or Atlas URI)

### 1. Backend Setup

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

Create a `.env` file in `server/` with your configuration:

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/ecommerce-db
JWT_SECRET=your_super_secret_key_123
```

Seed the database with initial products:

```bash
# Seed Technology products
npm run seed

# Seed Gaming products
npm run seed:gaming
```

Start the backend server:

```bash
npm run dev
```

_Server runs on http://localhost:4000_

### 2. Frontend Setup

Return to the root directory and install frontend dependencies:

```bash
cd ..
npm install
```

Start the development server:

```bash
npm run dev
```

_Frontend runs on http://localhost:5173_

## 📖 Usage Guide

1.  **Browsing:** Use the **Rubro Selector** (top right) to switch between Technology and Gaming products (Guest mode).
2.  **Registration:** Click "Login" -> "Sign up".
    - Check _"I want to sell products"_ to trigger the Seller Onboarding flow.
3.  **Seller Onboarding:**
    - Select your niche (Technology or Gaming).
    - Set your Store Name and Description.
    - _Note: Once set, your account is locked to this sector._
4.  **Shopping:** Add items to your Cart or Wishlist.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
