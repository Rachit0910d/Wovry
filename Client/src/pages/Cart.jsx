import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Trash2, ArrowRight } from 'lucide-react';
import axios from 'axios';

const Cart = () => {
    const { cart, removeFromCart, clearCart } = useCart();
    const { user } = useAuth();
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();

    const subtotal = cart.reduce((total, item) => total + item.price, 0);
    const shipping = cart.length > 0 ? 15.00 : 0;
    const total = subtotal + shipping;

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleRazorpayPayment = async () => {
        if (!user) {
            alert('Please login to checkout');
            navigate('/login?redirect=/cart');
            return;
        }

        setIsProcessing(true);

        try {
            // 1. Create Order on Backend
            // We pass the total amount in cents/paise (amount * 100)
            const { data } = await axios.post('http://localhost:5000/api/payment/orders', {
                amount: Math.round(total * 100)
            });

            // 2. Initialize Razorpay Checkout
            const options = {
                key: data.keyId,
                amount: data.amount,
                currency: data.currency,
                name: "Knit & Purl",
                description: "Purchase of premium winter wear",
                image: "https://your-logo-url.com/logo.png", // Optional
                order_id: data.orderId,
                handler: function (response) {
                    // Payment successful
                    alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
                    clearCart();
                    navigate('/');
                },
                prefill: {
                    name: user?.name || "Customer",
                    email: user?.email || "customer@example.com",
                    contact: "9999999999" // Mock contact
                },
                theme: {
                    color: "#8b4513" // Match our brand color (brown-800)
                }
            };

            const rzp = new window.Razorpay(options);
            
            rzp.on('payment.failed', function (response){
                alert("Payment Failed: " + response.error.description);
            });
            
            rzp.open();
        } catch (error) {
            console.error('Error initiating Razorpay checkout:', error);
            alert('Could not initiate checkout. Make sure your test keys are valid and the server is running.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="pt-24 px-4 md:px-8 max-w-7xl mx-auto min-h-[70vh]">
            <h1 className="text-4xl text-center mb-12 font-bold tracking-wider text-brown-900">Your Cart</h1>
            
            {cart.length === 0 ? (
                <div className="text-center bg-gray-50 py-16 rounded-lg border border-gray-100">
                    <p className="text-xl text-gray-500 mb-6">Your cart is currently empty.</p>
                    <Link to="/shop" className="inline-block bg-brown-900 text-white font-bold py-3 px-8 rounded hover:bg-brown-800 transition duration-300">
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                            <div className="hidden sm:grid sm:grid-cols-6 border-b border-gray-200 p-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                                <div className="sm:col-span-3">Product</div>
                                <div className="sm:col-span-1 text-center">Price</div>
                                <div className="sm:col-span-1 text-center">Qty</div>
                                <div className="sm:col-span-1 text-right">Remove</div>
                            </div>
                            
                            <ul className="divide-y divide-gray-200">
                                {cart.map((item, index) => (
                                    <li key={`${item._id}-${index}`} className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center">
                                        <div className="flex items-center flex-1 sm:col-span-3">
                                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-100">
                                                <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover object-center" />
                                            </div>
                                            <div className="ml-4 flex flex-1 flex-col">
                                                <div>
                                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                                        <h3>
                                                            <Link to={`/product/${item._id}`}>{item.name}</Link>
                                                        </h3>
                                                    </div>
                                                    <p className="mt-1 text-sm text-gray-500 uppercase">{item.category}</p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="mt-4 sm:mt-0 sm:col-span-1 text-left sm:text-center flex-1">
                                            <p className="text-gray-900 font-medium">${item.price.toFixed(2)}</p>
                                        </div>
                                        
                                        <div className="mt-4 sm:mt-0 sm:col-span-1 text-left sm:text-center flex-1">
                                            <span className="text-gray-500">1</span>
                                        </div>
                                        
                                        <div className="mt-4 sm:mt-0 sm:col-span-1 text-right">
                                            <button 
                                                onClick={() => removeFromCart(index)}
                                                type="button" 
                                                className="font-medium text-red-500 hover:text-red-700 p-2"
                                            >
                                                <Trash2 className="w-5 h-5 inline-block" />
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    
                    <div className="lg:col-span-1">
                        <div className="bg-gray-50 rounded-lg p-6 border border-gray-100 sticky top-24">
                            <h2 className="text-lg font-medium text-gray-900 mb-6">Order summary</h2>
                            
                            <div className="flow-root">
                                <dl className="-my-4 text-sm divide-y divide-gray-200">
                                    <div className="py-4 flex items-center justify-between">
                                        <dt className="text-gray-600">Subtotal</dt>
                                        <dd className="font-medium text-gray-900">${subtotal.toFixed(2)}</dd>
                                    </div>
                                    <div className="py-4 flex items-center justify-between">
                                        <dt className="text-gray-600">Shipping</dt>
                                        <dd className="font-medium text-gray-900">${shipping.toFixed(2)}</dd>
                                    </div>
                                    <div className="py-4 flex items-center justify-between">
                                        <dt className="text-base font-bold text-gray-900">Order total</dt>
                                        <dd className="text-base font-bold text-gray-900">${total.toFixed(2)}</dd>
                                    </div>
                                </dl>
                            </div>
                            
                            <div className="mt-8">
                                <button
                                    onClick={handleRazorpayPayment}
                                    type="button"
                                    disabled={isProcessing}
                                    className={`w-full bg-brown-900 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white ${isProcessing ? 'opacity-70' : 'hover:bg-brown-800'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brown-500 flex justify-center items-center gap-2 transition-colors duration-300 cursor-pointer`}
                                >
                                    {isProcessing ? 'Processing...' : 'Checkout'} {!isProcessing && <ArrowRight className="w-5 h-5" />}
                                </button>
                            </div>
                            
                            <div className="mt-6 text-center text-sm text-gray-500">
                                <p>
                                    or{' '}
                                    <Link to="/shop" className="text-brown-900 font-medium hover:text-brown-700">
                                        Continue Shopping<span aria-hidden="true"> &rarr;</span>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
