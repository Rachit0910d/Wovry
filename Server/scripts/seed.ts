import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import Product from '../src/models/Product';
import connectDB from '../src/config/db';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const seedProducts = [
    {
        name: "Classic Wool Sweater",
        description: "A cozy and warm classic wool sweater, perfect for winter.",
        price: 89.99,
        imageUrl: "/assets/images/sweaters.jpg",
        category: "sweaters",
        isFeatured: true
    },
    {
        name: "Elegant Winter Scarf",
        description: "Soft and elegant scarf to keep your neck warm.",
        price: 35.50,
        imageUrl: "/assets/images/scarves.jpg",
        category: "scarves",
        isFeatured: true
    },
    {
        name: "Pom-Pom Beanie Cap",
        description: "Hand-knitted beanie cap with a cute pom-pom.",
        price: 24.99,
        imageUrl: "/assets/images/caps.jpg",
        category: "caps",
        isFeatured: true
    },
    {
        name: "Premium Cashmere Sweater",
        description: "Luxurious cashmere sweater for ultimate comfort.",
        price: 120.00,
        imageUrl: "/assets/images/product1.jpg",
        category: "sweaters",
        isFeatured: false
    }
];

const seedDB = async () => {
    try {
        await connectDB();
        await Product.deleteMany({});
        await Product.insertMany(seedProducts);
        console.log("Database seeded successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seedDB();
