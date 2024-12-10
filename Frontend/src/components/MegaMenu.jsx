import React, { useState } from "react";

const MegaMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div style={{ color: "black" }}>
            <button onClick={toggleMenu} style={{ color: "black" }}>Toggle Menu</button>
            {isMenuOpen && (
                <div style={{ color: "black" }}>
                    <ul>
                        <li><a href="/services/designs" style={{ color: "black" }}>Designs</a></li>
                        <li><a href="/services/development" style={{ color: "black" }}>Development</a></li>
                        <li><a href="/services/marketing" style={{ color: "black" }}>Marketing</a></li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MegaMenu;
