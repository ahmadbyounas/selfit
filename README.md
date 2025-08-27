# ShelfIt - Your Personal Book Management App

ShelfIt is a modern web application designed to help readers organize, track, and manage their book collections effortlessly. Built with Next.js, Material-UI, and Prisma, ShelfIt provides a seamless experience for book enthusiasts.

## Features Implemented

*   **User Authentication:** Secure sign-up, sign-in, and sign-out functionalities using NextAuth.js.
*   **Book Management:**
    *   Add new books to your collection.
    *   View a comprehensive list of your books.
    *   Delete books from your collection with a custom confirmation dialog.
*   **Interactive Dashboard:**
    *   Personalized welcome message.
    *   Displays total number of books in your collection.
    *   (Future: Visual insights into reading habits like daily books added/deleted).
*   **Responsive User Interface:** Designed with Material-UI components for a consistent and adaptive experience across various devices.
*   **Dynamic Landing Page:** Engaging Lottie animation and subtle parallax effects to welcome users.
*   **Animated Interactions:** Custom animated empty states and smooth transitions for a modern feel.

## Authentication Flow Details

ShelfIt leverages **NextAuth.js** for robust authentication.

*   **Credentials Provider:** Users can sign up and sign in using their email and password.
*   **API Routes:** Authentication is handled via Next.js API routes (`/api/auth/[...nextauth]` for NextAuth.js core and `/api/auth/register` for user registration).
*   **Session Management:** User sessions are securely managed, providing a personalized experience.
*   **Protected Routes:** Higher-Order Components (HOCs) are used to protect routes, ensuring only authenticated users can access specific parts of the application (e.g., the dashboard).

## Setup Instructions for Running Locally

Follow these steps to get ShelfIt up and running on your local machine.

### Prerequisites

*   Node.js (v18 or higher recommended)
*   npm (Node Package Manager) or Yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone git@github.com:ahmadbyounas/selfit.git 
    cd shelfit
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

### Database Setup (Prisma)

ShelfIt uses Prisma as its ORM.

1.  **Create a `.env.local` file:**
    See the section below for details on creating this file.
2.  **Run Prisma Migrations:**
    This will apply the database schema and generate the Prisma client.
    ```bash
    npx prisma migrate dev --name init
    ```
    *(Note: `init` is a common name for the first migration. If you have existing migrations, adjust accordingly.)*
3.  **Generate Prisma Client:**
    ```bash
    npx prisma generate
    ```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Creating a `.env.local` File

Create a file named `.env.local` in the root directory of your project. This file will store your environment variables.

```
# Database URL for Prisma
DATABASE_URL="postgresql://user:password@localhost:5432/shelfit?schema=public"

# NextAuth.js Secret (generate a strong random string)
# You can generate one using: openssl rand -base64 32
NEXTAUTH_SECRET="YOUR_NEXTAUTH_SECRET_HERE"

# NextAuth.js URL (for production, this will be your deployed URL)
NEXTAUTH_URL="http://localhost:3000"
```
**Important:** Replace the placeholder values with your actual database connection string and a strong secret.

## Deployment

**Live Deployment Link:**  https://selfit.vercel.app/