require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS and parse JSON body
app.use(cors());
app.use(express.json());

// Serve static frontend files from 'Wovry' folder
app.use(express.static(path.join(__dirname, 'Wovry')));

// API Endpoint to create a Stripe Checkout Session
app.post('/api/create-checkout-session', async (req, res) => {
    try {
        const { items, orderId, discount, baseUrl } = req.body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).send({ error: 'Invalid cart items.' });
        }

        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const discountAmount = Math.min(discount || 0, subtotal);
        const discountRatio = subtotal > 0 ? discountAmount / subtotal : 0;

        const lineItems = items.map(item => {
            const discountedPrice = item.price * (1 - discountRatio);
            return {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: item.name,
                        images: item.imageUrl ? [item.imageUrl] : [],
                    },
                    unit_amount: Math.round(discountedPrice * 100), // in paise (cents)
                },
                quantity: item.quantity,
            };
        });

        // Calculate shipping charges (Free shipping)
        const finalSubtotal = subtotal - discountAmount;
        const shippingAmount = 0;

        if (shippingAmount > 0) {
            lineItems.push({
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: 'Shipping Charges',
                    },
                    unit_amount: shippingAmount * 100,
                },
                quantity: 1,
            });
        }

        const clientBaseUrl = baseUrl || req.headers.origin || `http://localhost:${PORT}`;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${clientBaseUrl}/payment-success.html?orderId=${orderId}&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${clientBaseUrl}/payment-cancel.html`,
            metadata: {
                orderId: orderId
            }
        });

        res.status(200).send({ id: session.id });

    } catch (error) {
        console.error("Error creating Stripe checkout session:", error);
        res.status(500).send({ error: 'Failed to create checkout session.' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`==================================================`);
    console.log(` Knit & Purl Local Server running successfully!`);
    console.log(` Website Available: http://localhost:${PORT}`);
    console.log(`==================================================`);
});
