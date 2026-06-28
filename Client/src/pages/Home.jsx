import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/products?featured=true');
                setFeaturedProducts(data);
            } catch (error) {
                console.error("Failed to fetch featured products", error);
            }
        };
        fetchFeatured();
    }, []);

    return (
        <>
            <section className="hero-section h-screen flex items-center justify-center text-center text-white relative bg-[url('/assets/images/hero-bg.jpg')] bg-cover bg-center">
                <div className="absolute inset-0 bg-black opacity-30"></div>
                <div className="relative z-10 max-w-3xl px-4">
                    <h1 className="text-6xl md:text-8xl font-bold leading-tight mb-4 animate-fade-in-up">Handmade Warmth, Crafted with Love.</h1>
                    <p className="text-xl md:text-2xl mb-8 animate-fade-in-up delay-200">Exquisite woolen wear, spun from the finest yarns.</p>
                    <Link to="/shop" className="btn-primary text-lg md:text-xl py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all animate-fade-in-up delay-400">Shop Now</Link>
                </div>
            </section>

            <section className="py-20 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl text-center mb-12">Featured Collections</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {['sweaters', 'scarves', 'caps'].map((category) => (
                            <div key={category} className="relative group overflow-hidden rounded-lg shadow-lg bg-gray-200 h-80">
                                <img src={`/assets/images/${category}.jpg`} alt={category} className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500" />
                                <Link to={`/shop?category=${category}`} className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-3xl font-bold uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    {category}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 px-4 md:px-8 bg-cream">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl text-center mb-12">Our Favorite Picks</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 px-4 md:px-8 bg-gray-100">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-4xl mb-4 text-gray-900">Stay in the Loop</h2>
                    <p className="text-lg text-gray-600 mb-8">Sign up for our newsletter to get updates on new arrivals and exclusive offers.</p>
                    <form className="flex flex-col md:flex-row gap-4 items-center justify-center">
                        <input type="email" placeholder="Enter your email" required className="w-full md:w-2/3 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-900" />
                        <button type="submit" className="btn-primary py-4 px-8 rounded-lg w-full md:w-auto">Subscribe</button>
                    </form>
                </div>
            </section>
        </>
    );
};

export default Home;
