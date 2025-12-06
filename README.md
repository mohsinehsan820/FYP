# Departmental Store E-commerce Project

This project is a full-stack e-commerce application composed of a Next.js frontend and three Express.js backend microservices.

## Project Structure

The workspace consists of four main folders:

1.  **`frontend-main`**: The user interface built with Next.js.
2.  **`backend-main`**: The Admin API for managing products and categories.
3.  **`public-backend-main`**: The Public API for fetching products and categories (read-only/public access).
4.  **`users-main`**: The User API for authentication, cart management, and order processing.

## Prerequisites

*   [Node.js](https://nodejs.org/) (v14 or higher recommended)
*   [MongoDB](https://www.mongodb.com/) (Local installation or Atlas URI)

## Installation & Setup

You need to install dependencies for each service independently.

### 1. Backend Services

For each of the backend folders (`backend-main`, `public-backend-main`, `users-main`), open a terminal and run:

```bash
npm install
```

### 2. Frontend

Navigate to the frontend folder (`frontend-main`) and run:

```bash
npm install
```

## Configuration

You must configure environment variables for each service to ensure they run on different ports and can communicate with each other.

### 1. Admin Backend (`backend-main`)

Create a `.env` file in `backend-main/`:

```env
PORT=3001
DATABASE_URL=mongodb://localhost:27017/departmental_store
```

### 2. Public Backend (`public-backend-main`)

Create a `.env` file in `public-backend-main/`:

```env
PORT=3002
DATABASE_URL=mongodb://localhost:27017/departmental_store
```

### 3. User Backend (`users-main`)

Create a `.env` file in `users-main/`:

```env
PORT=3003
DATABASE_URL=mongodb://localhost:27017/departmental_store
JWT_TOKEN_KEY=your_secret_key_here
```

### 4. Frontend (`frontend-main`)

Create a `.env.local` file in `frontend-main/`:

```env
# Points to Admin Backend (Port 3001)
NEXT_PUBLIC_ADMIN_API_URL=http://localhost:3001

# Points to Public Backend (Port 3002)
NEXT_PUBLIC_API_URL=http://localhost:3002

# Points to User Backend (Port 3003)
NEXT_PUBLIC_USER_API_URL=http://localhost:3003
```

> **Note:** Ensure the ports match what you defined in the backend `.env` files.

## Running the Project

You need to run all four services simultaneously. It is recommended to open 4 separate terminal instances.

### Terminal 1: Admin Backend
```bash
cd backend-main
npm run dev
```
*Runs on http://localhost:3001*

### Terminal 2: Public Backend
```bash
cd public-backend-main
npm run dev
```
*Runs on http://localhost:3002*

### Terminal 3: User Backend
```bash
cd users-main
npm run dev
```
*Runs on http://localhost:3003*

### Terminal 4: Frontend
```bash
cd frontend-main
npm run dev
```
*Runs on http://localhost:3000*

## Usage

Once all services are running, open your browser and navigate to `http://localhost:3000` to view the application.

## Additional Notes

### Image Handling
Images uploaded via the Admin panel are stored in the `backend-main/public` directory. The frontend is configured to fetch images from the Admin API URL (`NEXT_PUBLIC_ADMIN_API_URL`). Ensure the Admin backend is running for product images to load correctly.

### Database
All three backend services connect to the same MongoDB database (`departmental_store`). This allows them to share data (e.g., products created in Admin are visible in Public and User APIs).
