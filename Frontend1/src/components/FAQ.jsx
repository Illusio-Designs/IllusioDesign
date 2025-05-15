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
      <h2 className="faq-title">Get quick answers to your queries<span className="dot">.</span></h2>
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