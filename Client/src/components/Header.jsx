import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, UserCircle, Moon, Sun, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const location = useLocation();
    const isHome = location.pathname === '/';
    const { cart } = useCart();
    const { user, logout } = useAuth();
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Check if body has dark class initially
        setIsDarkMode(document.body.classList.contains('dark'));
    }, []);

    const toggleTheme = () => {
        document.body.classList.toggle('dark');
        setIsDarkMode(!isDarkMode);
    };
    
    // Dynamic styles based on route
    const textColorClass = isHome 
        ? 'text-white hover:text-gray-300' 
        : isDarkMode ? 'text-gray-100 hover:text-gray-300' : 'text-gray-900 hover:text-brown-900';
        
    const iconColorClass = isHome 
        ? 'text-white hover:text-gray-300' 
        : isDarkMode ? 'text-gray-100 hover:text-gray-300' : 'text-gray-900 hover:text-brown-900';
        
    const logoColorClass = isHome 
        ? 'text-white' 
        : isDarkMode ? 'text-gray-100' : 'text-gray-900';
        
    const tagBgClass = isHome ? 'bg-red-500' : 'bg-brown-900';

    return (
        <header className="bg-transparent absolute top-0 w-full z-10 py-6 px-8">
            <nav className="flex justify-between items-center max-w-7xl mx-auto">
                <Link to="/" className={`text-2xl font-bold tracking-widest ${logoColorClass}`}>KNIT & PURL</Link>
                <div className="hidden md:flex space-x-8 items-center">
                    <Link to="/shop" className={`${textColorClass} transition-colors`}>Shop</Link>
                    <Link to="/about" className={`${textColorClass} transition-colors`}>About</Link>
                    <Link to="/contact" className={`${textColorClass} transition-colors`}>Contact</Link>
                    {user ? (
                        <>
                            <Link to="/profile" className={`${textColorClass} transition-colors`}>Account</Link>
                            <button onClick={logout} className={`${textColorClass} transition-colors cursor-pointer`}>Logout</button>
                        </>
                    ) : (
                        <Link to="/login" className={`${textColorClass} transition-colors`}>Login</Link>
                    )}
                </div>
                <div className="flex items-center space-x-6">
                    <Link to="/cart" className={`${iconColorClass} transition-colors relative`}>
                        <ShoppingBag className="w-6 h-6" />
                        <span className={`absolute -top-2 -right-2 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center ${tagBgClass}`}>{cart.length}</span>
                    </Link>
                    <Link to={user ? "/profile" : "/login"} className={`md:hidden ${iconColorClass} transition-colors`}>
                        <UserCircle className="w-6 h-6" />
                    </Link>
                    <button onClick={toggleTheme} className={`${iconColorClass} transition-colors cursor-pointer`}>
                        {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Header;
