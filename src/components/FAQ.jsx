import React, { useState } from 'react';
import { faqData } from '../data/faq';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq" id="faq">
      <div className="container faq__container">
        <div className="section-header">
          <span className="section-header__badge">FAQ</span>
          <h2 className="section-header__title">Frequently Asked Questions</h2>
          <p className="section-header__desc">Everything you need to know about the product and billing.</p>
        </div>
        
        <div className="faq__list">
          {faqData.map((faq, index) => {
            const isActive = activeIndex === index;
            return (
              <div 
                key={faq.id} 
                className={`faq__item ${isActive ? 'faq__item--active' : ''}`}
              >
                <button 
                  className="faq__header"
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={isActive}
                >
                  <span className="faq__question">{faq.question}</span>
                  <span className="faq__icon">
                    {isActive ? '✕' : '＋'}
                  </span>
                </button>
                <div className="faq__content">
                  <div className="faq__content-inner">
                    <p className="faq__text">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
