# Knit & Purl - Premium Winter Wear

**Live Preview:** [Insert your preview link here]

Knit & Purl is a full-stack MERN (MongoDB, Express, React, Node.js) web application designed for a premium ecommerce experience. It features user authentication, a dynamic product catalog, a shopping cart, and a seamless Razorpay checkout integration.

---

## 🏗️ Project Architecture

This is a monorepo containing both the frontend and backend of the application:
- `/Client`: The frontend built with React, Vite, and Tailwind CSS.
- `/Server`: The backend API built with Node.js, Express, and MongoDB.

---

## 🎨 Frontend Workflow

The frontend provides a fast, responsive, and beautiful user experience:

1. **State Management:** Uses React Context (`AuthContext`, `CartContext`) to manage global states like the user's login session and their shopping cart items across different pages.
2. **Routing:** Uses `react-router-dom` to navigate between Home, Shop, About, Contact, Login, Register, and Cart without reloading the page.
3. **Styling:** Styled heavily with Tailwind CSS to provide a clean, modern aesthetic with a custom dark mode feature toggled via the navigation bar.
4. **Checkout Flow:** When a user proceeds to checkout from the Cart, the frontend calls the backend to generate an order ID, and then seamlessly injects the Razorpay SDK to handle payments natively over the application.

---

## ⚙️ Backend Endpoints

The backend handles database interactions, authentication, and payment generation. All requests are prefixed with `/api`.

### Authentication (`/api/auth`)
- `POST /register`: Accepts a user's name, email, and password. Hashes the password securely using bcrypt and saves the user to MongoDB. Returns a JWT token.
- `POST /login`: Validates the user's email and password. Returns a JWT token for the frontend to persist in LocalStorage.

### Products (`/api/products`)
- `GET /`: Retrieves a list of all available products from the MongoDB database to display on the Shop page.

### Payment (`/api/payment`)
- `POST /orders`: Accepts the cart's total amount and creates a secure Razorpay Order. Returns the `orderId`, `amount`, `currency`, and `keyId` required for the frontend to initialize the payment modal.

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js installed
- MongoDB connection string
- Razorpay Test API Keys

### 1. Start the Backend
```bash
cd Server
npm install
# Ensure your .env file has PORT, MONGO_URI, RAZORPAY_API_KEY, RAZORPAY_KEY_SECRET
npm run dev
```

### 2. Start the Frontend
```bash
cd Client
npm install
# Ensure your .env file is set up (if needed)
npm run dev
```

The frontend will run on `http://localhost:5173` and the backend on `http://localhost:5000`.
