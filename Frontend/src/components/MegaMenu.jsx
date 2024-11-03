import React from "react";
import { useState } from 'react';

const MegaMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="mega-menu">
            <button onClick={toggleMenu}>Toggle Menu</button>
            {isMenuOpen && (
                <div className="mega-menu-content">
                    <ul>
                        <li><a href="/services/designs">Designs</a></li>
                        <li><a href="/services/development">Development</a></li>
                        <li><a href="/services/marketing">Marketing</a></li>
                    </ul>
                </div>
            )}
        </div>
    )
};

export default MegaMenu;