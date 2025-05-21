import React, { useState } from 'react';
import '../styles/components/FAQ.css';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  
  const faqData = [
    {
      question: 'What services do you offer?',
      answer: 'We offer a wide range of services including enterprise UX design, AI designs, idea to MVP for startups, design for SaaS, design systems, UX audit, usability testing, and web accessibility solutions.'
    },
    {
      question: 'How long does it take to complete a design project?',
      answer: 'The timeline depends on the project scope and requirements. Typically, a design project can take anywhere from a few weeks to a few months.'
    },
    {
      question: 'Do you provide post-project support?',
      answer: 'Yes, we offer post-project support to ensure smooth implementation and address any issues or enhancements needed.'
    },
    {
      question: 'How do you approach UX design for startups?',
      answer: 'We follow a user-centered approach, starting from understanding your business goals and user needs, to prototyping, testing, and iterating for the best results.'
    }
  ];

  return (
    <div className="faq-section">
      <h2 className="faq-title">Get quick answers to your queries<span className="dot">.</span>
        <svg style={{ display: 'inline-block' }} width="36" height="37" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg" data-aos="zoom-in" data-aos-offset="10" data-aos-delay="300" data-aos-easing="ease-in-out" data-aos-duration="300" className="aos-init aos-animate">
          <g clipPath="url(#clip0_557_31426)">
            <path className="get-quick-path" d="M1.32497 3.23755L0.608838 19.9797C0.379675 25.4943 -0.0500047 31.0372 0.0001246 36.5588C0.00728593 37.4448 2.77872 36.8636 2.85749 36.0059C3.37311 30.5126 3.41608 24.9485 3.64524 19.4339L4.34705 2.86897C4.39718 1.64272 1.35362 2.24521 1.31781 3.24464L1.32497 3.23755Z" fill="#ec691f"></path>
            <path className="get-quick-path" d="M1.79206 4.28058C11.3668 3.7915 20.9271 2.85587 30.4302 1.62253L29.4491 0.580579C25.5534 3.71353 21.5072 6.63384 17.2605 9.28479C16.6375 9.67464 16.4441 10.2842 17.2749 10.5181C22.6745 12.0279 28.0741 13.5448 33.4666 15.0687L34.591 13.4384C23.6914 15.3168 12.7847 17.2944 1.99258 19.7114C1.58439 19.8036 0.767994 20.1509 0.789478 20.6683C0.810962 21.1858 1.61303 21.2283 1.98542 21.1574C12.7059 19.0806 23.4121 16.94 34.1756 15.0829C34.6984 14.9907 35.4861 14.7994 35.7797 14.289C36.0375 13.8425 35.7368 13.5731 35.2999 13.4526C29.8931 11.9499 24.4863 10.4402 19.0867 8.9233L19.101 10.1566C23.5124 7.37809 27.7734 4.35855 31.8052 1.06257C32.6932 0.339583 31.4615 -0.0715285 30.8241 0.0206171C21.4356 1.30357 11.9898 2.15414 2.52252 2.73537C2.03555 2.76372 1.17619 3.06142 0.989995 3.57177C0.803801 4.08211 1.34806 4.30184 1.79206 4.28058Z" fill="#ec691f"></path>
          </g>
          <defs>
            <clipPath id="clip0_557_31426">
              <rect width="36" height="37" fill="white"></rect>
            </clipPath>
          </defs>
        </svg>
      </h2>
      <div className="faq-list">
        {faqData.map((faq, idx) => (
          <div key={idx} className={`faq-item${openIndex === idx ? ' open' : ''}`}> 
            <div className="faq-question" onClick={() => setOpenIndex(openIndex === idx ? null : idx)}>
              <span>{faq.question}</span>
              <span className="faq-toggle">{openIndex === idx ? '–' : '+'}</span>
            </div>
            {openIndex === idx && (
              <div className="faq-answer">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ; 