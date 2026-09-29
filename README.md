# DineIQ Frontend

Frontend application for **DineIQ**, built with React and Vite.

## Tech Stack

- React 18
- Vite
- React Router
- Recharts
- CSS

## Setup

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd dine-iq-frontend
npm install
```

Create a `.env` file in the project root.

### Environment Variables

Example `.env`:

```env
VITE_API_URL=/api
VITE_PROXY_TARGET=http://localhost:8000
VITE_USE_MOCK=false
VITE_CURRENCY="PKR "
```

### Run Development Server

```bash
npm run dev
```

The application will run at:

```text
http://localhost:5173
```

### Build

Create a production build:

```bash
npm run build
```

The generated files will be available inside the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
```

## Project Structure

```text
dine-iq-frontend/
├── src/
│   ├── api/
│   │   ├── client.js
│   │   └── mock.js
│   │
│   ├── assets/
│   │   └── favicon.svg
│   │
│   ├── components/
│   │   ├── ErrorBoundary.jsx
│   │   ├── FilterBar.jsx
│   │   ├── Layout.jsx
│   │   ├── Logo.jsx
│   │   ├── MoreArt.jsx
│   │   ├── PageArt.jsx
│   │   ├── PageExport.jsx
│   │   ├── StateArt.jsx
│   │   ├── Visuals.jsx
│   │   ├── icons.jsx
│   │   └── ui.jsx
│   │
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── FiltersContext.jsx
│   │
│   ├── pages/
│   │   ├── Admin.jsx
│   │   ├── Basket.jsx
│   │   ├── ChangePassword.jsx
│   │   ├── Customers.jsx
│   │   ├── DualPipeline.jsx
│   │   ├── Executive.jsx
│   │   ├── Forecast.jsx
│   │   ├── Jobs.jsx
│   │   ├── Locations.jsx
│   │   ├── Login.jsx
│   │   ├── Menu.jsx
│   │   ├── Peak.jsx
│   │   ├── Pricing.jsx
│   │   ├── Promotions.jsx
│   │   ├── Ratings.jsx
│   │   ├── Recommendations.jsx
│   │   ├── Reports.jsx
│   │   ├── Wastage.jsx
│   │   └── WhatIf.jsx
│   │
│   ├── App.jsx
│   ├── filterConfig.js
│   ├── hooks.js
│   ├── main.jsx
│   ├── nav.js
│   └── styles.css
│
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## Main Files

`src/App.jsx` handles the main application routing and structure.

`src/api/client.js` contains the API client used for requests.

`src/context/AuthContext.jsx` manages authentication state.

`src/context/FiltersContext.jsx` manages shared dashboard filters.

`src/nav.js` contains navigation and page configuration.

`src/pages/` contains the application's main pages and dashboards.

`src/components/` contains reusable UI and layout components.

`src/styles.css` contains the application's styling.