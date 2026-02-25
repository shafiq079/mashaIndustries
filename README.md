# Masha Industries

This project is a full-stack e-commerce application with a React-based frontend and a Node.js backend.

## Technologies Used

### Frontend
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-%23008CDD.svg?style=for-the-badge&logo=stripe&logoColor=white)

The frontend is a single-page application built with React. It allows users to browse products, add them to the cart, and make payments.

### Backend
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-%23008CDD.svg?style=for-the-badge&logo=stripe&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-%233448C5.svg?style=for-the-badge&logo=cloudinary&logoColor=white)

The backend is a RESTful API built with Node.js and Express. It handles user authentication, product management, orders, and payments.

## Getting Started

Follow these instructions to set up and run the project locally on your machine.

### Prerequisites

Make sure you have the following installed:

*   Node.js (LTS version recommended)
*   npm (comes with Node.js) or Yarn
*   MongoDB (running locally or a cloud instance like MongoDB Atlas)

### Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create a `.env` file** in the `backend` directory and add the following environment variables:
    ```
    MONGODB_URI=your_mongodb_connection_string
    STRIPE_SECRET_KEY=your_stripe_secret_key
    FRONTEND_URL=http://localhost:3000 # Or your frontend's URL
    STRIPE_WEBHOOK_SECRET_KEY=your_stripe_webhook_secret
    TOKEN_SECRET_KEY=a_strong_secret_key_for_jwt
    EMAIL=your_email@example.com # For sending verification emails
    EMAIL_PASSWORD=your_email_password # App password if using Gmail
    PORT=8080 # Or any desired port
    ```
    *Replace placeholder values with your actual credentials.*

4.  **Run the backend server:**
    ```bash
    npm start
    # or for development with hot-reloading
    npm run dev
    ```
    The backend server will typically run on `http://localhost:8080` (or the PORT you specified).

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create a `.env` file** in the `frontend` directory and add the following environment variables:
    ```
    REACT_APP_BACKEND_URL=http://localhost:8080 # Or your backend's URL
    REACT_APP_CLOUD_NAME_CLOUDINARY=your_cloudinary_cloud_name
    REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_publishable_key
    ```
    *Replace placeholder values with your actual credentials.*

4.  **Run the frontend application:**
    ```bash
    npm start
    ```
    The frontend application will typically open in your browser at `http://localhost:3000`.

---

## Credits

This project was developed by [shafiq-webdev](https://shafiq-webdev.vercel.app/).
