import React from 'react';

const Contact = () => {
    return (
        <div className="pt-24 px-4 md:px-8 max-w-4xl mx-auto min-h-[70vh]">
            <h1 className="text-4xl text-center mb-12 font-bold tracking-wider text-brown-900">Contact Us</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Get in Touch</h2>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        Have a question about our products, an order, or just want to say hello? Fill out the form, and our customer service team will get back to you as soon as possible.
                    </p>
                    
                    <div className="space-y-6">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 mt-1 text-brown-900">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-medium text-gray-900">Email</h3>
                                <p className="text-gray-600">hello@knitandpurl.com</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start">
                            <div className="flex-shrink-0 mt-1 text-brown-900">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                                <p className="text-gray-600">1-800-SWEATERS</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Thank you for your message! We will get back to you soon.'); }}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input type="text" id="name" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brown-500 focus:border-brown-500 p-2 border" />
                        </div>
                        
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" id="email" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brown-500 focus:border-brown-500 p-2 border" />
                        </div>
                        
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                            <textarea id="message" rows="4" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brown-500 focus:border-brown-500 p-2 border"></textarea>
                        </div>
                        
                        <button type="submit" className="w-full bg-brown-900 text-white font-bold py-3 px-4 rounded hover:bg-brown-800 transition duration-300">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
