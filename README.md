# Knit & Purl | Handmade Woolen Wear E-Commerce

Knit & Purl is a premium, modern e-commerce platform dedicated to showcasing and selling exquisite, handcrafted woolen wear. Every piece is knitted with love by skilled artisans from the mountain villages of Kullu Valley, Himachal Pradesh, blending traditional heritage with contemporary fashion.

The application is built to run entirely on the **free Firebase Spark plan** by utilizing a lightweight local Node.js Express server to handle Stripe integrations, avoiding the need for paid cloud function billing.

---

## 🌟 Key Features

* **Variable Sizing in Cart**: Fully supports purchasing the same product in multiple different sizes (e.g. M, L) as separate line items in the cart.
* **Shopping Cart & Slide-out Drawer**: Dynamic product quantities, subtotal calculations, and a sleek cart drawer UI visible on all pages.
* **Stripe & Cash on Delivery (COD) Checkout**: Fully integrated card payment flow via Stripe Checkout and a direct database Cash on Delivery option.
* **Coupon & Promotion Engine**: Validates discount coupons (`WELCOME10`, `FLAT200`, `FIRSTORDER`), estimates PIN-code delivery times, and handles shipping fees.
* **Artisan Story Tab**: Showcases the details of the fabrics, care instructions, and mountain communities behind the clothing.
* **100% Mobile Responsive**: Customized hamburger navigation menu and wrapping layouts for smooth shopping experiences on phones, tablets, and desktops.
* **Admin Dashboard**: Comprehensive manager portal to:
  * Track total revenue, order count, and customer metrics.
  * Receive low stock alerts and view monthly sales trends.
  * Add, edit, or delete catalog products (with multiple image support).
  * Update order tracking statuses (Pending ➔ Processing ➔ Shipped ➔ Delivered) and export order lists to CSV.
  * View a customer list compiling shopping histories.

---

## 🛠️ Tech Stack

* **Frontend**: HTML5, CSS3, ES6 JavaScript, **Tailwind CSS** (via CDN), **FontAwesome 6** (Icons).
* **Database & Auth**: **Firebase JS SDK (v10.7.1)** (Firestore & Firebase Authentication).
* **Local Backend Server**: **Node.js**, **Express**, **Stripe SDK** (Spark-plan compatible).

---

## 🚀 Getting Started (Local Development)

Follow these steps to run the application on your local machine:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).

### 2. Clone the Repository
```bash
git clone https://github.com/Shisank93/Wovry.git
cd Wovry
