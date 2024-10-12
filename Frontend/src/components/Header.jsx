import React from 'react';
import { color, motion } from 'framer-motion';
import '../styles/Header.css'; // Import custom CSS for additional styling
import Logo from '../assets/logo.png'

const Header = () => {
  return (
    <>
    <header className='py-4 my-4 border-[#ec691f] border-t-2 border-b-2'>
      <div className='container m-auto'>
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
          <ul className="nav-links flex max-md:absolute left-0 top-[-100%] max-md:min-h-[60px] w-full md:flex-row flex-col max-md:gap-4 max-md:p-5">
            <li>
              <motion.a 
                initial="initial"
                whileHover="hovered"
                transition="duration"
                className="text-lg text-[#000] uppercase tracking-wider font-normal py-2 px-4 relative block whitespace-nowrap overflow-hidden" href="#">
                <motion.div variants={{initial: {y: 0}, hovered: {y: "-120%"}, duration: 0.5 }}>About Us</motion.div>
                <motion.div className='absolute inset-y-2 inset-x-4 hover:text-[#ec691f]' variants={{initial: {y: "120%"}, hovered: {y: 0}, duration: 0.5}}>About Us</motion.div>
              </motion.a>
            </li>
            <li>
              <motion.a 
                initial="initial"
                whileHover="hovered"
                transition="duration"
                className="text-lg text-[#000] uppercase tracking-wider font-normal py-2 px-4 relative block whitespace-nowrap overflow-hidden" href="#">
                <motion.div variants={{initial: {y: 0}, hovered: {y: "-120%"}, duration: 0.5 }}>Services</motion.div>
                <motion.div className='absolute inset-y-2 inset-x-4 hover:text-[#ec691f]' variants={{initial: {y: "120%"}, hovered: {y: 0}, duration: 0.5}}>Services</motion.div>
              </motion.a>
            </li>
            <li>
              <motion.a 
                initial="initial"
                whileHover="hovered"
                transition="duration"
                className="text-lg text-[#000] uppercase tracking-wider font-normal py-2 px-4 relative block whitespace-nowrap overflow-hidden" href="#">
                <motion.div variants={{initial: {y: 0}, hovered: {y: "-120%"}, duration: 0.5 }}>Blog</motion.div>
                <motion.div className='absolute inset-y-2 inset-x-4 hover:text-[#ec691f]' variants={{initial: {y: "120%"}, hovered: {y: 0}, duration: 0.5}}>Blog</motion.div>
              </motion.a>
            </li>
            <li>
              <motion.a 
                initial="initial"
                whileHover="hovered"
                transition="duration"
                className="text-lg text-[#000] uppercase tracking-wider font-normal py-2 px-4 relative block whitespace-nowrap overflow-hidden" href="#">
                <motion.div variants={{initial: {y: 0}, hovered: {y: "-120%"}, duration: 0.5 }}>Contact Us</motion.div>
                <motion.div className='absolute inset-y-2 inset-x-4 hover:text-[#ec691f]' variants={{initial: {y: "120%"}, hovered: {y: 0}, duration: 0.5}}>Contact Us</motion.div>
              </motion.a>
            </li>
          </ul>
        </div>
        <div className='flex gap-6 items-center'>
          <motion.a 
            initial="initial"
            whileHover="hovered"
            transition="duration"
            className="text-lg text-[#fff] bg-[#ec691f] rounded-full uppercase tracking-wider font-normal py-3 px-5 relative block whitespace-nowrap overflow-hidden" href="#">
              <motion.div variants={{initial: {y: 0}, hovered: {y: "-120%"}, duration: 0.5 }}>Get Started</motion.div>
              <motion.div className='absolute inset-y-3 inset-x-5' variants={{initial: {y: "120%"}, hovered: {y: 0}, duration: 0.5}}>Get Started</motion.div>
          </motion.a>
          {/* <a href='#' className='btn btn-orange get-started'>Get Started</a> */}
          <ion-icon name="menu" className="text-3xl bg-black cursor-pointer md:hidden" onclick="onToggleMenu(this)"></ion-icon>
        </div>
        </nav>
      </div>
    </header>
    </>
  );
};

export default Header;

