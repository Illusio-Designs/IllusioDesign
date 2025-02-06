import React from "react";
import "./Footer.css";

const Footer = () => {
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
            fill-rule="evenodd"
            d="M8 0C3.584 0 0 3.584 0 8s3.584 8 8 8c4.408 0 8-3.584 8-8s-3.592-8-8-8m5.284 3.688a6.8 6.8 0 0 1 1.545 4.251c-.226-.043-2.482-.503-4.755-.217-.052-.112-.096-.234-.148-.355-.139-.33-.295-.668-.451-.99 2.516-1.023 3.662-2.498 3.81-2.69zM8 1.18c1.735 0 3.323.65 4.53 1.718-.122.174-1.155 1.553-3.584 2.464-1.12-2.056-2.36-3.74-2.551-4A7 7 0 0 1 8 1.18m-2.907.642A43 43 0 0 1 7.627 5.77c-3.193.85-6.013.833-6.317.833a6.87 6.87 0 0 1 3.783-4.78zM1.163 8.01V7.8c.295.01 3.61.053 7.02-.971.199.381.381.772.555 1.162l-.27.078c-3.522 1.137-5.396 4.243-5.553 4.504a6.82 6.82 0 0 1-1.752-4.564zM8 14.837a6.8 6.8 0 0 1-4.19-1.44c.12-.252 1.509-2.924 5.361-4.269.018-.009.026-.009.044-.017a28.3 28.3 0 0 1 1.457 5.18A6.7 6.7 0 0 1 8 14.837m3.81-1.171c-.07-.417-.435-2.412-1.328-4.868 2.143-.338 4.017.217 4.251.295a6.77 6.77 0 0 1-2.924 4.573z"
          />
        </svg>
      ),
      modClass: "mod--dribble",
    },
    {
      platform: "instagram",
      url: "https://www.instagram.com/halolabteam/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          class="bi bi-instagram"
          viewBox="0 0 16 16"
        >
          <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
        </svg>
      ),
      modClass: "mod--instagram",
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
          class="bi bi-behance"
          viewBox="0 0 16 16"
        >
          <path d="M4.654 3c.461 0 .887.035 1.278.14.39.07.711.216.996.391s.497.426.641.747c.14.32.216.711.216 1.137 0 .496-.106.922-.356 1.242-.215.32-.566.606-.997.817.606.176 1.067.496 1.348.922s.461.957.461 1.563c0 .496-.105.922-.285 1.278a2.3 2.3 0 0 1-.782.887c-.32.215-.711.39-1.137.496a5.3 5.3 0 0 1-1.278.176L0 12.803V3zm-.285 3.978c.39 0 .71-.105.957-.285.246-.18.355-.497.355-.887 0-.216-.035-.426-.105-.567a1 1 0 0 0-.32-.355 1.8 1.8 0 0 0-.461-.176c-.176-.035-.356-.035-.567-.035H2.17v2.31c0-.005 2.2-.005 2.2-.005zm.105 4.193c.215 0 .426-.035.606-.07.176-.035.356-.106.496-.216s.25-.215.356-.39c.07-.176.14-.391.14-.641 0-.496-.14-.852-.426-1.102-.285-.215-.676-.32-1.137-.32H2.17v2.734h2.305zm6.858-.035q.428.427 1.278.426c.39 0 .746-.106 1.032-.286q.426-.32.53-.64h1.74c-.286.851-.712 1.457-1.278 1.848-.566.355-1.243.566-2.06.566a4.1 4.1 0 0 1-1.527-.285 2.8 2.8 0 0 1-1.137-.782 2.85 2.85 0 0 1-.712-1.172c-.175-.461-.25-.957-.25-1.528 0-.531.07-1.032.25-1.493.18-.46.426-.852.747-1.207.32-.32.711-.606 1.137-.782a4 4 0 0 1 1.493-.285c.606 0 1.137.105 1.598.355.46.25.817.532 1.102.958.285.39.496.851.641 1.348.07.496.105.996.07 1.563h-5.15c0 .58.21 1.11.496 1.396m2.24-3.732c-.25-.25-.642-.391-1.103-.391-.32 0-.566.07-.781.176s-.356.25-.496.39a.96.96 0 0 0-.25.497c-.036.175-.07.32-.07.46h3.196c-.07-.526-.25-.882-.497-1.132zm-3.127-3.728h3.978v.957h-3.978z" />
        </svg>
      ),
      modClass: "mod--behance",
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
      modClass: "mod--webflow",
    },
    {
      platform: "linkedin",
      url: "https://www.instagram.com/halolabteam/",
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
      modClass: "mod--linkedin",
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
      modClass: "mod--github",
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
      modClass: "mod--npm",
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
                  {socialLinks.map((link) => (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social__link"
                    >
                      <div className="button__icon-anim">
                        <div className="icon-container">{link.icon}</div>{" "}
                        {/* Wrap each icon */}
                      </div>
                      <div className={`button__bg ${link.modClass}`}></div>
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
                {techPartners.map((partner) => (
                  <a
                    key={partner.name}
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
