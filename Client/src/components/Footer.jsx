const Footer = () => {
    return (
        <footer className="bg-brown-900 text-white py-12 px-8">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                <div className="mb-6 md:mb-0">
                    <h3 className="text-2xl font-bold mb-2">KNIT & PURL</h3>
                    <p>&copy; 2023 All rights reserved.</p>
                </div>
                <div className="flex space-x-6 text-2xl">
                    <a href="#" className="hover:text-gray-400"><i className="fab fa-instagram"></i></a>
                    <a href="#" className="hover:text-gray-400"><i className="fab fa-facebook-f"></i></a>
                    <a href="#" className="hover:text-gray-400"><i className="fab fa-pinterest"></i></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
