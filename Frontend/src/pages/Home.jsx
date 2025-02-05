import React, { useState, useRef } from "react";
import Header from "../components/Header";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import "../styles/Home.css";
import Logo from "../assets/logo.png";
import infinity from "../Images/Animation - 1738668026746.gif";
import LetsBuild from "../pages/LetsBuild";
import Appointment from "../components/Appointment";

const Home = () => {
  const swiperRef = useRef(null);

  const services = [
    {
      id: 1,
      icon: "https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/64f852beac4d6ff134432f2b_icon-services-research.svg",
      title: "Discovery",
      text: "To lay a solid foundation for the creative process that follows, we begin our journey with the discovery phase.",
      link: "/services/product-research",
    },
    {
      id: 2,
      icon: "https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/640744d0e7b29de6f1a29aee_icon-services-design.svg",
      title: "Design",
      text: "By putting users' needs at the forefront, we tell a unique story of your company, juggling with fancy visual elements.",
      link: "/services/design",
    },
    {
      id: 3,
      icon: "https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/6449421486eae3cf4d387564_development-Illustration.svg",
      title: "Development",
      text: "The motto of our development process is creating digital experiences that are both appealing and functional.",
      link: "/services/development",
    },
    {
      id: 4,
      icon: "https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/6449410877257b6dcfa0ec88_marketing-illustration.svg",
      title: "Marketing",
      text: "With various tools, our experts can help you expand the target audience and increase brand awareness.",
      link: "/services/marketing",
    },
  ];

  const clients = [
    {
      id: 1,
      logo: "https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/66e844f2e9b1d3049fe2148d_logo-clients_nokia.svg",
      text: "Collaborating on a strategic development initiative to enhance Nokia's technology solutions.",
      delay: "0",
    },
    {
      id: 2,
      logo: "https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/66e8452b751e5942102f81fb_logo-clients_homeq.svg",
      text: "Enhancing digital presence and engagement through our tailored web and marketing strategies.",
      delay: "50",
    },
    {
      id: 3,
      logo: "https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/66e844f3803d0b37eb38e9ac_logo-clients_opera.svg",
      text: "Refining brand manuals and design assets for a leading browser company.",
      delay: "100",
    },
    {
      id: 4,
      logo: "https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/66e844f322e6a2d7d216b2ba_logo-clients_creativemarket.svg",
      text: "Online marketplace that provides a platform for creators to buy and sell design assets.",
      delay: "150",
    },
    {
      id: 5,
      logo: "https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/66e844f30195c1e223785de7_logo-clients_oppo.svg",
      text: "Designing mobile concepts for a popular brand in electronic products.",
      delay: "200",
    },
    {
      id: 6,
      logo: "https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/66e844f31782d230793f2c5f_logo-clients_auth0.svg",
      text: "Using our expertise to boost Auth0 processes.",
      delay: "250",
    },
    {
      id: 7,
      logo: "https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/66e844f34e3fd67eb1bc5bb2_logo-clients_corel.svg",
      text: "Showcasing a future vision for WinZip family products.",
      delay: "300",
    },
  ];

  const scrollAmount = 300;

  const scrollLeft = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollLeft -= scrollAmount;
    }
  };

  const scrollRight = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollLeft += scrollAmount;
    }
  };

  const ClientBlock = ({ logo, text, delay }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div
        className="clients-block-wrap"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="clients-block" style={{ animationDelay: `${delay}ms` }}>
          <img
            src={logo}
            loading="lazy"
            width="210"
            height="58"
            alt=""
            className="clients-logo"
          />

          <div className={`clients-text-wrap ${isHovered ? "active" : ""}`}>
            <div className="clients-text">{text}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      <LetsBuild />
      <div className="overview">
        <div className="people">
          <img
            src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/64c90175fe3bf5e15444ddcf_ava-founders.avif"
            loading="lazy"
            height=""
            width="158"
            alt="halolab founders"
            decoding="async"
            className="awards__founders-ava"
          />
          FOUNDERS of Illusio Designs
        </div>
        <div className="pg">
          <p>
            Over the past 10 years, we’ve perfected our Design & Development
            game and are eager to help passionate Founders perfect theirs.
            Success is a team play, right? Let’s aim for the top together!
          </p>
        </div>
      </div>

      <div className="awards-container">
        <div
          data-glow-container=""
          data-swiper="awards-runline"
          className="swiper mod--awards"
        >
          <div className="swiper-wrapper mod--awards">
            <div className="swiper-slide mod--awards">
              <div data-hover="" className="circles__block-wrap">
                <div className="circles__block">
                  <img
                    src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/65df22453a88d0237804696b_award-dribbble.svg"
                    alt="Top Team in the world on Dribbble"
                    className="circles__logo"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="circles__border">
                    <div
                      data-glow=""
                      data-mask="awards"
                      className="circles__border-anim"
                    ></div>
                  </div>
                  <div className="circles__text">
                    Top Team in the world on Dribbble
                  </div>
                </div>
              </div>
            </div>

            <div className="swiper-slide mod--awards">
              <div data-hover="" className="circles__block-wrap">
                <div className="circles__block">
                  <img
                    src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/65df2245169d0dbda30cc38c_award-clutch.svg"
                    alt="Top 100 Global Service Providers by Clutch"
                    className="circles__logo"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="circles__text">
                    Top 100 Global Service Providers by Clutch
                  </div>
                  <div data-hover-elem="" className="circles__border">
                    <div
                      data-glow=""
                      data-mask="awards"
                      className="circles__border-anim"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="swiper-slide mod--awards">
              <div data-hover="" className="circles__block-wrap">
                <div className="circles__block">
                  <img
                    src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/65df2245d0569f8fce1a81c6_award-5stars.svg"
                    alt="5 Stars Rating on GoodFirms"
                    className="circles__logo"
                    loading="lazy"
                    decoding="async"
                  />
                  <div data-hover-elem="" className="circles__border">
                    <div
                      data-glow=""
                      data-mask="awards"
                      className="circles__border-anim"
                    ></div>
                  </div>
                  <div className="circles__text">
                    5 Stars Rating on GoodFirms
                  </div>
                </div>
              </div>
            </div>

            <div className="swiper-slide mod--awards">
              <div data-hover="" className="circles__block-wrap">
                <div className="circles__block">
                  <img
                    src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/65df2248b0570f11feddea87_award-upwork.svg"
                    alt="100% Job Success on Upwork"
                    className="circles__logo"
                    loading="lazy"
                    decoding="async"
                  />
                  <div data-hover-elem="" className="circles__border">
                    <div
                      data-glow=""
                      data-mask="awards"
                      className="circles__border-anim"
                    ></div>
                  </div>
                  <div className="circles__text">
                    100% Job Success on Upwork
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="services-section">
        <div className="services-container">
          <div className="services-header">
            <div className="services-title">
              <h2>OUR SERVICES</h2>
            </div>
          </div>

          <ul className="services-list">
            {services.map((service) => (
              <li key={service.id} className="services-item">
                <a href={service.link} className="service-link">
                  <div className="service-icon-wrap">
                    <img
                      src={service.icon}
                      alt={`${service.title} icon`}
                      className="service-icon"
                    />
                    <div className="service-button">
                      <div className="button-icon">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            d="M6 18L18 6M9 6H18V15"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="service-content">
                    <h3 className="service-title">{service.title}</h3>
                    <p className="service-text">{service.text}</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container overflow-hidden">
          <div className="grid grid-cols-4 gap-6 relative items-center">
            {clients.map((client) => (
              <ClientBlock key={client.id} {...client} />
            ))}

            <div className="clients-block-wrap">
              <div
                className="clients-block mod-globus"
                style={{ animationDelay: "350ms" }}
              >
                <div className="clients-video pointer-events-none">
                  <video
                    className="w-full h-full"
                    loop
                    muted
                    playsInline
                    autoPlay
                  >
                    <source
                      src="https://d3vlq52qrgdnc2.cloudfront.net/Home-Page-Earth.mp4"
                      type="video/mp4"
                    />
                  </video>
                </div>
                <div className="text-center mt-4">
                  <span className="font-medium">500+</span> clients worldwide
                </div>
              </div>
            </div>

            {/* Grid Lines */}
            <div className="absolute w-full h-full pointer-events-none">
              <div className="line1 absolute w-full border-t border-gray-600"></div>
              <div className="line2 absolute h-full border-l border-gray-600"></div>
              <div className="line3 absolute h-full border-l border-gray-600"></div>
              <div className="line4 absolute h-full border-l border-gray-600"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section overflow-hidden text-white">
        <div className="container">
          <div className="columns is-heading is-invert-mobile clutch-container">
            <div className="columns__col mod--heading is-1 info-content">
              <div className="reviews__label">
                <img
                  src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/659faade8c491caeb4e43ac5_logo-clutch.svg"
                  loading="lazy"
                  decoding="async"
                  alt=""
                  className="reviews__label-logo"
                />
                <div className="reviews__label-separ">|</div>
                <div className="review-count">80+ REVIEWS</div>
              </div>
            </div>
            <div className="columns__col mod--heading w-clearfix">
              <p className="heading-4">
                We’ve helped hundreds of partners, ranging from startups to
                medium-sized businesses to achieve their goals. And stellar
                feedback — is our reward!
              </p>
            </div>
          </div>
          <div className="columns mod--reviews reviews-container">
            <div className="columns__col is-1-old mod--reviews">
              <div className="reviews__man-wrap">
                <img
                  src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/6596ea8404d31b14e01e406f_reviews-man.avif"
                  loading="lazy"
                  decoding="async"
                  width="380"
                  alt=""
                  className="reviews__man"
                />
              </div>
              <div className="reviews__desc">
                <div className="number">4.9</div>
                <div className="heading-6">
                  Clutch average based on 80+ reviews. All chances are you’ll be
                  impressed too.
                </div>
                <div className="swiper-nav">
                  <motion.a
                    initial="initial"
                    whileHover="hovered"
                    transition={{ duration: 0.5 }}
                    className="nav-arrow left relative block overflow-hidden"
                    onClick={scrollLeft}
                  >
                    <motion.div
                      variants={{ initial: { x: 0 }, hovered: { x: "-120%" } }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        className="bi bi-chevron-left"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                        />
                      </svg>
                    </motion.div>

                    <motion.div
                      variants={{ initial: { x: "120%" }, hovered: { x: 0 } }}
                      className="absolute inset-0 flex items-center justify-center hover:bg-[#ec691f] text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        className="bi bi-chevron-left"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                        />
                      </svg>
                    </motion.div>
                  </motion.a>

                  {/* Right Arrow Button */}
                  <motion.a
                    initial="initial"
                    whileHover="hovered"
                    transition={{ duration: 0.5 }}
                    className="nav-arrow right relative block overflow-hidden"
                    onClick={scrollRight}
                  >
                    <motion.div
                      variants={{ initial: { x: 0 }, hovered: { x: "120%" } }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        className="bi bi-chevron-right"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
                        />
                      </svg>
                    </motion.div>

                    <motion.div
                      variants={{ initial: { x: "-120%" }, hovered: { x: 0 } }}
                      className="absolute inset-0 flex items-center justify-center hover:bg-[#ec691f] text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        className="bi bi-chevron-right"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
                        />
                      </svg>
                    </motion.div>
                  </motion.a>
                </div>
              </div>
            </div>
            <div className="columns__col is-2-old mod--reviews text-black">
              <div className="swiper mod--reviews">
                <div className="swiper-wrapper" ref={swiperRef}>
                  {/* Repeat this block for each review */}
                  <div className="swiper-slide mod--reviews">
                    <div className="reviews__card">
                      <div className="reviews__block">
                        <div className="reviews__rate">
                          <div className="heading-6">5.0</div>
                          <div className="rating">
                            <img
                              src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/63ff2cb2a75a0475348a5685_icon-star.svg"
                              loading="lazy"
                              width="16"
                              height="16"
                              alt="star icon"
                            />
                            <img
                              src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/63ff2cb2a75a0475348a5685_icon-star.svg"
                              loading="lazy"
                              width="16"
                              height="16"
                              alt="star icon"
                            />
                            <img
                              src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/63ff2cb2a75a0475348a5685_icon-star.svg"
                              loading="lazy"
                              width="16"
                              height="16"
                              alt="star icon"
                            />
                            <img
                              src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/63ff2cb2a75a0475348a5685_icon-star.svg"
                              loading="lazy"
                              width="16"
                              height="16"
                              alt="star icon"
                            />
                            <img
                              src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/63ff2cb2a75a0475348a5685_icon-star.svg"
                              loading="lazy"
                              width="16"
                              height="16"
                              alt="star icon"
                            />
                          </div>
                        </div>
                        <hr />
                        <p className="feedback text-size-20 text-weight-medium">
                          The client has learned to trust Halo Lab, thanks to
                          their significant knowledge in UI/UX design. The
                          vendor has provided valuable feedback by always being
                          readily available for communication. Moreover, they
                          have a satisfying project management process that
                          makes their process smooth and efficient.
                        </p>
                        <div className="author">
                          <div className="author__text-wrap">
                            <div className="text-weight-medium">
                              Atif Hussain
                            </div>
                            <div className="text-size-14 opacity-60">
                              Co-Founder at Kinetik
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide mod--reviews">
                    <div className="reviews__card">
                      <div className="reviews__block">
                        <div className="reviews__rate">
                          <div className="heading-6">5.0</div>
                          <div className="rating">
                            <img
                              src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/63ff2cb2a75a0475348a5685_icon-star.svg"
                              loading="lazy"
                              width="16"
                              height="16"
                              alt="star icon"
                            />
                            <img
                              src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/63ff2cb2a75a0475348a5685_icon-star.svg"
                              loading="lazy"
                              width="16"
                              height="16"
                              alt="star icon"
                            />
                            <img
                              src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/63ff2cb2a75a0475348a5685_icon-star.svg"
                              loading="lazy"
                              width="16"
                              height="16"
                              alt="star icon"
                            />
                            <img
                              src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/63ff2cb2a75a0475348a5685_icon-star.svg"
                              loading="lazy"
                              width="16"
                              height="16"
                              alt="star icon"
                            />
                            <img
                              src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/63ff2cb2a75a0475348a5685_icon-star.svg"
                              loading="lazy"
                              width="16"
                              height="16"
                              alt="star icon"
                            />
                          </div>
                        </div>
                        <hr />
                        <p className="feedback text-size-20 text-weight-medium">
                          The client has learned to trust Halo Lab, thanks to
                          their significant knowledge in UI/UX design. The
                          vendor has provided valuable feedback by always being
                          readily available for communication. Moreover, they
                          have a satisfying project management process that
                          makes their process smooth and efficient.
                        </p>
                        <div className="author">
                          <div className="author__text-wrap">
                            <div className="text-weight-medium">
                              Atif Hussain
                            </div>
                            <div className="text-size-14 opacity-60">
                              Co-Founder at Kinetik
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide mod--reviews">
                    <div className="reviews__card">
                      <div className="reviews__block">
                        <div className="reviews__rate">
                          <div className="heading-6">5.0</div>
                          <div className="rating">
                            <img
                              src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/63ff2cb2a75a0475348a5685_icon-star.svg"
                              loading="lazy"
                              width="16"
                              height="16"
                              alt="star icon"
                            />
                            <img
                              src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/63ff2cb2a75a0475348a5685_icon-star.svg"
                              loading="lazy"
                              width="16"
                              height="16"
                              alt="star icon"
                            />
                            <img
                              src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/63ff2cb2a75a0475348a5685_icon-star.svg"
                              loading="lazy"
                              width="16"
                              height="16"
                              alt="star icon"
                            />
                            <img
                              src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/63ff2cb2a75a0475348a5685_icon-star.svg"
                              loading="lazy"
                              width="16"
                              height="16"
                              alt="star icon"
                            />
                            <img
                              src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/63ff2cb2a75a0475348a5685_icon-star.svg"
                              loading="lazy"
                              width="16"
                              height="16"
                              alt="star icon"
                            />
                          </div>
                        </div>
                        <hr />
                        <p className="feedback text-size-20 text-weight-medium">
                          The client has learned to trust Halo Lab, thanks to
                          their significant knowledge in UI/UX design. The
                          vendor has provided valuable feedback by always being
                          readily available for communication. Moreover, they
                          have a satisfying project management process that
                          makes their process smooth and efficient.
                        </p>
                        <div className="author">
                          <div className="author__text-wrap">
                            <div className="text-weight-medium">
                              Atif Hussain
                            </div>
                            <div className="text-size-14 opacity-60">
                              Co-Founder at Kinetik
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Repeat for more reviews */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* work section pending*/}

      <section className="benefits-section mod--benefits text-white">
        <div className="container">
          <h2>OUR BENEFITS</h2>
          <div className="columns mod--benefits">
            <div className="columns__col mod--benefits is-1">
              <div className="benefits__block is--slider">
                <div className="benefits__slider-wrap">
                  <div className="benefits__top is--logo">
                    <img
                      src={Logo}
                      alt="Illusio Designs"
                      className="img-fluid"
                      width="80%"
                    />
                  </div>
                  <div className="swiper mod--benefits">
                    <div className="swiper-wrapper">
                      <div className="swiper-slide mod--benefits">
                        <p className="heading-6">
                          Our team consists of skilled developers and designers
                          who create immersive and pleasant experiences.
                        </p>
                      </div>
                      {/* <div className="swiper-slide mod--benefits">
                      <p className="heading-6">
                        We offer a diverse range of products and services across various industries to meet your specific needs.
                      </p>
                    </div>
                    <div className="swiper-slide mod--benefits">
                      <p className="heading-6">
                        Working with Halo Lab means boosting your business through cutting-edge technologies.
                      </p>
                    </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="benefits flex">
              <div className="columns__col mod--benefits">
                <div className="benefits__block">
                  <div className="benefits__top">
                    <div className="overflow-hidden">
                      <div className="heading-3 mod--benefits-top">$530M</div>
                      <hr />
                    </div>
                  </div>
                  <div className="benefits__rich w-richtext">
                    <h6>Total funding</h6>
                    <p>
                      Hard work and dedication of the Halo Lab team help our
                      clients secure new successful investment deals.
                    </p>
                  </div>
                </div>
              </div>

              <div className="columns__col mod--benefits">
                <div className="benefits__block is--long">
                  <div className="benefits__top">
                    <div className="overflow-hidden">
                      <div className="heading-3 mod--benefits-top">500+</div>
                      <hr />
                    </div>
                  </div>
                  <div className="benefits__rich w-richtext">
                    <h6>Completed projects</h6>
                    <p>
                      With our exceptional approach to every project, we bring
                      the dream projects of our clients to life.
                    </p>
                  </div>
                </div>
              </div>

              <div className="columns__col mod--benefits">
                <div className="benefits__block">
                  <div className="benefits__top">
                    <div className="benefits__infinity">
                      <img src={infinity} />
                    </div>
                    <hr />
                  </div>
                  <div className="benefits__rich w-richtext">
                    <h6>Positive vibes</h6>
                    <p>
                      We aim to provide the perfect digital solutions for your
                      business, making this process friendly and chill.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section overflow-hidden text-white">
        <div className="post-container mod--post-big">
        <div className="columns is-heading">
      <div className="columns__col mod--heading is-1">
        <div data-hover="" className="button is-white w-inline-block">
          <div className="button__overflow">
            <motion.a
              initial="initial"
              whileHover="hovered"
              transition={{ duration: 0.5 }}
              className="text-md text-[#ffffff] uppercase tracking-wider font-medium relative block whitespace-nowrap overflow-hidden"
              href="/services"
            >
              {/* Text animation */}
              <motion.div
                variants={{
                  initial: { y: 0 },
                  hovered: { y: "-120%" },
                }}
              >
                HOT ARTICLES
              </motion.div>
              <motion.div
                className="absolute inset-y-2 hover:text-[#ec691f]"
                variants={{ initial: { y: "120%" }, hovered: { y: 0 } }}
              >
                HOT ARTICLES
              </motion.div>

              {/* Icon animation */}
              <motion.div
                className="button__icons"
                initial={{ x: 0 }}
                whileHover={{ x: "-120%" }}
                transition={{ duration: 0.1 }}
              >
                <div className="icon-small w-embed">
                  <motion.svg
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentcolor"
                    width="15%"
                  >
                    <path
                      d="M14.6667 2H10.6667C9.95942 2 9.28115 2.28095 8.78105 2.78105C8.28095 3.28115 8 3.95942 8 4.66667V14C8 13.4696 8.21071 12.9609 8.58579 12.5858C8.96086 12.2107 9.46957 12 10 12H14.6667V2Z"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M1.33398 2H5.33398C6.04123 2 6.71951 2.28095 7.2196 2.78105C7.7197 3.28115 8.00065 3.95942 8.00065 4.66667V14C8.00065 13.4696 7.78994 12.9609 7.41486 12.5858C7.03979 12.2107 6.53108 12 6.00065 12H1.33398V2Z"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </motion.svg>
                </div>
              </motion.div>
            </motion.a>
          </div>
        </div>
      </div>

      <div className="columns__col mod--heading w-clearfix">
        <div className="space-heading-4"></div>
        <p className="heading-4">
          The Illusio Designs blog is a treasure trove of our best technical
          tips and expert knowledge. Here you will discover all the valuable
          secrets and trends of the IT industry.
        </p>
      </div>
    </div>
          <div
            data-anim-trigger=""
            data-swiper="posts-big"
            className="swiper mod--post-big"
          >
            <div className="swiper-wrapper mod--post-big">
              <div
                data-anim-delay=""
                className="swiper-slide mod--post-big flex"
              >
                <div className="post-card is-big">
                  <a
                    data-w-id="c8c7cdcd-c50c-68c1-5b85-74bffe10b765"
                    href="/blog/full-guide-to-the-product-development-process"
                    className="post-card__img-link is-big mod--hot w-inline-block"
                  >
                    <div className="post-card__img-wrap is-big">
                      <div
                        data-is-ix2-target="1"
                        className="post-card__img is-lottie"
                        data-w-id="f80d5ae2-6143-88f9-1e8a-2df28b6a47c7"
                        data-animation-type="lottie"
                        data-src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/65536abc87e0315e96c0d7cf_post-01.json"
                        data-loop="0"
                        data-direction="1"
                        data-autoplay="0"
                        data-renderer="svg"
                        data-default-duration="2"
                        data-duration="0"
                        data-ix2-initial-state="0"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 760 655"
                          width="760"
                          height="655"
                          preserveAspectRatio="xMidYMid meet"
                          style={{ width: "100%", height: "100%" }}
                        >
                          <defs>
                            <clipPath id="__lottie_element_6">
                              <rect width="760" height="655" x="0" y="0"></rect>
                            </clipPath>
                            <linearGradient
                              id="__lottie_element_10"
                              spreadMethod="pad"
                              gradientUnits="userSpaceOnUse"
                              x1="33.65399932861328"
                              y1="-57.83000183105469"
                              x2="-27.889999389648438"
                              y2="55.44599914550781"
                            >
                              <stop
                                offset="0%"
                                stopColor="rgb(255,196,66)"
                              ></stop>
                              <stop
                                offset="50%"
                                stopColor="rgb(253,164,43)"
                              ></stop>
                              <stop
                                offset="100%"
                                stopColor="rgb(251,131,21)"
                              ></stop>
                            </linearGradient>
                            <g id="__lottie_element_14">
                              <g
                                transform="matrix(0.9900000095367432,0,0,0.9900000095367432,460.7510070800781,328.82000732421875)"
                                opacity="1"
                                style={{ display: "block" }}
                              >
                                <g opacity="1" transform="matrix(2,0,0,2,0,0)">
                                  <path
                                    fill="url(#__lottie_element_17)"
                                    fillOpacity="1"
                                    d="M0,79.06600189208984 C43.66699981689453,79.06600189208984 79.06600189208984,43.66699981689453 79.06600189208984,0 C79.06600189208984,-43.66699981689453 43.66699981689453,-79.06600189208984 0,-79.06600189208984 C-43.66699981689453,-79.06600189208984 -79.06600189208984,-43.66699981689453 -79.06600189208984,0 C-79.06600189208984,43.66699981689453 -43.66699981689453,79.06600189208984 0,79.06600189208984z"
                                  ></path>
                                </g>
                              </g>
                            </g>
                            <linearGradient
                              id="__lottie_element_17"
                              spreadMethod="pad"
                              gradientUnits="userSpaceOnUse"
                              x1="33.65399932861328"
                              y1="-57.83000183105469"
                              x2="-27.889999389648438"
                              y2="55.44599914550781"
                            >
                              <stop
                                offset="0%"
                                stopColor="rgb(255,196,66)"
                              ></stop>
                              <stop
                                offset="50%"
                                stopColor="rgb(253,164,43)"
                              ></stop>
                              <stop
                                offset="100%"
                                stopColor="rgb(251,131,21)"
                              ></stop>
                            </linearGradient>
                            <mask id="__lottie_element_14_1" mask-type="alpha">
                              <use xlinkHref="#__lottie_element_14"></use>
                            </mask>
                          </defs>
                          <g clipPath="url(#__lottie_element_6)">
                            <g
                              transform="matrix(0.9800000190734863,0,0,0.9800000190734863,460.7510070800781,328.82000732421875)"
                              opacity="1"
                              style={{ display: "block" }}
                            >
                              <g opacity="1" transform="matrix(2,0,0,2,0,0)">
                                <path
                                  fill="url(#__lottie_element_10)"
                                  fillOpacity="1"
                                  d="M0,79.06600189208984 C43.66699981689453,79.06600189208984 79.06600189208984,43.66699981689453 79.06600189208984,0 C79.06600189208984,-43.66699981689453 43.66699981689453,-79.06600189208984 0,-79.06600189208984 C-43.66699981689453,-79.06600189208984 -79.06600189208984,-43.66699981689453 -79.06600189208984,0 C-79.06600189208984,43.66699981689453 -43.66699981689453,79.06600189208984 0,79.06600189208984z"
                                ></path>
                              </g>
                            </g>
                            <g
                              mask="url(#__lottie_element_14_1)"
                              style={{ display: "block" }}
                            >
                              <g
                                transform="matrix(1,0,0,1,380,327.5)"
                                opacity="1"
                              >
                                <g
                                  opacity="1"
                                  transform="matrix(1,0,0,1,-127.5,13.25)"
                                >
                                  <path
                                    fill="rgb(9,20,60)"
                                    fillOpacity="1"
                                    d="M146,-190.25 C146,-190.25 146,190.25 146,190.25 C146,190.25 -146,190.25 -146,190.25 C-146,190.25 -146,-190.25 -146,-190.25 C-146,-190.25 146,-190.25 146,-190.25z"
                                  ></path>
                                </g>
                              </g>
                            </g>
                            <g
                              transform="matrix(1,0,0,1,459.2460021972656,328.822998046875)"
                              opacity="0.75"
                              style={{
                                mixBlendMode: "overlay",
                                display: "block",
                              }}
                            >
                              <g opacity="1" transform="matrix(2,0,0,2,0,0)">
                                <path
                                  fill="rgb(255,255,255)"
                                  fillOpacity="1"
                                  d="M-1.0390000343322754,-39.41699981689453 C-1.0390000343322754,-39.41699981689453 -1.0390000343322754,-39.41699981689453 -1.0390000343322754,-39.41699981689453 C-5.894999980926514,-20.5939998626709 -20.5939998626709,-5.894999980926514 -39.41699981689453,-1.0390000343322754 C-40.4900016784668,-0.7620000243186951 -40.4900016784668,0.7620000243186951 -39.41699981689453,1.0390000343322754 C-20.5939998626709,5.894999980926514 -5.894999980926514,20.5939998626709 -1.0390000343322754,39.41699981689453 C-0.7620000243186951,40.4900016784668 0.7620000243186951,40.4900016784668 1.0390000343322754,39.41699981689453 C5.894999980926514,20.5939998626709 20.5939998626709,5.894999980926514 39.41699981689453,1.0390000343322754 C40.4900016784668,0.7620000243186951 40.4900016784668,-0.7620000243186951 39.41699981689453,-1.0390000343322754 C20.5939998626709,-5.894999980926514 5.894999980926514,-20.5939998626709 1.0390000343322754,-39.41699981689453 C1.0390000343322754,-39.41699981689453 -0.7620000243186951,-40.4900016784668 -1.0390000343322754,-39.41699981689453z"
                                ></path>
                              </g>
                            </g>
                            <g
                              transform="matrix(1,0,0,-1,222.05799865722656,327)"
                              opacity="1"
                              style={{ display: "block" }}
                            >
                              <g opacity="1" transform="matrix(2,0,0,2,0,0)">
                                <path
                                  fill="rgb(9,20,60)"
                                  fillOpacity="1"
                                  d="M39.52899932861328,0 C39.52899932861328,43.66400146484375 4.133999824523926,79.06199645996094 -39.52899932861328,79.06600189208984 C-39.52899932861328,79.06600189208984 -39.52899932861328,-79.06600189208984 -39.52899932861328,-79.06600189208984 C4.133999824523926,-79.06199645996094 39.52899932861328,-43.66400146484375 39.52899932861328,0z"
                                ></path>
                              </g>
                            </g>
                            <g
                              transform="matrix(-1,0,0,-1,382.2929992675781,327.5)"
                              opacity="1"
                              style={{ display: "block" }}
                            >
                              <g opacity="1" transform="matrix(2,0,0,2,0,0)">
                                <path
                                  fill="rgb(9,20,60)"
                                  fillOpacity="1"
                                  d="M-5.232999801635742,-105.01699829101562 C-5.232999801635742,-105.01699829101562 -5.232999801635742,105.01699829101562 -5.232999801635742,105.01699829101562 C-5.232999801635742,107.90699768066406 -2.890000104904175,110.25 0,110.25 C2.890000104904175,110.25 5.232999801635742,107.90699768066406 5.232999801635742,105.01699829101562 C5.232999801635742,105.01699829101562 5.232999801635742,-105.01699829101562 5.232999801635742,-105.01699829101562 C5.232999801635742,-107.90699768066406 2.890000104904175,-110.25 0,-110.25 C0,-110.25 -5.232999801635742,-107.90699768066406 -5.232999801635742,-105.01699829101562z"
                                ></path>
                              </g>
                            </g>
                            <g
                              transform="matrix(-1,0,0,-1,402.7380065917969,327.5069885253906)"
                              opacity="1"
                              style={{ display: "block" }}
                            >
                              <g opacity="1" transform="matrix(2,0,0,2,0,0)">
                                <path
                                  fill="rgb(56,39,199)"
                                  fillOpacity="1"
                                  d="M4.986999988555908,-101.96499633789062 C4.986999988555908,-101.96499633789062 -4.986999988555908,-101.96499633789062 -4.986999988555908,-101.96499633789062 C-4.986999988555908,-101.96499633789062 -4.986999988555908,101.96499633789062 -4.986999988555908,101.96499633789062 C-4.986999988555908,101.96499633789062 4.986999988555908,101.96499633789062 4.986999988555908,101.96499633789062 C4.986999988555908,101.96499633789062 4.986999988555908,-101.96499633789062 4.986999988555908,-101.96499633789062z"
                                ></path>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </div>
                    </div>
                    <div className="post-big__bottom">
                      <h2 className="heading-6">
                        Tech stack for web development: how to arrange it
                        correctly
                      </h2>
                      <div className="post-card__param is--big">
                        <div>Development</div>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="post-card is-big">
                  <a
                    data-w-id="c8c7cdcd-c50c-68c1-5b85-74bffe10b765"
                    href="/blog/full-guide-to-the-product-development-process"
                    className="post-card__img-link is-big mod--hot w-inline-block"
                  >
                    <div className="post-card__img-wrap is-big">
                      <div
                        data-is-ix2-target="1"
                        className="post-card__img is-lottie"
                        data-w-id="f80d5ae2-6143-88f9-1e8a-2df28b6a47c7"
                        data-animation-type="lottie"
                        data-src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/65536abc87e0315e96c0d7cf_post-01.json"
                        data-loop="0"
                        data-direction="1"
                        data-autoplay="0"
                        data-renderer="svg"
                        data-default-duration="2"
                        data-duration="0"
                        data-ix2-initial-state="0"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 760 655"
                          width="760"
                          height="655"
                          preserveAspectRatio="xMidYMid meet"
                          style={{ width: "100%", height: "100%" }}
                        >
                          <defs>
                            <clipPath id="__lottie_element_6">
                              <rect width="760" height="655" x="0" y="0"></rect>
                            </clipPath>
                            <linearGradient
                              id="__lottie_element_10"
                              spreadMethod="pad"
                              gradientUnits="userSpaceOnUse"
                              x1="33.65399932861328"
                              y1="-57.83000183105469"
                              x2="-27.889999389648438"
                              y2="55.44599914550781"
                            >
                              <stop
                                offset="0%"
                                stopColor="rgb(255,196,66)"
                              ></stop>
                              <stop
                                offset="50%"
                                stopColor="rgb(253,164,43)"
                              ></stop>
                              <stop
                                offset="100%"
                                stopColor="rgb(251,131,21)"
                              ></stop>
                            </linearGradient>
                            <g id="__lottie_element_14">
                              <g
                                transform="matrix(0.9900000095367432,0,0,0.9900000095367432,460.7510070800781,328.82000732421875)"
                                opacity="1"
                                style={{ display: "block" }}
                              >
                                <g opacity="1" transform="matrix(2,0,0,2,0,0)">
                                  <path
                                    fill="url(#__lottie_element_17)"
                                    fillOpacity="1"
                                    d="M0,79.06600189208984 C43.66699981689453,79.06600189208984 79.06600189208984,43.66699981689453 79.06600189208984,0 C79.06600189208984,-43.66699981689453 43.66699981689453,-79.06600189208984 0,-79.06600189208984 C-43.66699981689453,-79.06600189208984 -79.06600189208984,-43.66699981689453 -79.06600189208984,0 C-79.06600189208984,43.66699981689453 -43.66699981689453,79.06600189208984 0,79.06600189208984z"
                                  ></path>
                                </g>
                              </g>
                            </g>
                            <linearGradient
                              id="__lottie_element_17"
                              spreadMethod="pad"
                              gradientUnits="userSpaceOnUse"
                              x1="33.65399932861328"
                              y1="-57.83000183105469"
                              x2="-27.889999389648438"
                              y2="55.44599914550781"
                            >
                              <stop
                                offset="0%"
                                stopColor="rgb(255,196,66)"
                              ></stop>
                              <stop
                                offset="50%"
                                stopColor="rgb(253,164,43)"
                              ></stop>
                              <stop
                                offset="100%"
                                stopColor="rgb(251,131,21)"
                              ></stop>
                            </linearGradient>
                            <mask id="__lottie_element_14_1" mask-type="alpha">
                              <use xlinkHref="#__lottie_element_14"></use>
                            </mask>
                          </defs>
                          <g clipPath="url(#__lottie_element_6)">
                            <g
                              transform="matrix(0.9800000190734863,0,0,0.9800000190734863,460.7510070800781,328.82000732421875)"
                              opacity="1"
                              style={{ display: "block" }}
                            >
                              <g opacity="1" transform="matrix(2,0,0,2,0,0)">
                                <path
                                  fill="url(#__lottie_element_10)"
                                  fillOpacity="1"
                                  d="M0,79.06600189208984 C43.66699981689453,79.06600189208984 79.06600189208984,43.66699981689453 79.06600189208984,0 C79.06600189208984,-43.66699981689453 43.66699981689453,-79.06600189208984 0,-79.06600189208984 C-43.66699981689453,-79.06600189208984 -79.06600189208984,-43.66699981689453 -79.06600189208984,0 C-79.06600189208984,43.66699981689453 -43.66699981689453,79.06600189208984 0,79.06600189208984z"
                                ></path>
                              </g>
                            </g>
                            <g
                              mask="url(#__lottie_element_14_1)"
                              style={{ display: "block" }}
                            >
                              <g
                                transform="matrix(1,0,0,1,380,327.5)"
                                opacity="1"
                              >
                                <g
                                  opacity="1"
                                  transform="matrix(1,0,0,1,-127.5,13.25)"
                                >
                                  <path
                                    fill="rgb(9,20,60)"
                                    fillOpacity="1"
                                    d="M146,-190.25 C146,-190.25 146,190.25 146,190.25 C146,190.25 -146,190.25 -146,190.25 C-146,190.25 -146,-190.25 -146,-190.25 C-146,-190.25 146,-190.25 146,-190.25z"
                                  ></path>
                                </g>
                              </g>
                            </g>
                            <g
                              transform="matrix(1,0,0,1,459.2460021972656,328.822998046875)"
                              opacity="0.75"
                              style={{
                                mixBlendMode: "overlay",
                                display: "block",
                              }}
                            >
                              <g opacity="1" transform="matrix(2,0,0,2,0,0)">
                                <path
                                  fill="rgb(255,255,255)"
                                  fillOpacity="1"
                                  d="M-1.0390000343322754,-39.41699981689453 C-1.0390000343322754,-39.41699981689453 -1.0390000343322754,-39.41699981689453 -1.0390000343322754,-39.41699981689453 C-5.894999980926514,-20.5939998626709 -20.5939998626709,-5.894999980926514 -39.41699981689453,-1.0390000343322754 C-40.4900016784668,-0.7620000243186951 -40.4900016784668,0.7620000243186951 -39.41699981689453,1.0390000343322754 C-20.5939998626709,5.894999980926514 -5.894999980926514,20.5939998626709 -1.0390000343322754,39.41699981689453 C-0.7620000243186951,40.4900016784668 0.7620000243186951,40.4900016784668 1.0390000343322754,39.41699981689453 C5.894999980926514,20.5939998626709 20.5939998626709,5.894999980926514 39.41699981689453,1.0390000343322754 C40.4900016784668,0.7620000243186951 40.4900016784668,-0.7620000243186951 39.41699981689453,-1.0390000343322754 C20.5939998626709,-5.894999980926514 5.894999980926514,-20.5939998626709 1.0390000343322754,-39.41699981689453 C1.0390000343322754,-39.41699981689453 -0.7620000243186951,-40.4900016784668 -1.0390000343322754,-39.41699981689453z"
                                ></path>
                              </g>
                            </g>
                            <g
                              transform="matrix(1,0,0,-1,222.05799865722656,327)"
                              opacity="1"
                              style={{ display: "block" }}
                            >
                              <g opacity="1" transform="matrix(2,0,0,2,0,0)">
                                <path
                                  fill="rgb(9,20,60)"
                                  fillOpacity="1"
                                  d="M39.52899932861328,0 C39.52899932861328,43.66400146484375 4.133999824523926,79.06199645996094 -39.52899932861328,79.06600189208984 C-39.52899932861328,79.06600189208984 -39.52899932861328,-79.06600189208984 -39.52899932861328,-79.06600189208984 C4.133999824523926,-79.06199645996094 39.52899932861328,-43.66400146484375 39.52899932861328,0z"
                                ></path>
                              </g>
                            </g>
                            <g
                              transform="matrix(-1,0,0,-1,382.2929992675781,327.5)"
                              opacity="1"
                              style={{ display: "block" }}
                            >
                              <g opacity="1" transform="matrix(2,0,0,2,0,0)">
                                <path
                                  fill="rgb(9,20,60)"
                                  fillOpacity="1"
                                  d="M-5.232999801635742,-105.01699829101562 C-5.232999801635742,-105.01699829101562 -5.232999801635742,105.01699829101562 -5.232999801635742,105.01699829101562 C-5.232999801635742,107.90699768066406 -2.890000104904175,110.25 0,110.25 C2.890000104904175,110.25 5.232999801635742,107.90699768066406 5.232999801635742,105.01699829101562 C5.232999801635742,105.01699829101562 5.232999801635742,-105.01699829101562 5.232999801635742,-105.01699829101562 C5.232999801635742,-107.90699768066406 2.890000104904175,-110.25 0,-110.25 C0,-110.25 -5.232999801635742,-107.90699768066406 -5.232999801635742,-105.01699829101562z"
                                ></path>
                              </g>
                            </g>
                            <g
                              transform="matrix(-1,0,0,-1,402.7380065917969,327.5069885253906)"
                              opacity="1"
                              style={{ display: "block" }}
                            >
                              <g opacity="1" transform="matrix(2,0,0,2,0,0)">
                                <path
                                  fill="rgb(56,39,199)"
                                  fillOpacity="1"
                                  d="M4.986999988555908,-101.96499633789062 C4.986999988555908,-101.96499633789062 -4.986999988555908,-101.96499633789062 -4.986999988555908,-101.96499633789062 C-4.986999988555908,-101.96499633789062 -4.986999988555908,101.96499633789062 -4.986999988555908,101.96499633789062 C-4.986999988555908,101.96499633789062 4.986999988555908,101.96499633789062 4.986999988555908,101.96499633789062 C4.986999988555908,101.96499633789062 4.986999988555908,-101.96499633789062 4.986999988555908,-101.96499633789062z"
                                ></path>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </div>
                    </div>
                    <div className="post-big__bottom">
                      <h2 className="heading-6">
                        Tech stack for web development: how to arrange it
                        correctly
                      </h2>
                      <div className="post-card__param is--big">
                        <div>Development</div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Appointment />
      <Footer />
    </>
  );
};

export default Home;
