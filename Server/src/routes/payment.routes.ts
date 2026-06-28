import express from 'express';
import Razorpay from 'razorpay';

const router = express.Router();

router.post('/orders', async (req, res) => {
    try {
        const key_id = process.env.RAZORPAY_API_KEY || process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder';
        const key_secret = process.env.RAZORPAY_KEY_SECRET || 'secret_placeholder';

        const instance = new Razorpay({
            key_id,
            key_secret,
        });

        const options = {
            amount: req.body.amount, // amount in the smallest currency unit (paise for INR)
            currency: 'USD', // using USD as per previous implementation, but razorpay supports it
            receipt: 'receipt_order_' + Math.floor(Math.random() * 1000000),
        };

        const order = await instance.orders.create(options);

        if (!order) {
            return res.status(500).send('Some error occurred');
        }

        res.json({
            orderId: order.id,
            currency: order.currency,
            amount: order.amount,
            keyId: key_id // send key to frontend
        });
    } catch (error) {
        console.error('Razorpay Error:', error);
        res.status(500).send(error);
    }
});

export default router;
