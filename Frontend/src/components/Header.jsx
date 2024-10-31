import React from 'react';
import { color, motion } from 'framer-motion';
import '../styles/Header.css'; // Import custom CSS for additional styling
import Logo from '../assets/logo.png'

const Header = () => {
  const navLinks = document.querySelector('.nav-links');
      function onToggleMenu(e){
          e.name = e.name === "menu" ? "close" : "menu"
          navLinks.classList.toggle('max-md:top-[100px]');
      }
  return (
    <>
    <header className='pt-4'>
      <div className='container m-auto py-4 border-[#ec691f] border-t-2 border-b-2'>
        <nav className='flex justify-between items-center'>
        <motion.a
          className="navbar-brand" href="/"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={Logo}
            alt="Illusio Designs"
            className="img-fluid"
          />
        </motion.a>
        <div className='flex items-center'>
          <ul className="nav-links flex max-lg:absolute left-0 top-[-100%] max-lg:min-h-[60px] w-full lg:flex-row flex-col max-lg:gap-4 max-lg:p-5">
            
            <li>
              <motion.a 
                initial="initial"
                whileHover="hovered"
                transition="duration"
                className="text-md text-[#000] uppercase tracking-wider font-medium py-2 px-4 relative block whitespace-nowrap overflow-hidden" href="/services">
                <motion.div variants={{initial: {y: 0}, hovered: {y: "-120%"}, duration: 0.5 }}>Services</motion.div>
                <motion.div className='absolute inset-y-2 inset-x-4 hover:text-[#ec691f]' variants={{initial: {y: "120%"}, hovered: {y: 0}, duration: 0.5}}>Services</motion.div>
              </motion.a>
            </li>
            <li>
              <motion.a 
                initial="initial"
                whileHover="hovered"
                transition="duration"
                className="text-md text-[#000] uppercase tracking-wider font-medium py-2 px-4 relative block whitespace-nowrap overflow-hidden" href="/project">
                <motion.div variants={{initial: {y: 0}, hovered: {y: "-120%"}, duration: 0.5 }}>Project</motion.div>
                <motion.div className='absolute inset-y-2 inset-x-4 hover:text-[#ec691f]' variants={{initial: {y: "120%"}, hovered: {y: 0}, duration: 0.5}}>Project</motion.div>
              </motion.a>
            </li>
            <li>
              <motion.a 
                initial="initial"
                whileHover="hovered"
                transition="duration"
                className="text-md text-[#000] uppercase tracking-wider font-medium py-2 px-4 relative block whitespace-nowrap overflow-hidden" href="/blog">
                <motion.div variants={{initial: {y: 0}, hovered: {y: "-120%"}, duration: 0.5 }}>Blog</motion.div>
                <motion.div className='absolute inset-y-2 inset-x-4 hover:text-[#ec691f]' variants={{initial: {y: "120%"}, hovered: {y: 0}, duration: 0.5}}>Blog</motion.div>
              </motion.a>
            </li>
            
            <li>
              <motion.a 
                initial="initial"
                whileHover="hovered"
                transition="duration"
                className="text-md text-[#000] uppercase tracking-wider font-medium py-2 px-4 relative block whitespace-nowrap overflow-hidden" href="/aboutus">
                <motion.div variants={{initial: {y: 0}, hovered: {y: "-120%"}, duration: 0.5 }}>About Us</motion.div>
                <motion.div className='absolute inset-y-2 inset-x-4 hover:text-[#ec691f]' variants={{initial: {y: "120%"}, hovered: {y: 0}, duration: 0.5}}>About Us</motion.div>
              </motion.a>
            </li>
          </ul>
        </div>
        <div className='flex gap-6 items-center'>
          <motion.a 
            initial="initial"
            whileHover="hovered"
            transition="duration"
            className="text-md text-[#fff] bg-[#ec691f] rounded-full uppercase tracking-wider py-3 px-5 relative whitespace-nowrap overflow-hidden flex items-center gap-3 contact-btn" href="/contactus  ">
              <motion.div variants={{initial: {y: 0}, hovered: {y: "-195%"}, duration: 0.5 }}>Contact Us </motion.div>
              <motion.div className='absolute inset-y-6 inset-x-5' variants={{initial: {y: "195%"}, hovered: {y: 0}, duration: 0.5}}>Contact Us</motion.div>
              <div className='bg-white p-3 rounded-full border-2 border-white'>
                <svg width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                  <path stroke="#ec691f" d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z "/>
                  <line x1="0" y1="16" x2="16" y2="16" stroke="#ec691f" strokeWidth="2" />
                </svg>
              </div>
          </motion.a>          
          <ion-icon name="menu" className="text-3xl bg-black cursor-pointer md:hidden" onclick="onToggleMenu(this)"></ion-icon>
        </div>
        </nav>
      </div>
    </header>
    </>
  );
};

export default Header;

