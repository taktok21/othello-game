import React, { useEffect, useRef } from 'react';
import { ArrowDown, Github, Linkedin, Mail, Sparkles } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef(null);
  const particlesRef = useRef(null);

  useEffect(() => {
    const createParticle = () => {
      if (!particlesRef.current) return;
      
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
      particle.style.opacity = Math.random();
      particle.style.transform = `scale(${Math.random()})`;
      
      particlesRef.current.appendChild(particle);
      
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 5000);
    };

    const interval = setInterval(createParticle, 300);
    return () => clearInterval(interval);
  }, []);

  const scrollToNext = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero" ref={heroRef}>
      <div className="particles-container" ref={particlesRef}></div>
      <div className="hero-bg-effects">
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
        <div className="floating-orb orb-3"></div>
      </div>
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge animate-pulse-glow">
              <Sparkles size={16} />
              <span>システムエンジニア</span>
            </div>
            <h1 className="hero-title">
              <span className="hero-greeting">こんにちは、</span>
              <span className="hero-name gradient-text animate-text-glow">プロフェッショナル</span>
              <span className="hero-role">システムエンジニアです</span>
            </h1>
            <p className="hero-description">
              10年以上の経験を持つシステムエンジニアとして、
              <br />
              最新技術を駆使した高品質なソリューションを提供いたします。
              <br />
              お客様のビジネス課題を技術で解決することが私の使命です。
            </p>
            <div className="hero-actions">
              <a href="#contact" className="btn btn-primary hero-cta glass-effect neon-glow">
                お問い合わせ
              </a>
              <a href="#portfolio" className="btn btn-secondary glass-effect">
                実績を見る
              </a>
            </div>
            <div className="hero-social">
              <a href="https://github.com" className="social-link glass-effect animate-float" aria-label="GitHub">
                <Github size={24} />
              </a>
              <a href="https://linkedin.com" className="social-link glass-effect animate-float" aria-label="LinkedIn">
                <Linkedin size={24} />
              </a>
              <a href="mailto:contact@example.com" className="social-link glass-effect animate-float" aria-label="Email">
                <Mail size={24} />
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-avatar">
              <div className="avatar-placeholder glass-effect animate-morphing animate-pulse-glow">
                <span className="gradient-text">SE</span>
              </div>
            </div>
            <div className="floating-elements">
              <div className="tech-badge react glass-effect animate-float">React</div>
              <div className="tech-badge python glass-effect animate-float">Python</div>
              <div className="tech-badge aws glass-effect animate-float">AWS</div>
              <div className="tech-badge docker glass-effect animate-float">Docker</div>
            </div>
          </div>
        </div>
        <button className="scroll-indicator glass-effect animate-float" onClick={scrollToNext} aria-label="下にスクロール">
          <ArrowDown size={24} />
        </button>
      </div>

      <style jsx>{`
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          background: var(--gradient-primary);
          color: white;
          overflow: hidden;
        }

        .particles-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          animation: particleFloat 5s linear infinite;
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

        .hero-bg-effects {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .floating-orb {
          position: absolute;
          border-radius: 50%;
          background: var(--gradient-accent);
          filter: blur(60px);
          opacity: 0.3;
          animation: float 6s ease-in-out infinite;
        }

        .orb-1 {
          width: 300px;
          height: 300px;
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .orb-2 {
          width: 200px;
          height: 200px;
          top: 60%;
          right: 20%;
          animation-delay: 2s;
        }

        .orb-3 {
          width: 150px;
          height: 150px;
          bottom: 20%;
          left: 50%;
          animation-delay: 4s;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.2);
          z-index: 1;
        }

        .container {
          position: relative;
          z-index: 2;
        }

        .hero-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          min-height: 80vh;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border-radius: 2rem;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 2rem;
          background: var(--bg-glass);
          backdrop-filter: blur(var(--blur-strength));
          border: 1px solid var(--border-glass);
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          display: flex;
          flex-direction: column;
        }

        .hero-greeting {
          font-size: 1.5rem;
          font-weight: 400;
          opacity: 0.9;
        }

        .hero-name {
          background: var(--gradient-secondary);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-role {
          font-size: 2.5rem;
          margin-top: 0.5rem;
        }

        .hero-description {
          font-size: 1.2rem;
          line-height: 1.8;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .hero-cta {
          background: var(--gradient-secondary);
          color: white;
          font-weight: 600;
          position: relative;
          overflow: hidden;
        }

        .hero-cta::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.6s ease;
        }

        .hero-cta:hover::before {
          left: 100%;
        }

        .hero-social {
          display: flex;
          gap: 1rem;
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          color: white;
          text-decoration: none;
          transition: all var(--animation-speed) cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 50%;
        }

        .social-link:hover {
          transform: translateY(-4px) scale(1.1);
          box-shadow: var(--shadow-neon);
        }

        .hero-visual {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .hero-avatar {
          position: relative;
          z-index: 2;
        }

        .avatar-placeholder {
          width: 250px;
          height: 250px;
          background: var(--gradient-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 5rem;
          font-weight: 900;
          color: white;
          position: relative;
          overflow: hidden;
        }

        .avatar-placeholder::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: var(--gradient-accent);
          z-index: -1;
          border-radius: inherit;
          animation: gradient-shift 3s ease infinite;
        }

        .floating-elements {
          position: absolute;
          inset: 0;
        }

        .tech-badge {
          position: absolute;
          padding: 0.75rem 1.5rem;
          border-radius: 2rem;
          font-size: 0.9rem;
          font-weight: 600;
          color: white;
          backdrop-filter: blur(var(--blur-strength));
          border: 1px solid var(--border-glass);
          transition: all var(--animation-speed) ease;
        }

        .tech-badge:hover {
          transform: scale(1.1);
          box-shadow: var(--shadow-glow);
        }

        .react {
          top: 20%;
          left: 10%;
          background: linear-gradient(135deg, #61dafb, #21d4fd);
          animation-delay: 0s;
        }

        .python {
          top: 60%;
          left: 5%;
          background: linear-gradient(135deg, #3776ab, #306cc4);
          animation-delay: 0.5s;
        }

        .aws {
          top: 10%;
          right: 15%;
          background: linear-gradient(135deg, #ff9900, #ffb347);
          animation-delay: 1s;
        }

        .docker {
          bottom: 20%;
          right: 10%;
          background: linear-gradient(135deg, #2496ed, #0db7ed);
          animation-delay: 1.5s;
        }

        .scroll-indicator {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          z-index: 2;
          padding: 1rem;
          border-radius: 50%;
          transition: all var(--animation-speed) ease;
        }

        .scroll-indicator:hover {
          transform: translateX(-50%) scale(1.2);
          box-shadow: var(--shadow-neon);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
          40% { transform: translateX(-50%) translateY(-10px); }
          60% { transform: translateX(-50%) translateY(-5px); }
        }

        @media (max-width: 768px) {
          .hero-content {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 2rem;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .hero-role {
            font-size: 2rem;
          }

          .hero-actions {
            justify-content: center;
          }

          .avatar-placeholder {
            width: 150px;
            height: 150px;
            font-size: 3rem;
          }

          .tech-badge {
            font-size: 0.8rem;
            padding: 0.4rem 0.8rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;