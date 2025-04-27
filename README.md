# Speak Product

This project consists of a frontend application and a backend API.

## Project Structure

- `speak.product/`: Contains the frontend application (likely built with React/Vite).
- `backend.speak.product/`: Contains the backend API (likely built with Node.js/Express).

## Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd speak.product.full
    ```

2.  **Setup Backend:**
    Navigate to the backend directory and install dependencies:
    ```bash
    cd backend.speak.product
    npm install
    ```
    Set up the database and run migrations. (Details on database setup and migration command needed)
    Create a `.env` file in the `backend.speak.product/` directory with necessary environment variables (e.g., database connection string, ports).

3.  **Setup Frontend:**
    Navigate to the frontend directory and install dependencies:
    ```bash
    cd ../speak.product
    npm install
    ```
    Create a `.env` file in the `speak.product/` directory with necessary environment variables (e.g., API endpoint).

## Running the Project

1.  **Run Backend:**
    Navigate to the backend directory and start the server:
    ```bash
    cd backend.speak.product
    npm start # or appropriate start command
    ```

2.  **Run Frontend:**
    Navigate to the frontend directory and start the development server:
    ```bash
    cd ../speak.product
    npm run dev # or appropriate dev command
    ```

The frontend application should now be accessible in your browser, and it will communicate with the running backend API.

## Further Information

-   Refer to the `backend.speak.product/README.md` (if exists) for backend-specific details.
-   Refer to the `speak.product/README.md` (if exists) for frontend-specific details.