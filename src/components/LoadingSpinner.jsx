import React, { useState, useEffect } from 'react';

const LoadingSpinner = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <div className="logo-container">
          <div className="loading-logo glass-effect animate-pulse-glow">
            <span className="gradient-text">SE</span>
          </div>
        </div>
        
        <div className="loading-text">
          <h2 className="gradient-text animate-text-glow">システムエンジニア</h2>
          <p>プロフェッショナルサイトを準備中...</p>
        </div>

        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="progress-text">{Math.round(progress)}%</span>
        </div>

        <div className="loading-particles">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: var(--gradient-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          animation: fadeOut 0.5s ease ${isLoading ? 'forwards' : 'reverse'};
        }

        .loading-content {
          text-align: center;
          color: white;
          position: relative;
          z-index: 2;
        }

        .logo-container {
          margin-bottom: 2rem;
        }

        .loading-logo {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: var(--bg-glass);
          backdrop-filter: blur(var(--blur-strength));
          border: 2px solid var(--border-glass);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
          font-weight: 900;
          margin: 0 auto;
          animation: float 3s ease-in-out infinite, pulse-glow 2s ease-in-out infinite;
        }

        .loading-text {
          margin-bottom: 3rem;
        }

        .loading-text h2 {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
        }

        .loading-text p {
          font-size: 1.1rem;
          opacity: 0.9;
          margin: 0;
        }

        .progress-container {
          width: 300px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .progress-bar {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
          overflow: hidden;
          backdrop-filter: blur(10px);
        }

        .progress-fill {
          height: 100%;
          background: var(--gradient-secondary);
          border-radius: 3px;
          transition: width 0.3s ease;
          position: relative;
        }

        .progress-fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          animation: shimmer 1.5s infinite;
        }

        .progress-text {
          font-size: 1.1rem;
          font-weight: 600;
          opacity: 0.9;
        }

        .loading-particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          animation: particleFloat 4s linear infinite;
        }

        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; visibility: hidden; }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes particleFloat {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-10vh) rotate(360deg);
            opacity: 0;
          }
        }

        @media (max-width: 768px) {
          .loading-logo {
            width: 80px;
            height: 80px;
            font-size: 2rem;
          }

          .loading-text h2 {
            font-size: 2rem;
          }

          .progress-container {
            width: 250px;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;