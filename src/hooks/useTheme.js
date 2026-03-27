import { useState, useEffect } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    // 檢查 localStorage 偏好
    const saved = localStorage.getItem('theme-preference');
    if (saved) return saved;
    // 檢查系統偏好
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark'; // 預設為深色
  });

  useEffect(() => {
    // 在 <html> 上設定 data-theme 屬性
    document.documentElement.setAttribute('data-theme', theme);
    // 儲存偏好到 localStorage
    localStorage.setItem('theme-preference', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return { theme, toggleTheme };
}
