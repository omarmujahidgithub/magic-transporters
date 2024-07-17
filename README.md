```markdown
# Magic Transporters API

Magic Transporters API is an Express.js-based REST API that manages Magic Movers and Magic Items. Magic Movers use nifty gadgets to move important things, and this API allows you to add, load, and manage their missions.

## Features

- Add a new Magic Mover
- Add a new Magic Item
- Load a Magic Mover with items
- Start a mission
- End a mission
- List top Magic Movers by missions completed
- Detailed API documentation using Swagger

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- TypeScript
- Jest (for testing)
- Supertest (for E2E testing)
- Docker
- Swagger (for API documentation)

## Prerequisites

- Node.js and npm
- Docker and Docker Compose

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/magic-transporters.git
cd magic-transporters
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root of your project and add the following environment variable:

```env
MONGO_URI=mongodb://localhost:27017/magicTransporters
```

### 4. Running the application

#### Locally

```bash
npm start
```

#### With Docker

```bash
docker-compose up --build
```

### 5. Running tests

To run the E2E tests, use:

```bash
npm test
```

## API Endpoints

### Magic Movers

- **POST /api/magic-movers**
  - Add a new Magic Mover

- **POST /api/magic-movers/load**
  - Load a Magic Mover with items

- **POST /api/magic-movers/start-loading**
  - Transition a Magic Mover to the loading state

- **POST /api/magic-movers/start-mission**
  - Start a mission for a Magic Mover

- **POST /api/magic-movers/end-mission**
  - End a mission for a Magic Mover

- **GET /api/magic-movers/top-movers**
  - List Magic Movers who completed the most missions

### Magic Items

- **POST /api/magic-items**
  - Add a new Magic Item

## API Documentation

The API documentation is available via Swagger.

- For Magic Movers: `http://localhost:3000/api-docs/magic-movers`
- For Magic Items: `http://localhost:3000/api-docs/magic-items`

## Project Structure

```bash
.
├── src
│   ├── config
│   │   └── mongoose.ts
│   ├── controllers
│   │   ├── magicMoverController.ts
│   │   └── magicItemController.ts
│   ├── middleware
│   │   └── errorHandler.ts
│   ├── models
│   │   ├── Log.ts
│   │   ├── MagicItem.ts
│   │   └── MagicMover.ts
│   ├── routes
│   │   ├── magicMoverRoutes.ts
│   │   └── magicItemRoutes.ts
│   ├── swagger
│   │   ├── magicMover.yml
│   │   └── magicItem.yml
│   └── app.ts
├── tests
│   ├── magicMover.test.ts
│   └── magicItem.test.ts
├── Dockerfile
├── docker-compose.yml
├── jest.config.js
├── package.json
├── tsconfig.json
└── README.md
```

## License

This project is licensed under the MIT License.
```

This README file provides an overview of the project, setup instructions, features, technologies used, and details about running and testing the application. Adjust any parts according to your project's specific needs and details.