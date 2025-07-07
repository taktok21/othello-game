import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';

const Header = ({ currentPage = 'home', onPageChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { page: 'home', href: '#home', label: 'ホーム' },
    { page: 'home', href: '#about', label: 'About' },
    { page: 'home', href: '#services', label: 'サービス' },
    { page: 'home', href: '#portfolio', label: 'ポートフォリオ' },
    { page: 'home', href: '#blog', label: 'ブログ' },
    { page: 'blog-tools', href: '#blog-tools', label: 'ブログツール' },
    { page: 'writing-tool', href: '#writing-tool', label: 'ライティングツール' },
    { page: 'othello', href: '#othello', label: 'オセロゲーム' },
    { page: 'logo-creator', href: '#logo-creator', label: 'ロゴクリエーター' },
    { page: 'home', href: '#contact', label: 'お問い合わせ' }
  ];

  const handleNavClick = (link) => {
    setIsMenuOpen(false);
    
    if (link.page === 'blog-tools') {
      onPageChange?.('blog-tools');
    } else if (link.page === 'writing-tool') {
      onPageChange?.('writing-tool');
    } else if (link.page === 'othello') {
      onPageChange?.('othello');
    } else if (link.page === 'logo-creator') {
      onPageChange?.('logo-creator');
    } else if (link.page === 'home') {
      if (currentPage !== 'home') {
        onPageChange?.('home');
        setTimeout(() => {
          document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <h2>SE Portfolio</h2>
          </div>
          
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`nav-link ${
                  (link.page === currentPage) || 
                  (currentPage === 'home' && link.href === '#home') ? 'active' : ''
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link);
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="header-controls">
            <DarkModeToggle />
            <button
              className="menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="メニューを開く"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: var(--bg-glass);
          backdrop-filter: blur(var(--blur-strength));
          -webkit-backdrop-filter: blur(var(--blur-strength));
          border-bottom: 1px solid var(--border-glass);
          transition: all var(--animation-speed) cubic-bezier(0.4, 0, 0.2, 1);
        }

        .header-scrolled {
          box-shadow: var(--shadow-glass);
          background: rgba(255, 255, 255, 0.9);
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 0;
        }

        .logo h2 {
          margin: 0;
          background: var(--gradient-primary);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-size: 1.5rem;
          font-weight: 700;
          animation: gradient-shift 3s ease infinite;
        }

        .nav {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        .nav-link {
          text-decoration: none;
          color: var(--text-primary);
          font-weight: 500;
          transition: all var(--animation-speed) cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          padding: 0.5rem 1rem;
          border-radius: 2rem;
        }

        .nav-link:hover {
          color: var(--primary-color);
          background: var(--bg-glass);
          backdrop-filter: blur(var(--blur-strength));
          transform: translateY(-2px);
          box-shadow: var(--shadow-glass);
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: var(--gradient-primary);
          transition: all var(--animation-speed) ease;
          transform: translateX(-50%);
          border-radius: 2px;
        }

        .nav-link:hover::after,
        .nav-link.active::after {
          width: 80%;
        }

        .nav-link.active {
          color: var(--primary-color);
          background: var(--bg-glass);
          backdrop-filter: blur(var(--blur-strength));
        }

        .header-controls {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .menu-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-primary);
        }

        @media (max-width: 768px) {
          .nav {
            position: fixed;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 2rem;
            box-shadow: var(--shadow-lg);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
          }

          .nav-open {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
          }

          .nav-link {
            padding: 0.5rem 0;
            font-size: 1.1rem;
          }

          .menu-toggle {
            display: block;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;