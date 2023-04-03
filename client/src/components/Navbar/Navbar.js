// create a navbar component

import React, { useState, useEffect } from 'react';

// import react router dom
import { Link } from 'react-router-dom';

// import navbar data
import NavbarData from './NavbarData';

// import useAuth hook
import UseAuth from '../../hooks/UseAuth';

// we'll be using tailwind css for styling

// navbar component using navbar data
function Navbar(props) {
    // state for keeping track of navbar data
    const [navbarData, setNavbarData] = useState([]);
    
    // state for keeping track of navbar toggle
    const [navbarToggle, setNavbarToggle] = useState(false);

    // get user state
    const { user, isAuthenticated } = UseAuth();

    
    // use effect to get navbar data (props start and end for slice of navbar data)
    useEffect(() => {
        // get navbar data
        setNavbarData(NavbarData.slice(props.start, props.end));
    }, [props.start, props.end]);
    
    // navbar toggle handler
    const navbarToggleHandler = () => {
        // toggle navbar
        setNavbarToggle(!navbarToggle);
    };
    // if user is logged in, show it on center of navbar
    return (
        <nav className="sticky top-0 bg-gradient-to-r from-purple-500 to-pink-500 flex justify-between items-center h-16 bg-white text-black text-3xl relative shadow-sm font-mono" role="navigation">
        <Link to="/" className="pl-8">
            SCRUM Web Application
        </Link>
        <div className="px-4 cursor-pointer" onClick={navbarToggleHandler}>
            <i className="fas fa-bars"></i>
            </div>
        
            {/* if user is logged in, show user name on center of navbar */}
            {isAuthenticated ?
            <div className={`flex flex-row justify-between items-center text-center font-semibold`}>
                Logged in as {user.email}
            </div>
            : null}
        <div className={`pr-8 md:block ${navbarToggle ? 'hidden' : ''}`}>
                <ul className="flex flex-row justify-between items-center">
            {navbarData.map((item, index) => {
                return (
                <li key={index}>
                    <Link to={item.path} className="p-4">
                    {item.icon}
                    {item.title}
                    </Link>
                </li>
                );
            })}
            </ul>
        </div>
        </nav>
    );
}

export default Navbar;