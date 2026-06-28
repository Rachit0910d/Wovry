import React from 'react';

const About = () => {
    return (
        <div className="pt-24 px-4 md:px-8 max-w-4xl mx-auto min-h-[70vh]">
            <h1 className="text-4xl text-center mb-12 font-bold tracking-wider text-brown-900">About Knit & Purl</h1>
            
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    Welcome to <span className="font-semibold text-brown-900">Knit & Purl</span>, your premium destination for high-quality, handcrafted winter wear. We believe that staying warm shouldn't mean compromising on style or comfort.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    Our journey began with a simple passion for luxurious natural fibers—cashmere, merino wool, and alpaca. Every sweater, scarf, and beanie in our collection is carefully curated to ensure it meets our strict standards for softness, durability, and ethical sourcing.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                    Whether you're braving the winter chill or looking for the perfect cozy gift, our collection is designed to wrap you in warmth and elegance. Thank you for choosing Knit & Purl.
                </p>
            </div>
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="p-6 bg-brown-50 rounded-lg">
                    <h3 className="text-xl font-bold mb-3 text-brown-900">Premium Quality</h3>
                    <p className="text-gray-600">Only the finest natural materials for ultimate comfort.</p>
                </div>
                <div className="p-6 bg-brown-50 rounded-lg">
                    <h3 className="text-xl font-bold mb-3 text-brown-900">Sustainable</h3>
                    <p className="text-gray-600">Ethically sourced materials and responsible manufacturing.</p>
                </div>
                <div className="p-6 bg-brown-50 rounded-lg">
                    <h3 className="text-xl font-bold mb-3 text-brown-900">Timeless Style</h3>
                    <p className="text-gray-600">Classic designs that you'll love wearing season after season.</p>
                </div>
            </div>
        </div>
    );
};

export default About;
