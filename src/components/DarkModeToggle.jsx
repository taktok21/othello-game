import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(saved ? JSON.parse(saved) : prefersDark);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('darkMode', JSON.stringify(isDark));
  }, [isDark]);

  const toggleDark = () => {
    setIsDark(!isDark);
  };

  return (
    <button
      className={`dark-mode-toggle ${isDark ? 'dark' : 'light'}`}
      onClick={toggleDark}
      aria-label="ダークモード切り替え"
    >
      <div className="toggle-background">
        <div className={`toggle-slider ${isDark ? 'dark' : 'light'}`}>
          {isDark ? <Moon size={16} /> : <Sun size={16} />}
        </div>
      </div>

      <style jsx>{`
        .dark-mode-toggle {
          position: relative;
          width: 60px;
          height: 30px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }

        .toggle-background {
          width: 100%;
          height: 100%;
          background: var(--bg-glass);
          backdrop-filter: blur(var(--blur-strength));
          border: 1px solid var(--border-glass);
          border-radius: 15px;
          position: relative;
          transition: all var(--animation-speed) cubic-bezier(0.4, 0, 0.2, 1);
        }

        .dark-mode-toggle:hover .toggle-background {
          box-shadow: var(--shadow-glow);
          transform: scale(1.05);
        }

        .toggle-slider {
          position: absolute;
          top: 2px;
          width: 26px;
          height: 26px;
          background: var(--gradient-primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          transition: all var(--animation-speed) cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: var(--shadow-md);
        }

        .toggle-slider.light {
          left: 2px;
          background: var(--gradient-secondary);
        }

        .toggle-slider.dark {
          left: calc(100% - 28px);
          background: var(--gradient-primary);
        }

        .dark-mode-toggle.dark .toggle-background {
          background: rgba(15, 23, 42, 0.3);
          border-color: rgba(255, 255, 255, 0.2);
        }

        @media (max-width: 768px) {
          .dark-mode-toggle {
            width: 50px;
            height: 25px;
          }

          .toggle-slider {
            width: 21px;
            height: 21px;
          }

          .toggle-slider.dark {
            left: calc(100% - 23px);
          }
        }
      `}</style>
    </button>
  );
};

export default DarkModeToggle;