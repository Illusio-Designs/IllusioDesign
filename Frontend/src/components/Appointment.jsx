import React, { useState } from "react";
import { createPublicAppointment } from "../utils/api";
import { motion } from "framer-motion";
import "./Appointment.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const Appointment = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNo: "",
    country: "in", // Default country code
    budget: "",
    message: "",
    appointmentDate: new Date().toISOString().slice(0, 10),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (phone, countryData) => {
    console.log("Phone:", phone); // Log the phone number
    console.log("Country Data:", countryData); // Log country data to check values
    console.log("Country ISO2:", countryData.iso2); // Log the ISO2 code specifically
    setFormData((prev) => ({
      ...prev,
      mobileNo: phone,
      country: countryData.iso2 || "in", // Capture the country code (ISO 3166-1 alpha-2), default to 'in' if undefined
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData); // Log the form data to check values
    try {
      await createPublicAppointment(formData); // Ensure formData includes country
      alert("Appointment created successfully!");
      setFormData({
        fullName: "",
        email: "",
        mobileNo: "",
        country: "in", // Reset to default country code
        budget: "",
        message: "",
        appointmentDate: new Date().toISOString().slice(0, 10),
      });
    } catch (error) {
      console.error("Error creating appointment:", error);
      alert("Failed to create appointment. Please try again.");
    }
  };

  return (
    <section id="discuss" className="discuss-section mod--discuss text-white">
      <div className="container mod--discuss">
        <div className="discuss-card">
          <div className="discuss__text-wrap">
            <div className="heading-3 is--h4-mobile">
              Ready to discuss
              <br />
              your project with us?
            </div>
            <div className="discuss__text">
              Let’s talk about how we can craft a user experience that not only
              looks great but drives real growth for your product.
            </div>
            <div className="flex gap-6 items-center">
              <motion.a
                initial="initial"
                whileHover="hovered"
                transition={{ duration: 0.5 }}
                className="text-md text-[#FFF] bg-[#ec691f] rounded-full uppercase tracking-wider py-3 px-5 relative whitespace-nowrap overflow-hidden flex items-center gap-3 contact-btn"
                href="/contactus"
              >
                {/* Normal Text */}
                <motion.div
                  variants={{ initial: { y: 0 }, hovered: { y: "-195%" } }}
                >
                  BOOK A CALL
                </motion.div>

                {/* Hover Text */}
                <motion.div
                  className="btn absolute inset-y-1 left-[-15px]"
                  variants={{ initial: { y: "195%" }, hovered: { y: 0 } }}
                >
                  BOOK A CALL
                </motion.div>

                {/* Icon with Fixed Border */}
                <div className="p-3 rounded-full border-2 border-white flex items-center justify-center relative overflow-hidden w-[40px] h-[40px]">
                  {/* Normal Icon */}
                  <motion.div
                     className="absolute bg-white flex items-center justify-center w-full h-full"
                    variants={{ initial: { x: 0 }, hovered: { x: "195%" } }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="#ec691f"
                      className="bi bi-calendar4"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
                    </svg>
                  </motion.div>

                  {/* Hover Icon */}
                  <motion.div
                     className="absolute bg-transparent flex items-center justify-center w-full h-full"
                    variants={{ initial: { x: "-190%" }, hovered: { x: 0 } }}
                  >
                     <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="#ffffff"
                      className="bi bi-calendar4"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
                    </svg>
                  </motion.div>
                </div>
              </motion.a>
            </div>
          </div>
        </div>

        <div className="container">
          <div data-swiper="runawards" className="swiper mod--runawards">
            <div className="swiper-wrapper mod--runawards">
              <div className="swiper-slide mod--runawards">
                <img
                  src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/66e0344627580704633cecfb_award-color-clutch.svg"
                  loading="lazy"
                  alt=""
                  className="runawards__img"
                />
                <div className="runawards__text">
                  4.9 AVG. SCORE
                  <br />
                  Based on 80+ reviews
                </div>
              </div>
              <div className="swiper-slide mod--runawards">
                <img
                  src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/66d9d649ca478502f2b11fc1_award-color-upwork.svg"
                  loading="lazy"
                  alt=""
                  className="runawards__img"
                />
                <div className="runawards__text">
                  TOP RATED COMPANY <br />
                  with 100% Job Success
                </div>
              </div>
              <div className="swiper-slide mod--runawards">
                <img
                  src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/66d9d649c65781f52fc3f9ff_award-color-sortlist.svg"
                  loading="lazy"
                  alt=""
                  className="runawards__img"
                />
                <div className="runawards__text">
                  FEATURED Web Design
                  <br />
                  AgencY IN UAE
                </div>
              </div>
              <div className="swiper-slide mod--runawards">
                <img
                  src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/66e41801230bc5baa05c898b_award-color-dribbble.svg"
                  loading="lazy "
                  alt=""
                  className="runawards__img"
                />
                <div className="runawards__text">
                  TOP DESIGN AGENCY
                  <br />
                  WORLDWIDE
                </div>
              </div>
            </div>
          </div>
          <div className="discuss__bg-wrap">
            <img
              className="discuss__bg-spin"
              src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/67333c3b3a53afcafb3be763_bg-discuss.avif"
              alt=""
              decoding="async"
              sizes="100vw"
              loading="lazy"
              srcSet="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/67333c3b3a53afcafb3be763_bg-discuss-p-500.avif 500w, https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/67333c3b3a53afcafb3be763_bg-discuss-p-800.avif 800w, https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/67333c3b3a53afcafb3be763_bg-discuss-p-1080.avif 1080w, https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/67333c3b3a53afcafb3be763_bg-discuss.avif 3474w"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Appointment;
