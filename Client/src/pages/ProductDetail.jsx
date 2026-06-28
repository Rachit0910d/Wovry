import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(data);
            } catch (error) {
                console.error("Failed to fetch product", error);
            }
        };
        fetchProduct();
    }, [id]);

    if (!product) return <div className="pt-24 text-center min-h-screen">Loading...</div>;

    return (
        <div className="pt-24 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
            <div className="grid md:grid-cols-2 gap-12 mb-20">
                <div>
                    <img src={product.imageUrl} alt={product.name} className="w-full rounded-lg shadow-lg" />
                </div>
                <div>
                    <h1 className="text-5xl font-bold mb-4">{product.name}</h1>
                    <p className="text-3xl font-semibold text-brown-900 mb-6">${product.price}</p>
                    <p className="text-lg leading-relaxed mb-6">{product.description}</p>
                    <div className="flex items-center mb-6 gap-4">
                        <select className="w-32 p-3 border border-gray-300 rounded-lg focus:outline-none">
                            <option>Size</option>
                            <option>XS</option>
                            <option>S</option>
                            <option>M</option>
                            <option>L</option>
                            <option>XL</option>
                        </select>
                        <select className="w-32 p-3 border border-gray-300 rounded-lg focus:outline-none">
                            <option>Color</option>
                            <option>Cream</option>
                            <option>Beige</option>
                            <option>Brown</option>
                        </select>
                    </div>
                    <button className="btn-primary w-full py-4 rounded-lg text-lg font-bold">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
