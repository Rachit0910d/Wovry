import express from 'express';
import Product from '../models/Product';

const router = express.Router();

// GET all products
router.get('/', async (req, res) => {
    try {
        const query: any = {};
        if (req.query.featured === 'true') {
            query.isFeatured = true;
        }
        if (req.query.category) {
            query.category = req.query.category;
        }
        
        const products = await Product.find(query).limit(req.query.featured ? 4 : 20);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// GET single product by id
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;
