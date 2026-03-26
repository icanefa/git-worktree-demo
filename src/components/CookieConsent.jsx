import { useState, useEffect } from 'react';
import './CookieConsent.css';

export default function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setMounted(true);
      // 延遲一點觸發動畫，以提供更好的滑入 UX
      const timer = setTimeout(() => setVisible(true), 100);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (type) => {
    setVisible(false);
    // 等待滑出動畫完成後再真正移除元件並寫入 localStorage
    setTimeout(() => {
      localStorage.setItem('cookie-consent', type);
      setMounted(false);
    }, 400);
  };

  if (!mounted) return null;

  return (
    <div className={`cookie-consent ${visible ? 'cookie-consent--visible' : ''}`}>
      <div className="cookie-consent__inner">
        <div className="cookie-consent__content">
          <span className="cookie-consent__icon">🍪</span>
          <p className="cookie-consent__text">
            我們使用 Cookie 來提升您的體驗、分析網站流量，並提供客製化內容。
            繼續瀏覽即表示您同意我們的使用條款。
          </p>
        </div>
        <div className="cookie-consent__actions">
          <button 
            className="btn btn--outline cookie-consent__btn" 
            onClick={() => handleConsent('necessary')}
          >
            僅必要
          </button>
          <button 
            className="btn btn--primary cookie-consent__btn" 
            onClick={() => handleConsent('all')}
          >
            接受全部
          </button>
        </div>
      </div>
    </div>
  );
}
