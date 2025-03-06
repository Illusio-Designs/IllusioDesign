import React, { useState } from "react";
import "./Footer.css";

const Footer = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    services: false,
    technologies: false,
    industries: false,
  });

  const toggleDropdown = (dropdown) => {
    setIsDropdownOpen((prevState) => ({
      ...prevState,
      [dropdown]: !prevState[dropdown],
    }));
  };

  const socialLinks = [
    {
      platform: "dribbble",
      url: "https://dribbble.com/halolab",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-dribbble"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M8 0C3.584 0 0 3.584 0 8s3.584 8 8 8c4.408 0 8-3.584 8-8s-3.592-8-8-8m5.284 3.688a6.8 6.8 0 0 1 1.545 4.251c-.226-.043-2.482-.503-4.755-.217-.052-.112-.096-.234-.148-.355-.139-.33-.295-.668-.451-.99 2.516-1.023 3.662-2.498 3.81-2.69zM8 1.18c1.735 0 3.323.65 4.53 1.718-.122.174-1.155 1.553-3.584 2.464-1.12-2.056-2.36-3.74-2.551-4A7 7 0 0 1 8 1.18m-2.907.642A43 43 0 0 1 7.627 5.77c-3.193.85-6.013.833-6.317.833a6.87 6.87 0 0 1 3.783-4.78zM1.163 8.01V7.8c.295.01 3.61.053 7.02-.971.199.381.381.772.555 1.162l-.27.078c-3.522 1.137-5.396 4.243-5.553 4.504a6.82 6.82 0 0 1-1.752-4.564zM8 14.837a6.8 6.8 0 0 1-4.19-1.44c.12-.252 1.509-2.924 5.361-4.269.018-.009.026-.009.044-.017a28.3 28.3 0 0 1 1.457 5.18A6.7 6.7 0 0 1 8 14.837m3.81-1.171c-.07-.417-.435-2.412-1.328-4.868 2.143-.338 4.017.217 4.251.295a6.77 6.77 0 0 1-2.924 4.573z"
          />
        </svg>
      ),
      modClassName: "mod--dribble",
    },
    {
      platform: "instagram",
      url: "https://www.instagram.com/illusio_designs/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-instagram"
          viewBox="0 0 16 16"
        >
          <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
        </svg>
      ),
      modClassName: "mod--instagram",
    },
    {
      platform: "behance",
      url: "https://www.instagram.com/halolabteam/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-behance"
          viewBox="0 0 16 16"
        >
          <path d="M4.654 3c.461 0 .887.035 1.278.14.39.07.711.216.996.391s.497.426.641.747c.14.32.216.711.216 1.137 0 .496-.106.922-.356 1.242-.215.32-.566.606-.997.817.606.176 1.067.496 1.348.922s.461.957.461 1.563c0 .496-.105.922-.285 1.278a2.3 2.3 0 0 1-.782.887c-.32.215-.711.39-1.137.496a5.3 5.3 0 0 1-1.278.176L0 12.803V3zm-.285 3.978c.39 0 .71-.105.957-.285.246-.18.355-.497.355-.887 0-.216-.035-.426-.105-.567a1 1 0 0 0-.32-.355 1.8 1.8 0 0 0-.461-.176c-.176-.035-.356-.035-.567-.035H2.17v2.31c0-.005 2.2-.005 2.2-.005zm.105 4.193c.215 0 .426-.035.606-.07.176-.035.356-.106.496-.216s.25-.215.356-.39c.07-.176.14-.391.14-.641 0-.496-.14-.852-.426-1.102-.285-.215-.676-.32-1.137-.32H2.17v2.734h2.305zm6.858-.035q.428.427 1.278.426c.39 0 .746-.106 1.032-.286q.426-.32.53-.64h1.74c-.286.851-.712 1.457-1.278 1.848-.566.355-1.243.566-2.06.566a4.1 4.1 0 0 1-1.527-.285 2.8 2.8 0 0 1-1.137-.782 2.85 2.85 0 0 1-.712-1.172c-.175-.461-.25-.957-.25-1.528 0-.531.07-1.032.25-1.493.18-.46.426-.852.747-1.207.32-.32.711-.606 1.137-.782a4 4 0 0 1 1.493-.285c.606 0 1.137.105 1.598.355.46.25.817.532 1.102.958.285.39.496.851.641 1.348.07.496.105.996.07 1.563h-5.15c0 .58.21 1.11.496 1.396m2.24-3.732c-.25-.25-.642-.391-1.103-.391-.32 0-.566.07-.781.176s-.356.25-.496.39a.96.96 0 0 0-.25.497c-.036.175-.07.32-.07.46h3.196c-.07-.526-.25-.882-.497-1.132zm-3.127-3.728h3.978v.957h-3.978z" />
        </svg>
      ),
      modClassName: "mod--behance",
    },
    {
      platform: "webflow",
      url: "https://www.instagram.com/halolabteam/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 640 512"
        >
          <path
            fill="#ffffff"
            d="M640 64L435.8 463.2H244l85.5-165.5h-3.8C255.1 389.3 149.9 449.5 0 463.2V300.1s95.9-5.7 152.3-64.9H0V64H171.1V204.8l3.8 0L244.9 64H374.3V203.9l3.8 0L450.7 64H640z"
          />
        </svg>
      ),
      modClassName: "mod--webflow",
    },
    {
      platform: "linkedin",
      url: "https://www.linkedin.com/company/illusio-designs/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-linkedin"
          viewBox="0 0 16 16"
        >
          <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
        </svg>
      ),
      modClassName: "mod--linkedin",
    },
    {
      platform: "github",
      url: "https://www.instagram.com/halolabteam/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-github"
          viewBox="0 0 16 16"
        >
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
        </svg>
      ),
      modClassName: "mod--github",
    },
    {
      platform: "npm",
      url: "https://www.instagram.com/halolabteam/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 576 512"
        >
          <path
            fill="#ffffff"
            d="M288 288h-32v-64h32v64zm288-128v192H288v32H160v-32H0V160h576zm-416 32H32v128h64v-96h32v96h32V192zm160 0H192v160h64v-32h64V192zm224 0H352v128h64v-96h32v96h32v-96h32v96h32V192z"
          />
        </svg>
      ),
      modClassName: "mod--npm",
    },
  ];

  const techPartners = [
    {
      name: "clutch",
      url: "https://clutch.co/profile/halo-lab#summary",
      logo: "https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/673f513d63873a54388b12ef_footer-label_clutch.svg",
      text: "80+ REVIEWS",
    },
    {
      name: "clutch",
      url: "https://clutch.co/profile/halo-lab#summary",
      logo: "https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/673f513d63873a54388b12ef_footer-label_clutch.svg",
      text: "80+ REVIEWS",
    },
    {
      name: "clutch",
      url: "https://clutch.co/profile/halo-lab#summary",
      logo: "https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/673f513d63873a54388b12ef_footer-label_clutch.svg",
      text: "80+ REVIEWS",
    },
    {
      name: "clutch",
      url: "https://clutch.co/profile/halo-lab#summary",
      logo: "https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/673f513d63873a54388b12ef_footer-label_clutch.svg",
      text: "80+ REVIEWS",
    },
    {
      name: "clutch",
      url: "https://clutch.co/profile/halo-lab#summary",
      logo: "https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/673f513d63873a54388b12ef_footer-label_clutch.svg",
      text: "80+ REVIEWS",
    },
    {
      name: "clutch",
      url: "https://clutch.co/profile/halo-lab#summary",
      logo: "https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/673f513d63873a54388b12ef_footer-label_clutch.svg",
      text: "80+ REVIEWS",
    },
    {
      name: "clutch",
      url: "https://clutch.co/profile/halo-lab#summary",
      logo: "https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/673f513d63873a54388b12ef_footer-label_clutch.svg",
      text: "80+ REVIEWS",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter form submission
  };

  return (
    <footer className="footer">
      <div className="section mod--footer">
        <div className="container">
          <div className="grid mod--footer">
            {/* Newsletter Form Section */}
            <div className="grid__block is-form">
              <div className="form-wrapper mod--footer">
                <form onSubmit={handleSubmit} className="form mod--footer">
                  <div className="form-subs__content mod--footer">
                    <h2 className="heading-6 mod--footer">
                      Subscribe to our newsletter to stay in touch with the
                      latest.
                    </h2>
                    <div className="input-wrap mod--footer">
                      <input
                        type="email"
                        id="email"
                        className="input mod--footer"
                        placeholder="Your email address"
                        required
                      />
                    </div>
                  </div>
                </form>
              </div>

              {/* Social Links Section */}
              <div className="footer__block">
                <div className="footer__title">Follow us here:</div>
                <div className="social">
                  {socialLinks.map((link, index) => (
                    <a
                      key={`${link.platform}-${index}`}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social__link"
                    >
                      <div className="button__icon-anim">
                        <div className="icon-container">{link.icon}</div>{" "}
                        {/* Wrap each icon */}
                      </div>
                      <div className={`button__bg ${link.modClassName}`}></div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Section */}
            <div className="grid__block is-nav">
              <div className="footer__nav is--main">
                <div className="dropdown-inter mod--footer-nav">
                  <p>
                    Our Services <span>+</span>
                  </p>
                  <p>Projects</p>
                  <p>Dedicated team</p>
                  <p>Open Source</p>
                  <p>Referral Program</p>
                  <p>Contacts</p>
                  <p>Blog</p>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="grid__block is-contacts">
              <div className="footer-contact">
                <div className="footer__block">
                  <div className="footer__title">Drop us a line</div>
                  <div className="footer-contact__links">
                    <a
                      href="mailto:Info@illusiodesigns.agency"
                      className="footer-contact__link"
                    >
                      Info@illusiodesigns.agency
                    </a>
                  </div>
                </div>
                <div className="footer__block">
                  <div className="footer__title">Call us</div>
                  <div className="footer-contact__links">
                    <a
                      href="https://wa.me/7600046416"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-contact__link"
                    >
                      <img
                        src="https://cdn.prod.website-files.com/63f38a8c92397a024fcb9ae8/63f8ed7e51bcb49b284c6e1e_icon-whatsapp.svg"
                        alt="whatsapp"
                        className="icon-regular"
                      />
                      +91 76000 46416
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tech Partners Section */}
          <div className="grid__block is-logos">
            <div className="footer-tech">
              {techPartners.map((partner, index) => (
                <a
                  key={`${partner.name}-${index}`}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-tech__link"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="footer-tech__img"
                  />
                  <div className="footer-tech__text">
                    <div className="button__overflow">
                      <div className="button__texts">
                        <div className="button__text opacity-0">
                          {partner.text}
                        </div>
                        <div className="button__text is-absolute">
                          {partner.text}
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Dropdown Footer*/}
          <div className="footer__dropdowns">
            <div
              data-hover="false"
              data-delay="0"
              className="dropdown-inter mod--footer w-dropdown"
              style={{}}
            >
              <div
                className="dropdown__toggle mod--footer w-dropdown-toggle"
                id="w-dropdown-toggle-4"
                aria-controls="w-dropdown-list-4"
                aria-haspopup="menu"
                aria-expanded={isDropdownOpen.services}
                role="button"
                tabIndex="0"
                onClick={() => toggleDropdown("services")}
              >
                <div className="dropdown__title-wrap">
                  <div className="text-color-white">Show all services</div>
                </div>
                <div className="dropdown__icon-wrap">
                  <div data-dropdown-plus="" className="dropdown__icons">
                    <div className="dropdown__icon is-open w-embed"
                      style={{
                        display: isDropdownOpen.services ? "none" : "block",
                      }}
                    >
                      <svg
                        aria-hidden="true"
                        role="img"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="100%"
                        height="100%"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 4a1 1 0 0 1 1 1v14a1 1 0 1 1-2 0V5a1 1 0 0 1 1-1Z"
                          clipRule="evenodd"
                        ></path>
                        <path
                          fillRule="evenodd"
                          d="M4 12a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1Z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <div className="dropdown__icon is-close w-embed"
                      style={{
                        display: isDropdownOpen.services ? "block" : "none",
                      }}
                    >
                      <svg
                        aria-hidden="true"
                        role="img"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="100%"
                        height="100%"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 12a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1Z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div className="button__bg bg-color-white"></div>
                </div>
              </div>
              <nav
                className={`dropdown__list is-inter w-dropdown-list ${
                  isDropdownOpen.services ? "is-open" : ""
                }`}
                id="w-dropdown-list-4"
                aria-labelledby="w-dropdown-toggle-4"
                style={{
                  width: "100%",
                  height: isDropdownOpen.services ? "auto" : "0px",
                }}
              >
                <div className="dropdown__content mod--footer-serv">
                  <div className="footer-serv__block">
                    <div className="text-size-14 letter-spacing-005 text-style-allcaps">
                      DESIGN
                    </div>
                    <ul
                      role="list"
                      className="footer-serv__list w-list-unstyled"
                    >
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/website-design-services"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">Web Design</div>
                              <div className="button__text is-absolute">
                                Web Design
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/ui-ux-design"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">UI/UX Design</div>
                              <div className="button__text is-absolute">
                                UI/UX Design
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/responsive-website-design"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                Responsive Web Design
                              </div>
                              <div className="button__text is-absolute">
                                Responsive Web Design
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/mobile-application-design-services"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                Mobile App Design
                              </div>
                              <div className="button__text is-absolute">
                                Mobile App Design
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/landing"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                Landing Website Design
                              </div>
                              <div className="button__text is-absolute">
                                Landing Website Design
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/saas-website-design"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                Saas Website Design
                              </div>
                              <div className="button__text is-absolute">
                                Saas Website Design
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/branding"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                Branding for Startups
                              </div>
                              <div className="button__text is-absolute">
                                Branding for Startups
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/all/website-redesign"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                Website redesign
                              </div>
                              <div className="button__text is-absolute">
                                Website redesign
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/all/rebranding"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">Rebranding</div>
                              <div className="button__text is-absolute">
                                Rebranding
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="footer-serv__block">
                    <div className="text-size-14 letter-spacing-005 text-style-allcaps">
                      Development
                    </div>
                    <ul
                      role="list"
                      className="footer-serv__list w-list-unstyled"
                    >
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/software-product-development"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                Software Product Development
                              </div>
                              <div className="button__text is-absolute">
                                Software Product Development
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/web-development-services"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                Web Development
                              </div>
                              <div className="button__text is-absolute">
                                Web Development
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/cms-development"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                CMS Development
                              </div>
                              <div className="button__text is-absolute">
                                CMS Development
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/all/mvp-development"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                MVP development
                              </div>
                              <div className="button__text is-absolute">
                                MVP development
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/all/web-application-development"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                Web application development
                              </div>
                              <div className="button__text is-absolute">
                                Web application development
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/all/mobile-app-development"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                Mobile app development
                              </div>
                              <div className="button__text is-absolute">
                                Mobile app development
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/back-end-development-services"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                Back-end development
                              </div>
                              <div className="button__text is-absolute">
                                Back-end development
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/front-end-development-services"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                Front-end Development
                              </div>
                              <div className="button__text is-absolute">
                                Front-end Development
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/all/web-portal-development"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                Web portal development
                              </div>
                              <div className="button__text is-absolute">
                                Web portal development
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="footer-serv__block">
                    <div className="text-size-14 letter-spacing-005 text-style-allcaps">
                      Marketing
                    </div>
                    <ul
                      role="list"
                      className="footer-serv__list w-list-unstyled"
                    >
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/search-engine-optimisation"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                Search Engine Optimisation
                              </div>
                              <div className="button__text is-absolute">
                                Search Engine Optimisation
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/local-seo"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">Local SEO</div>
                              <div className="button__text is-absolute">
                                Local SEO
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/technical-seo"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">Technical SEO</div>
                              <div className="button__text is-absolute">
                                Technical SEO
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/seo-audit"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">SEO Audit</div>
                              <div className="button__text is-absolute">
                                SEO Audit
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/technical-audit"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                Technical Audit
                              </div>
                              <div className="button__text is-absolute">
                                Technical Audit
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/conversion-rate-optimization"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                Conversion Rate Optimization
                              </div>
                              <div className="button__text is-absolute">
                                Conversion Rate Optimization
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/all/google-analytics-consulting"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">GA4 consulting</div>
                              <div className="button__text is-absolute">
                                GA4 consulting
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/content-marketing"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                Content Marketing
                              </div>
                              <div className="button__text is-absolute">
                                Content Marketing
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/services-media"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                Social Media Design
                              </div>
                              <div className="button__text is-absolute">
                                Social Media Design
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/pitch"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                Pitch Deck Design
                              </div>
                              <div className="button__text is-absolute">
                                Pitch Deck Design
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/product-hunt"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                Product Hunt launch
                              </div>
                              <div className="button__text is-absolute">
                                Product Hunt launch
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
            <div
              data-hover="false"
              data-delay="0"
              className="dropdown-inter mod--footer w-dropdown"
            >
              <div
                className="dropdown__toggle mod--footer w-dropdown-toggle"
                id="w-dropdown-toggle-5"
                aria-controls="w-dropdown-list-5"
                aria-haspopup="menu"
                aria-expanded={isDropdownOpen.technologies}
                role="button"
                tabIndex="0"
                onClick={() => toggleDropdown("technologies")}
              >
                <div className="dropdown__title-wrap">
                  <div className="text-color-white">Show all technologies</div>
                </div>
                <div className="dropdown__icon-wrap">
                  <div data-dropdown-plus="" className="dropdown__icons">
                  <div className="dropdown__icon is-open w-embed"
                      style={{
                        display: isDropdownOpen.technologies ? "none" : "block",
                      }}
                    >
                      <svg
                        aria-hidden="true"
                        role="img"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="100%"
                        height="100%"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 4a1 1 0 0 1 1 1v14a1 1 0 1 1-2 0V5a1 1 0 0 1 1-1Z"
                          clipRule="evenodd"
                        ></path>
                        <path
                          fillRule="evenodd"
                          d="M4 12a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1Z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <div className="dropdown__icon is-close w-embed"
                      style={{
                        display: isDropdownOpen.technologies ? "block" : "none",
                      }}
                    >
                      <svg
                        aria-hidden="true"
                        role="img"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="100%"
                        height="100%"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 12a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1Z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div className="button__bg bg-color-white"></div>
                </div>
              </div>
              <nav
                className={`dropdown__list is-inter w-dropdown-list ${
                  isDropdownOpen.technologies ? "is-open" : ""
                }`}
                id="w-dropdown-list-5"
                aria-labelledby="w-dropdown-toggle-5"
                style={{
                  width: "100%",
                  height: isDropdownOpen.technologies ? "auto" : "0px",
                }}
              >
                <div className="dropdown__content mod--footer-serv">
                  <div className="footer-serv__block">
                    <div className="text-size-14 letter-spacing-005 text-style-allcaps">
                      Back-end/Front-end
                    </div>
                    <ul
                      role="list"
                      className="footer-serv__list w-list-unstyled"
                    >
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/node-js-development-services"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">Node JS</div>
                              <div className="button__text is-absolute">
                                Node JS
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/react-js-development-services"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">React JS</div>
                              <div className="button__text is-absolute">
                                React JS
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/next-js-development"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">Next JS</div>
                              <div className="button__text is-absolute">
                                Next JS
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/vue-js-development"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">Vue JS</div>
                              <div className="button__text is-absolute">
                                Vue JS
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/gatsby-development"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">Gatsby</div>
                              <div className="button__text is-absolute">
                                Gatsby
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="footer-serv__block">
                    <div className="text-size-14 letter-spacing-005 text-style-allcaps">
                      cms
                    </div>
                    <ul
                      role="list"
                      className="footer-serv__list w-list-unstyled"
                    >
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/prismic-development-services"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">Prismic</div>
                              <div className="button__text is-absolute">
                                Prismic
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/sanity-cms-development"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">Sanity</div>
                              <div className="button__text is-absolute">
                                Sanity
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/webflow-development-services"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">Webflow</div>
                              <div className="button__text is-absolute">
                                Webflow
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="footer-serv__block">
                    <div className="text-size-14 letter-spacing-005 text-style-allcaps">
                      Cloud
                    </div>
                    <ul
                      role="list"
                      className="footer-serv__list w-list-unstyled"
                    >
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/all/aws-development"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">AWS</div>
                              <div className="button__text is-absolute">
                                AWS
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/all/microsoft-azure-cloud-services"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                Microsoft Azure
                              </div>
                              <div className="button__text is-absolute">
                                Microsoft Azure
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="footer-serv__block">
                    <div className="text-size-14 letter-spacing-005 text-style-allcaps">
                      Mobile Development
                    </div>
                    <ul
                      role="list"
                      className="footer-serv__list w-list-unstyled"
                    >
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/all/react-native-development"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">React Native</div>
                              <div className="button__text is-absolute">
                                React Native
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/all/flutter-development"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">Flutter</div>
                              <div className="button__text is-absolute">
                                Flutter
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
            <div
              data-hover="false"
              data-delay="0"
              className="dropdown-inter mod--footer w-dropdown"
            >
              <div
                className="dropdown__toggle mod--footer w-dropdown-toggle"
                id="w-dropdown-toggle-6"
                aria-controls="w-dropdown-list-6"
                aria-haspopup="menu"
                aria-expanded={isDropdownOpen.industries}
                role="button"
                tabIndex="0"
                onClick={() => toggleDropdown("industries")}
              >
                <div className="dropdown__title-wrap">
                  <div className="text-color-white">Show all industries</div>
                </div>
                <div className="dropdown__icon-wrap">
                  <div data-dropdown-plus="" className="dropdown__icons">
                    <div
                      className="dropdown__icon is-open w-embed"
                      style={{
                        display: isDropdownOpen.industries ? "none" : "block",
                      }}
                    >
                      <svg
                        aria-hidden="true"
                        role="img"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="100%"
                        height="100%"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 4a1 1 0 0 1 1 1v14a1 1 0 1 1-2 0V5a1 1 0 0 1 1-1Z"
                          clipRule="evenodd"
                        ></path>
                        <path
                          fillRule="evenodd"
                          d="M4 12a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1Z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <div
                      className="dropdown__icon is-close w-embed"
                      style={{
                        display: isDropdownOpen.industries ? "block" : "none",
                      }}
                    >
                      <svg
                        aria-hidden="true"
                        role="img"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="100%"
                        height="100%"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 12a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1Z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div className="button__bg bg-color-white"></div>
                </div>
              </div>
              <nav
                className={`dropdown__list is-inter w-dropdown-list ${
                  isDropdownOpen.industries ? "is-open" : ""
                }`}
                id="w-dropdown-list-6"
                aria-labelledby="w-dropdown-toggle-6"
                style={{
                  width: "100%",
                  height: isDropdownOpen.industries ? "auto" : "0px",
                }}
              >
                <div className="dropdown__content mod--footer-serv">
                  <div className="footer-serv__block">
                    <div className="text-size-14 letter-spacing-005 text-style-allcaps">
                      Healthcare
                    </div>
                    <ul
                      role="list"
                      className="footer-serv__list w-list-unstyled"
                    >
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/all/healthcare-software-development"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                Healthcare software development
                              </div>
                              <div className="button__text is-absolute">
                                Healthcare software development
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/all/healthcare-it-consulting"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                Healthcare IT consulting
                              </div>
                              <div className="button__text is-absolute">
                                Healthcare IT consulting
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/all/healthcare-app-development"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                Healthcare app development
                              </div>
                              <div className="button__text is-absolute">
                                Healthcare app development
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/all/healthcare-ux-ui-design"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                Healthcare UI/UX design
                              </div>
                              <div className="button__text is-absolute">
                                Healthcare UI/UX design
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/all/patient-apps-development"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                Medical apps for patients
                              </div>
                              <div className="button__text is-absolute">
                                Medical apps for patients
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/all/healthcare-software-testing"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                Healthcare software testing{" "}
                              </div>
                              <div className="button__text is-absolute">
                                Healthcare software testing{" "}
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/all/telemedicine-app-development"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                Telemedicine app development
                              </div>
                              <div className="button__text is-absolute">
                                Telemedicine app development
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/healthcare-medical-web-design"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                Healthcare website design
                              </div>
                              <div className="button__text is-absolute">
                                Healthcare website design
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="footer-serv__block">
                    <div className="text-size-14 letter-spacing-005 text-style-allcaps">
                      Education
                    </div>
                    <ul
                      role="list"
                      className="footer-serv__list w-list-unstyled"
                    >
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/all/education-software-development"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                Education software development
                              </div>
                              <div className="button__text is-absolute">
                                Education software development
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/all/education-app-development"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                Education app development
                              </div>
                              <div className="button__text is-absolute">
                                Education app development
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/all/lms-development"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                LMS development services
                              </div>
                              <div className="button__text is-absolute">
                                LMS development services
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/all/elearning-app-development"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                E-learning application development
                              </div>
                              <div className="button__text is-absolute">
                                E-learning application development
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/all/elearning-software-development"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                E-learning software development
                              </div>
                              <div className="button__text is-absolute">
                                E-learning software development
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/all/education-portal-development"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                Education portals development
                              </div>
                              <div className="button__text is-absolute">
                                Education portals development
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/all/school-management-software-development"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                School management software
                              </div>
                              <div className="button__text is-absolute">
                                School management software
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="footer-serv__block">
                    <div className="text-size-14 letter-spacing-005 text-style-allcaps">
                      Finance
                    </div>
                    <ul
                      role="list"
                      className="footer-serv__list w-list-unstyled"
                    >
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/all/financial-software-development"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                Financial software development
                              </div>
                              <div className="button__text is-absolute">
                                Financial software development
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/all/financial-website-design"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                Web design for financial services
                              </div>
                              <div className="button__text is-absolute">
                                Web design for financial services
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/all/financial-app-development"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                Financial mobile app development
                              </div>
                              <div className="button__text is-absolute">
                                Financial mobile app development
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/all/mobile-banking-app-development"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                Banking apps development
                              </div>
                              <div className="button__text is-absolute">
                                Banking apps development
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/all/payment-app-development"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                Payment app development
                              </div>
                              <div className="button__text is-absolute">
                                Payment app development
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/all/payment-integration"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                Payment integration services
                              </div>
                              <div className="button__text is-absolute">
                                Payment integration services
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="footer-serv__block">
                    <div className="text-size-14 letter-spacing-005 text-style-allcaps">
                      Transportation and Logistics
                    </div>
                    <ul
                      role="list"
                      className="footer-serv__list w-list-unstyled"
                    >
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/all/transportation-logistics-software-development"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                Transportation software development
                              </div>
                              <div className="button__text is-absolute">
                                Transportation software development
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/all/logistics-app-development"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                Logistics app development
                              </div>
                              <div className="button__text is-absolute">
                                Logistics app development
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/all/logistics-web-design"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                Logistics web design
                              </div>
                              <div className="button__text is-absolute">
                                Logistics web design
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/all/transportation-management-software"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                Transportation management software
                              </div>
                              <div className="button__text is-absolute">
                                Transportation management software
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/all/supply-chain-software-development"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                Supply chain software development{" "}
                              </div>
                              <div className="button__text is-absolute">
                                Supply chain software development{" "}
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="footer-serv__block">
                    <div className="text-size-14 letter-spacing-005 text-style-allcaps">
                      Machine Learning &amp; AI
                    </div>
                    <ul
                      role="list"
                      className="footer-serv__list w-list-unstyled"
                    >
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/all/ai-consulting"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                AI consulting services
                              </div>
                              <div className="button__text is-absolute">
                                AI consulting services
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/all/ai-development"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                AI development services
                              </div>
                              <div className="button__text is-absolute">
                                AI development services
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/all/ai-integration"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                AI integration services
                              </div>
                              <div className="button__text is-absolute">
                                AI integration services
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/all/chatbot-development"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                AI chatbot development
                              </div>
                              <div className="button__text is-absolute">
                                AI chatbot development
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="footer-serv__list-item">
                        <a
                          data-link-underline=""
                          data-hover=""
                          href="/services/all/chatgpt-integration"
                          className="footer__link w-inline-block"
                          tabIndex="0"
                        >
                          <div className="overflow-hidden">
                            <div data-hover-elem="" className="button__texts">
                              <div className="button__text">
                                ChatGPT integration
                              </div>
                              <div className="button__text is-absolute">
                                ChatGPT integration
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
          </div>

          {/* Footer Terms Section */}
          <div className="footer-terms__links flex">
            <div className="footer-terms__reserved">
              © 2017 - 2025 Illusio Designs. Made with ❤️ in India. All rights
              reserved.
            </div>
            <div className="flex gap-10">
              <div className="footer__link mod--terms is--cookies">
                Manage cookies
              </div>
              <a
                href="/cookie-policy#halo-lab-website-terms-of-use"
                className="footer__link mod--terms"
              >
                Terms and Conditions
              </a>
              <a
                href="/cookie-policy#halo-lab-privacy-policy"
                className="footer__link mod--terms"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
