import React, { useState } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Home.css";
import LetsBuild from "../pages/LetsBuild";
import Appointment from "../components/Appointment";

const Home = () => {
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

  const ClientBlock = ({ logo, text, delay }) => {
    const [isHovered, setIsHovered] = useState(false);
  
    return (
      <div 
        className="clients-block-wrap"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          className="clients-block"
          style={{ animationDelay: `${delay}ms` }}
        >
          <img
            src={logo}
            loading="lazy"
            width="210"
            height="58"
            alt=""
            className="clients-logo"
          />
          
          <div className={`clients-text-wrap ${isHovered ? 'active' : ''}`}>
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

      {/* Reviews Section */}
      <section className="section overflow-hidden text-white">
        <div className="container">
          <div className="columns is-heading is-invert-mobile">
            <div className="columns__col mod--heading is-1">
              <div className="reviews__label">
                <img
                  src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/659faade8c491caeb4e43ac5_logo-clutch.svg"
                  loading="lazy"
                  decoding="async"
                  alt=""
                  className="reviews__label-logo"
                />
                <div className="reviews__label-separ"></div>
                <div>80+ REVIEWS</div>
              </div>
            </div>
            <div className="columns__col mod--heading w-clearfix">
              <div className="space-heading-4"></div>
              <p className="heading-4">
                We’ve helped hundreds of partners, ranging from startups to medium-sized businesses to achieve their goals. And stellar feedback — is our reward!
              </p>
            </div>
          </div>
          <div className="columns mod--reviews">
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
                <div className="text-size-80 text-weight-medium">4.9</div>
                <div className="heading-6">Clutch average based on 80+ reviews. All chances are you’ll be impressed too.</div>
                <div className="swiper-nav">
                  <div className="swiper-nav__arrow is-left is-border-white" tabIndex="0" role="button" aria-label="Previous slide">
                    <div className="button__icon-anim">
                      <div className="icon-regular is-size-fixed w-embed">
                        <svg aria-hidden="true" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%">
                          <path d="M9.293 5.293a1 1 0 0 1 1.414 0l6 6a1 1 0 0 1 0 1.414l-6 6a1 1 0 0 1-1.414-1.414L14.586 12 9.293 6.707a1 1 0 0 1 0-1.414Z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-nav__arrow is-border-white" tabIndex="0" role="button" aria-label="Next slide">
                    <div className="button__icon-anim">
                      <div className="icon-regular is-size-fixed w-embed">
                        <svg aria-hidden="true" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%">
                          <path d="M9.293 5.293a1 1 0 0 1 1.414 0l6 6a1 1 0 0 1 0 1.414l-6 6a1 1 0 0 1-1.414-1.414L14.586 12 9.293 6.707a1 1 0 0 1 0-1.414Z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="columns__col is-2-old mod--reviews">
              <div className="swiper mod--reviews">
                <div className="swiper-wrapper">
                  {/* Repeat this block for each review */}
                  <div className="swiper-slide mod--reviews">
                    <div className="reviews__card">
                      <div className="reviews__block">
                        <div className="reviews__rate">
                          <div className="heading-6">5.0</div>
                          <div className="rating">
                            <img src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/63ff2cb2a75a0475348a5685_icon-star.svg" loading="lazy" width="16" height="16" alt="star icon" />
                            <img src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/63ff2cb2a75a0475348a5685_icon-star.svg" loading="lazy" width="16" height="16" alt="star icon" />
                            <img src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/63ff2cb2a75a0475348a5685_icon-star.svg" loading="lazy" width="16" height="16" alt="star icon" />
                            <img src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/63ff2cb2a75a0475348a5685_icon-star.svg" loading="lazy" width="16" height="16" alt="star icon" />
                            <img src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/63ff2cb2a75a0475348a5685_icon-star.svg" loading="lazy" width="16" height="16" alt="star icon" />
                          </div>
                        </div>
                        <p className="text-size-20 text-weight-medium">
                          The client has learned to trust Halo Lab, thanks to their significant knowledge in UI/UX design. The vendor has provided valuable feedback by always being readily available for communication. Moreover, they have a satisfying project management process that makes their process smooth and efficient.
                        </p>
                        <div className="author">
                          <img src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/64d3a1072910d4507a6b5029_review-ava_Atif-Hussain.avif" loading="lazy" width="56" height="56" alt="Atif Hussain avatar" />
                          <div className="author__text-wrap">
                            <div className="text-weight-medium">Atif Hussain</div>
                            <div className="text-size-14 opacity-60">Co-Founder at Kinetik</div>
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
                            <img src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/63ff2cb2a75a0475348a5685_icon-star.svg" loading="lazy" width="16" height="16" alt="star icon" />
                            <img src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/63ff2cb2a75a0475348a5685_icon-star.svg" loading="lazy" width="16" height="16" alt="star icon" />
                            <img src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/63ff2cb2a75a0475348a5685_icon-star.svg" loading="lazy" width="16" height="16" alt="star icon" />
                            <img src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/63ff2cb2a75a0475348a5685_icon-star.svg" loading="lazy" width="16" height="16" alt="star icon" />
                            <img src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/63ff2cb2a75a0475348a5685_icon-star.svg" loading="lazy" width="16" height="16" alt="star icon" />
                          </div>
                        </div>
                        <p className="text-size-20 text-weight-medium">
                          The client has learned to trust Halo Lab, thanks to their significant knowledge in UI/UX design. The vendor has provided valuable feedback by always being readily available for communication. Moreover, they have a satisfying project management process that makes their process smooth and efficient.
                        </p>
                        <div className="author">
                          <img src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/64d3a1072910d4507a6b5029_review-ava_Atif-Hussain.avif" loading="lazy" width="56" height="56" alt="Atif Hussain avatar" />
                          <div className="author__text-wrap">
                            <div className="text-weight-medium">Atif Hussain</div>
                            <div className="text-size-14 opacity-60">Co-Founder at Kinetik</div>
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
                            <img src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/63ff2cb2a75a0475348a5685_icon-star.svg" loading="lazy" width="16" height="16" alt="star icon" />
                            <img src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/63ff2cb2a75a0475348a5685_icon-star.svg" loading="lazy" width="16" height="16" alt="star icon" />
                            <img src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/63ff2cb2a75a0475348a5685_icon-star.svg" loading="lazy" width="16" height="16" alt="star icon" />
                            <img src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/63ff2cb2a75a0475348a5685_icon-star.svg" loading="lazy" width="16" height="16" alt="star icon" />
                            <img src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/63ff2cb2a75a0475348a5685_icon-star.svg" loading="lazy" width="16" height="16" alt="star icon" />
                          </div>
                        </div>
                        <p className="text-size-20 text-weight-medium">
                          The client has learned to trust Halo Lab, thanks to their significant knowledge in UI/UX design. The vendor has provided valuable feedback by always being readily available for communication. Moreover, they have a satisfying project management process that makes their process smooth and efficient.
                        </p>
                        <div className="author">
                          <img src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/64d3a1072910d4507a6b5029_review-ava_Atif-Hussain.avif" loading="lazy" width="56" height="56" alt="Atif Hussain avatar" />
                          <div className="author__text-wrap">
                            <div className="text-weight-medium">Atif Hussain</div>
                            <div className="text-size-14 opacity-60">Co-Founder at Kinetik</div>
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
                            <img src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/63ff2cb2a75a0475348a5685_icon-star.svg" loading="lazy" width="16" height="16" alt="star icon" />
                            <img src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/63ff2cb2a75a0475348a5685_icon-star.svg" loading="lazy" width="16" height="16" alt="star icon" />
                            <img src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/63ff2cb2a75a0475348a5685_icon-star.svg" loading="lazy" width="16" height="16" alt="star icon" />
                            <img src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/63ff2cb2a75a0475348a5685_icon-star.svg" loading="lazy" width="16" height="16" alt="star icon" />
                            <img src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/63ff2cb2a75a0475348a5685_icon-star.svg" loading="lazy" width="16" height="16" alt="star icon" />
                          </div>
                        </div>
                        <p className="text-size-20 text-weight-medium">
                          The client has learned to trust Halo Lab, thanks to their significant knowledge in UI/UX design. The vendor has provided valuable feedback by always being readily available for communication. Moreover, they have a satisfying project management process that makes their process smooth and efficient.
                        </p>
                        <div className="author">
                          <img src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/64d3a1072910d4507a6b5029_review-ava_Atif-Hussain.avif" loading="lazy" width="56" height="56" alt="Atif Hussain avatar" />
                          <div className="author__text-wrap">
                            <div className="text-weight-medium">Atif Hussain</div>
                            <div className="text-size-14 opacity-60">Co-Founder at Kinetik</div>
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

      {/* <Appointment /> */}
      {/* <Footer /> */}
    </>
  );
};

export default Home;