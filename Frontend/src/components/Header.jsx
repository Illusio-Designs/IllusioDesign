import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/Header.css'; // Import custom CSS for additional styling
import Logo from '../assets/logo.png';
import { ChevronDown } from "lucide-react";
import MegaMenu from './MegaMenu'; // Import MegaMenu component

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className='pt-4 absolute inset-x-0 z-[9]'>
      <div className='container'>
        <nav className='flex items-center'>
          <motion.a
            className="navbar-brand" href="/"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img src={Logo} alt="Illusio Designs" className="img-fluid" />
          </motion.a>
          
          <div className='flex items-center'>
            <ul className="nav-links flex max-lg:absolute left-0 top-[-100%] max-lg:min-h-[60px] w-full lg:flex-row flex-col max-lg:gap-4 max-lg:p-5">            
              <li>
                <motion.a
                  initial="initial"
                  whileHover="hovered"
                  transition={{ duration: 0.5 }}
                  className="text-md text-[#ffffff] uppercase tracking-wider font-medium py-2 px-4 relative block whitespace-nowrap overflow-hidden"
                  href="/services"
                >
                  <motion.div variants={{ initial: { y: 0 }, hovered: { y: "-120%" } }}>Services</motion.div>
                  <motion.div className="absolute inset-y-2 inset-x-4 hover:text-[#ec691f]" variants={{ initial: { y: "120%" }, hovered: { y: 0 } }}>Services</motion.div>
                </motion.a>
                
                <button onClick={toggleMenu} className="flex items-center gap-2 text-black text-3xl cursor-pointer md:hidden">
                  <ChevronDown className={`transition-transform ${isMenuOpen ? "rotate-180" : "rotate-0"}`} />
                </button>
                
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: isMenuOpen ? "auto" : 0, opacity: isMenuOpen ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-full left-0 w-full bg-white shadow-lg overflow-hidden"
                >
                  {isMenuOpen && <MegaMenu />}
                </motion.div>
              </li>

              {['Project', 'Blog', 'About Us', 'Appointment'].map((item, index) => (
                <li key={index}>
                  <motion.a 
                    initial="initial"
                    whileHover="hovered"
                    transition={{ duration: 0.5 }}
                    className="text-md text-[#ffffff] uppercase tracking-wider font-medium py-2 px-4 relative block whitespace-nowrap overflow-hidden" 
                    href={`/${item.toLowerCase().replace(' ', '')}`}
                  >
                    <motion.div variants={{initial: {y: 0}, hovered: {y: "-120%"}}}>{item}</motion.div>
                    <motion.div className='absolute inset-y-2 inset-x-4 hover:text-[#ec691f]' variants={{initial: {y: "120%"}, hovered: {y: 0}}}>{item}</motion.div>
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          <div className='flex gap-6 items-center'>
            <motion.a 
              initial="initial"
              whileHover="hovered"
              transition={{ duration: 0.5 }}
              className="text-md text-[#FFF] bg-[#ec691f] rounded-full uppercase tracking-wider py-3 px-5 relative whitespace-nowrap overflow-hidden flex items-center gap-3 contact-btn" 
              href="/contactus"
            >
              <motion.div variants={{initial: {y: 0}, hovered: {y: "-195%"}}}>Contact Us</motion.div>
              <motion.div className='btn absolute inset-y-1 left-[-15px]' variants={{initial: {y: "195%"}, hovered: {y: 0}}}>Contact Us</motion.div>
              <div className='bg-white p-3 rounded-full border-2 border-white'>
                <svg width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                  <path stroke="#ec691f" d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                  <line x1="0" y1="16" x2="16" y2="16" stroke="#ec691f" strokeWidth="2" />
                </svg>
              </div>
            </motion.a>          
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
