# FormFlow - Dynamic Multi-Step Form

A premium, highly accessible, and responsive multi-step form application built with React, Vite, and Tailwind CSS. This project demonstrates advanced state management, complex validation patterns, and seamless client-side routing.

## 🚀 Features

- **Multi-Step Navigation**: Smooth programmatic flow through 3 distinct steps.
- **Advanced State Management**: Centralized form state using React Context API.
- **Robust Validation**: Synchronous and asynchronous validation using React Hook Form and Zod.
- **Conditional Formatting**: Dynamic field rendering based on user choice (Employment Status).
- **A11y (Accessibility)**: WCAG 2.1 AA compliant, featuring semantic HTML, ARIA labels, and full keyboard navigability.
- **Responsive Design**: Optimized for all screen sizes, from mobile to ultra-wide desktops.
- **Containerized**: Fully Dockerized setup for frontend and mock API.

## 🛠️ Technical Stack

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **Testing**: Vitest
- **Icons**: Lucide React
- **API Simulation**: json-server & Axios

## 📦 Getting Started

### Local Development

1. **Clone the repository** (or download the files).
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run the mock API**:
   ```bash
   npx json-server --watch db.json --port 3001
   ```
4. **Start the development server**:
   ```bash
   npm run dev
   ```

### Running with Docker (Recommended)

Run the entire application (Frontend + Mock API) with a single command:

```bash
docker-compose up --build
```

### Mock API Endpoints

When running locally without Docker, the following endpoints are available:
- **POST** `http://localhost:3001/submissions`: Submit form data.
- **GET** `http://localhost:3001/availability`: Check email availability.

*Note: If you use the `--routes routes.json` flag, these are also aliased to `/api/submit-form` and `/api/check-email-availability`.*

## 🧪 Testing

Run unit tests for core validation and state logic:

```bash
npm test
```

## 📐 Architectural Decisions

- **React Context**: Used for state management to avoid prop-drilling while maintaining a clean, centralized data store.
- **Zod + Resolvers**: Enforces strict schema validation for both synchronous and complex asynchronous checks (e.g., email availability).
- **Programmatic Routing**: Ensures that users cannot skip steps via direct URL manipulation, maintaining data integrity.
- **Accessible UI Library**: Built custom, reusable components to ensure maximum control over ARIA properties and focus management.

## 📱 Screenshots

*Coming Soon - Please run the application to see the stunning glassmorphism-inspired design.*

## 🎥 Video Demo

*Please check the repository for a demo video link showing the full flow.*

---
Built by Antigravity.
