# High-Performance Virtualized Data Table

This is a robust, accessible, and high-performance virtualized data table built with React, Vite, TypeScript, TanStack Query, and TanStack Virtual.

## Features
- **Virtualization**: Extremely fast rendering for large datasets (tested with 10k+ rows) using `@tanstack/react-virtual`.
- **Data Fetching & Caching**: Utilizes `@tanstack/react-query` to manage client-side state, caching, and optimistic updates.
- **Server-Side Operations**: Fully implements server-side pagination, sorting, and debounced searching via `json-server`.
- **Accessibility (A11y)**: Keyboard navigable, with complete ARIA attributes adhering to WCAG 2.1 AA defaults.
- **Responsive**: Fully responsive and mobile-friendly UI layout using `Tailwind CSS`.
- **Testing**: Highly tested with Vitest, React Testing Library, and Cypress.

## Setup Instructions

### 1. Local Development
Make sure you have Node (v18+) and npm installed.

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the mock API server:
   ```bash
   npm run mock
   ```

3. In a new terminal, start the Vite development server:
   ```bash
   npm run dev
   ```

Open `http://localhost:5173` in your browser.

### 2. Docker Setup
You can run both the frontend and the backend using Docker Compose.

1. Build and run the containers:
   ```bash
   docker-compose up --build
   ```

2. Access the application:
   - Frontend: `http://localhost:3000`
   - Mock API: `http://localhost:3001`

*(To stop the containers, use `docker-compose down`)*

## Running Tests

### Unit and Integration Tests (Vitest + React Testing Library)
```bash
npm run test
```

### End-to-End Tests (Cypress)
1. Ensure the app and mock server are running (`npm run dev` and `npm run mock`).
2. Run Cypress in headless mode:
   ```bash
   npm run cypress:run
   ```
   Or open the Cypress UI:
   ```bash
   npx cypress open
   ```

## Architecture Notes
- **Component-Driven**: Broken down into `DataTable`, `TableHeader`, `TableRow`, `Pagination`, and `SearchInput` for cleaner logical boundaries.
- **Data Hook (`useDataFetch`)**: A custom hook powered by React Query, abstracting all pagination logic away from component states and handling caching dynamically.
- **Virtualization**: Implemented `useVirtualizer` with estimated sizes to maintain 60fps scrolling performance seamlessly on millions of records.
- **Debounced Search**: A dedicated `useDebounce` hook resolves rapid typing to prevent API spamming while guaranteeing responsive feedback.
