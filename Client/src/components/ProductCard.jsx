import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <div className="product-card bg-white rounded-lg shadow-md overflow-hidden flex flex-col group relative">
            <div className="relative overflow-hidden h-64 md:h-80 w-full bg-gray-100">
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:bg-gray-100 cursor-pointer transition-colors z-10 text-gray-500 hover:text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </div>
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">{product.category}</p>
                <h3 className="text-xl font-bold mb-2 line-clamp-1">{product.name}</h3>
                <div className="flex justify-between items-end mt-auto">
                    <p className="text-lg font-bold text-brown-900">${product.price}</p>
                </div>
                <Link to={`/product/${product._id}`} className="absolute inset-0 z-0"></Link>
            </div>
            <div className="p-4 pt-0">
                <button onClick={() => addToCart(product)} className="btn-primary w-full py-2 rounded font-semibold relative z-10 cursor-pointer">Add to Cart</button>
            </div>
        </div>
    );
};

export default ProductCard;
