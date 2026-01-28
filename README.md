# E-Commerce Application

A modern, full-featured e-commerce application built with React, TypeScript, Vite, TanStack Router, TanStack Query, and Tailwind CSS. This application integrates with the DummyJSON API to provide a complete shopping experience with product browsing, search, cart management, and more.

##  Features

- **Product Catalog**: Browse through a wide range of products with pagination
- **Product Search**: Search for products by name or description
- **Product Details**: View detailed information about each product including images, ratings, and specifications
- **Shopping Cart**: Add products to cart, manage quantities, and view order summary
- **Responsive Design**: Fully responsive UI that works on all device sizes
- **Modern UI**: Beautiful and intuitive interface built with Tailwind CSS
- **User Feedback**: Toast notifications for cart actions, checkout, and errors
- **Type Safety**: Full TypeScript support for better development experience
- **Fast Performance**: Optimized with Vite and TanStack Query for efficient data fetching

##  Tech Stack

- **React 19**: Modern React with latest features
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and development server
- **TanStack Router**: Type-safe routing with file-based routing
- **TanStack Query**: Powerful data synchronization for React
- **Tailwind CSS**: Utility-first CSS framework
- **DummyJSON API**: Free REST API for e-commerce data
- **React Toastify**: Toast notifications for user feedback

##  Project Structure

```
E-Commerce-/
├── public/                 # Static assets
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Header.tsx        # Navigation header with cart badge
│   │   ├── ProductCard.tsx   # Product card component with toast feedback
│   │   ├── LoadingSpinner.tsx# Loading indicator
│   │   └── ErrorMessage.tsx  # Error display component
│   ├── context/              # React Context providers
│   │   ├── cartContext.ts    # Cart context definition
│   │   └── CartProvider.tsx  # Cart state provider with toast helpers
│   ├── hooks/                # Custom hooks
│   │   └── useCart.ts        # Cart hook exposing cart actions/state
│   ├── pages/                # Page components
│   │   ├── HomePage.tsx      # Product listing page
│   │   ├── ProductDetailPage.tsx # Product detail view
│   │   ├── CartPage.tsx      # Shopping cart page
│   │   └── RegisterPage.tsx  # User registration flow
│   ├── routes/               # TanStack Router route definitions
│   │   ├── __root.tsx        # Root route with layout
│   │   ├── index.tsx         # Home route
│   │   ├── products.$productId.tsx # Product detail route
│   │   ├── cart.tsx          # Cart route
│   │   └── register.tsx      # Registration route
│   ├── services/             # API services
│   │   └── api.ts            # DummyJSON API integration
│   ├── types/                # TypeScript type definitions
│   │   └── index.ts          # Shared types and interfaces
│   ├── App.tsx               # (Legacy, can be removed)
│   ├── main.tsx              # Application entry point
│   └── index.css             # Global styles with Tailwind
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

##  Functionality

### Product Listing (`/`)
- Displays products in a responsive grid layout
- Pagination support (30 products per page)
- Search functionality to filter products
- Product cards with thumbnail, title, price, rating, and "Add to Cart" button
- Loading states and error handling

### Product Details (`/products/:productId`)
- Full product information display
- Product image gallery
- Price with discount information
- Star rating display
- Stock availability
- Add to cart functionality with quantity management
- Breadcrumb navigation

### Shopping Cart (`/cart`)
- View all items in cart
- Update item quantities
- Remove items from cart
- Order summary with subtotal and total
- Empty cart state
- Clear cart functionality
- Continue shopping link

### Cart Context
- Global cart state management using React Context
- Persistent cart during session
- Total items count
- Total price calculation
- Add, remove, and update cart items

##  Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

### Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd E-Commerce-Project
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173` (or the port shown in the terminal)

### Build for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

##  Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

##  API Integration

This application uses the [DummyJSON API](https://dummyjson.com/) which provides:

- **Products Endpoint**: `https://dummyjson.com/products`
- **Product by ID**: `https://dummyjson.com/products/{id}`
- **Search Products**: `https://dummyjson.com/products/search?q={query}`
- **Products by Category**: `https://dummyjson.com/products/category/{category}`

The API service is implemented in `src/services/api.ts` and uses TanStack Query for efficient data fetching, caching, and state management.

##  Styling

The application uses Tailwind CSS for styling. The configuration is in `tailwind.config.js`. All components are styled using Tailwind utility classes for a consistent and maintainable design system.

##  Type Safety

The project is fully typed with TypeScript:
- Product types and interfaces in `src/types/index.ts`
- Type-safe routing with TanStack Router
- Type-safe API calls and responses