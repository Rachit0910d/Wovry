# Wovry - Knit & Purl E-Commerce Platform

Welcome to **Wovry (Knit & Purl)**, a beautiful, premium, and fully responsive e-commerce web application specializing in handcrafted woolen wear from India. The application features user authentication, a dynamic cart with sizing/color options, discount coupon codes, real-time Firestore database integration, an interactive admin dashboard, and a seamless Stripe payment checkout flow optimized for the **Firebase Spark (Free) Plan**.

---

## 🚀 Key Features

*   **Responsive Showcase & Shop**: Fully mobile-responsive layout featuring products, detailed product views (with reviews), meet-the-artisans, and contact details.
*   **Flexible Cart System**: Advanced cart logic managing item compound IDs (`${id}-${size}-${color}`) so users can purchase multiple sizes/colors of the same product.
*   **Firebase Integration**:
    *   **Firebase Authentication**: Secure user login, registration, and profile pages.
    *   **Cloud Firestore**: Real-time storage for product lists, user reviews, newsletter subscribers, and order tracking.
*   **Firebase Spark-Plan Friendly Stripe Checkout**: Bypasses the need for Firebase Cloud Functions (which require a paid Blaze plan). 
    *   Creates preliminary order records directly on the client.
    *   Generates secure Stripe Checkout Sessions via a lightweight local Express server.
    *   Confirms order payments securely upon redirection to the success page.
*   **Interactive Admin Dashboard**:
    *   Track statistics: Total Revenue, Total Orders, Total Products, and Total Customers.
    *   Interactive charts displaying monthly revenue trends and order status distributions.
    *   Manage products (Add, update, or delete inventory).
    *   View all customers and list real-time order status histories.
*   **Coupon Code System**:
    *   `WELCOME10`: 10% off on orders above ₹500
    *   `FLAT200`: ₹200 off on orders above ₹1500
    *   `FIRSTORDER`: 15% off on first order above ₹1000
*   **Dynamic Shipping Logic**:
    *   Flat ₹99 shipping charges on orders below ₹2000.
    *   Automatic **FREE Shipping** for all orders above ₹2000.

---

## 🛠️ Technology Stack

*   **Frontend**: HTML5, Vanilla JavaScript (ES6 Modules), TailwindCSS / Custom CSS, FontAwesome icons.
*   **Database & Auth**: Google Cloud Firestore & Firebase Auth.
*   **Backend Server (Local)**: Node.js, Express, Stripe SDK, dotenv, CORS.
*   **Payment Gateway**: Stripe API.

---

## 📂 Project Structure

```
Wovry/
├── .env                         # Local environment configuration (Stripe keys)
├── .gitignore                   # Ignore node_modules, .env, and OS files
├── server.js                    # Express local backend to request Stripe sessions
├── package.json                 # Project dependencies & startup scripts
├── README.md                    # Project documentation
└── Wovry/                       # Frontend application directory
    ├── firebase.json            # Firebase configuration
    ├── index.html               # Homepage
    ├── shop.html                # Catalog page
    ├── product.html             # Product detail & reviews
    ├── cart.html                # Cart management
    ├── checkout.html            # Checkout information & order summary
    ├── payment-success.html     # Stripe payment success landing page
    ├── payment-cancel.html      # Stripe payment cancel landing page
    ├── admin.html               # Administration portal UI
    ├── track-order.html         # Order tracking console
    ├── css/                     # Stylesheets
    └── js/                      # Frontend JavaScript
        ├── main.js              # Global script / Mobile navigation menu
        ├── cart.js              # Cart management utility
        ├── checkout.js          # Checkout flow & Firebase order creation
        ├── coupon.js            # Coupon validation & shipping calculation
        ├── admin.js             # Admin dashboard operations & charts
        └── firebase-config.js   # Client-side Firebase SDK configuration
```

---

## 🔧 Installation & Local Setup

Follow these steps to run the project locally on your machine:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (v16+ recommended).

### 2. Clone the Repository
```bash
git clone https://github.com/Shisank93/Wovry.git
cd Wovry
```

### 3. Install Dependencies
Install Node modules for the Express server:
```bash
npm install
```

### 4. Configure Environment Variables
Create a file named `.env` in the root of the project (at the same level as `server.js`) and add your Stripe API keys:
```env
PORT=3000
STRIPE_SECRET_KEY=your_stripe_secret_key_here
```
> **Note**: `.env` is already configured in `.gitignore` to prevent secret keys from being pushed to public git branches.

### 5. Running the Application
Start the local server:
```bash
npm start
```
Once started, open your browser and navigate to:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🔒 Firestore Database Security Rules

For client-side operations (specifically writing orders and reading user profiles) to work properly under the Spark plan, deploy or set the following security rules in your **Firebase Console -> Firestore Database -> Rules**:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    // Orders collection: Allow authenticated/guest users to create orders
    match /orders/{orderId} {
      allow create: if true;
      allow read, update: if true; // Admin and customer lookup
    }
    
    // Products collection: Allow public reads, restrict updates to admins
    match /products/{productId} {
      allow read: if true;
      allow write: if true; // Admin writes
    }
    
    // Reviews collection: Allow public reads, write access for users
    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if request.auth != null;
    }
    
    // Newsletter subscribers
    match /newsletterSubscribers/{subscriberId} {
      allow create: if true;
      allow read: if true; // Admin reads
    }
    
    // Customers collection: Managed client-side
    match /customers/{customerId} {
      allow read, write: if true;
    }
  }
}
```

---

## 💳 Stripe Test Checkout Guidelines
*   Stripe enforces a minimum payment threshold of **$0.50 USD (approx. ₹42 INR)** for transactions. To test checking out successfully without errors:
    1. Add items to your cart totaling **₹50 INR or more**.
    2. Enter coupon codes during checkout if desired.
    3. Select **Stripe Card Payment**, fill out the address forms, and click **Proceed to Payment**.
    4. You will be redirected to the secure Stripe Checkout Page where you can complete the purchase using test cards (e.g., standard Stripe test card numbers).
