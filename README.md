# Vendora - Frontend

A modern, responsive React-based frontend for the Vendora Multi-Vendor E-Commerce Platform.

## Stack
- **Framework:** React 18+ (Vite)
- **Styling:** Tailwind CSS 4.x
- **Icons:** Lucide React
- **Routing:** React Router Dom v7
- **API Client:** Axios

## Features
- **Dynamic Landing Page** with Hero, Featured Products, and CTA sections.
- **Role-Based Navigation:** Custom flows for Customers, Vendors, and Admins.
- **Product Browsing:** Advanced filtering, search, and category-based navigation.
- **Shopping Cart:** Persistent cart state for customers.
- **Authentication:** Integrated registration and login flows.
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop.

## Getting Started

### Prerequisites
- Node.js 20+
- Backend server running (see Backend README)

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Configuration
Create a `.env` file in the root directory and add:
```env
VITE_API_URL=http://localhost:5000/api
```

### Development
Run the development server:
```bash
npm run dev
```
The app will be available at `http://localhost:5173`.

## Deployment
Recommended: **Vercel**
1. Connect your repo to Vercel.
2. Set the root directory to `V_Frontend` (if applicable).
3. Add environment variables.
4. Deploy!

---
**Author:** Abdullah Salman — February 2026