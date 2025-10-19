# Stage 0 Backend

This is the backend service for the Stage 0 project, built with Node.js, Express, and TypeScript.

## API Documentation

You can find the full API specification and example requests in the Postman documentation (https://documenter.getpostman.com/view/19697355/2sB3QQJ7Qt)

## Features

- User profile endpoint (`/me`) that returns user data and a random cat fact.
- Fetches cat facts from the [catfact.ninja](https://catfact.ninja/) public API.

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:

```sh
 git clone <your-repo-url>
 cd backend/stage-0
```

Install dependencies:

```sh
 npm install

 # or

 yarn install
```

Running Locally
Start the development server:

```sh
npm run dev
# or
yarn dev
```

The server will start on the default port (usually 3000). You can access the user profile endpoint at `http://localhost:3000/me`.

### Environment Variables

No environment variables are required for the basic functionality. If you add features that require configuration (e.g., database, authentication), document them here.

### Dependencies

- **express**: Web framework for Node.js
- **axios**: HTTP client for making API requests
- **typescript**: TypeScript support
- **nodemon** (dev): Auto-reloads server during development

Install all dependencies with `npm install` or `yarn install`.

Project Structure

- `src/features/user/controllers/user.ts`: User-related route controllers
- `src/features/user/services/catFact.ts`: Service for fetching cat facts
- `src/features/user/models/user.ts`: User data model (stub or implementation)
- `src/utils/`: Utility modules (logger, ApiError, etc.)
