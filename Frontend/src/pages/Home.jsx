// import React from 'react';
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import { motion, useTransform, useScroll } from "framer-motion";
import React from "react";
import Appointment from "../components/Appointment";
// import '../App.css'; // Adjust the path based on your project structure

const ScrollAnimation = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};

const Home = () => {
  const { scrollY } = useScroll();
  const color = useTransform(scrollY, [0, 250], ["#F2F2F2", "#000000"]);

  const text =
    "Over the past 10 years, we’ve perfected our Design & Development game and are eager to help passionate Founders perfect theirs. Success is a team play, right? Let’s aim for the top together!";

  return (
    <>
      <Header />
      <Hero />
      <div
        style={{ padding: "2em", fontSize: "60px" }}
        className="component-wrapper"
      >
        <ScrollAnimation>
          <motion.div style={{ color }}>
            {/* {text.split("").map((char, index) => (
              <span key={index} style={{ display: "inline-block" }}>
                {char}
              </span>
            ))} */}
          </motion.div>
        </ScrollAnimation>
      </div>
      {/* <Appointment /> */}
      {/* <Footer /> */}
    </>
  );
};

export default Home;
