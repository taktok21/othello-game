import React from 'react';
import { Code, Database, Cloud, Cpu, Award, Users } from 'lucide-react';

const About = () => {
  const skills = [
    {
      category: 'フロントエンド',
      icon: <Code size={32} />,
      technologies: ['React', 'Vue.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3'],
      level: 95
    },
    {
      category: 'バックエンド',
      icon: <Database size={32} />,
      technologies: ['Python', 'Java', 'Node.js', 'PHP', 'PostgreSQL', 'MySQL'],
      level: 90
    },
    {
      category: 'クラウド・インフラ',
      icon: <Cloud size={32} />,
      technologies: ['AWS', 'Docker', 'Kubernetes', 'Linux', 'CI/CD', 'Terraform'],
      level: 85
    },
    {
      category: 'その他',
      icon: <Cpu size={32} />,
      technologies: ['Git', 'Agile', 'システム設計', 'API設計', 'セキュリティ'],
      level: 88
    }
  ];

  const achievements = [
    {
      icon: <Award size={24} />,
      title: '10年以上の実務経験',
      description: 'スタートアップから大企業まで幅広い経験'
    },
    {
      icon: <Users size={24} />,
      title: '50以上のプロジェクト',
      description: 'Webアプリからシステム統合まで対応'
    },
    {
      icon: <Code size={24} />,
      title: '最新技術への適応',
      description: '継続的な学習とスキルアップデート'
    }
  ];

  return (
    <section id="about" className="about section">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        
        <div className="about-content">
          <div className="about-intro">
            <div className="intro-text">
              <h3>経験豊富なシステムエンジニア</h3>
              <p>
                私は10年以上にわたってシステム開発に携わってきたプロフェッショナルです。
                フロントエンドからバックエンド、インフラまで幅広い技術領域をカバーし、
                お客様のビジネス課題を技術的な観点から解決することを得意としています。
              </p>
              <p>
                特に、スケーラブルなWebアプリケーションの設計・開発、
                クラウドインフラの構築・運用、チーム開発における技術リードなどで
                多くの実績を積んでまいりました。
              </p>
              <p>
                常に最新技術にアンテナを張り、実践的なソリューションを提供することで、
                お客様のビジネス成長に貢献することが私の使命です。
              </p>
            </div>
            
            <div className="achievements">
              {achievements.map((achievement, index) => (
                <div key={index} className="achievement-item">
                  <div className="achievement-icon">
                    {achievement.icon}
                  </div>
                  <div className="achievement-content">
                    <h4>{achievement.title}</h4>
                    <p>{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="skills-section">
            <h3>技術スキル</h3>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <div key={index} className="skill-card">
                  <div className="skill-header">
                    <div className="skill-icon">
                      {skill.icon}
                    </div>
                    <h4>{skill.category}</h4>
                  </div>
                  <div className="skill-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">{skill.level}%</span>
                  </div>
                  <div className="skill-technologies">
                    {skill.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .about {
          background: var(--bg-secondary);
          position: relative;
          overflow: hidden;
        }

        .about::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 20% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%);
          pointer-events: none;
        }

        .about-content {
          display: grid;
          gap: 4rem;
        }

        .about-intro {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 3rem;
          align-items: start;
        }

        .intro-text h3 {
          font-size: 2rem;
          color: var(--primary-color);
          margin-bottom: 1.5rem;
        }

        .intro-text p {
          margin-bottom: 1.5rem;
          color: var(--text-secondary);
          line-height: 1.8;
        }

        .achievements {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .achievement-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem;
          background: var(--bg-glass);
          backdrop-filter: blur(var(--blur-strength));
          border: 1px solid var(--border-glass);
          border-radius: 1rem;
          box-shadow: var(--shadow-glass);
          transition: all var(--animation-speed) cubic-bezier(0.4, 0, 0.2, 1);
        }

        .achievement-item:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: var(--shadow-glow);
        }

        .achievement-icon {
          color: var(--primary-color);
          background: rgba(37, 99, 235, 0.1);
          padding: 0.75rem;
          border-radius: 0.5rem;
        }

        .achievement-content h4 {
          margin: 0 0 0.5rem 0;
          color: var(--text-primary);
          font-size: 1.1rem;
        }

        .achievement-content p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .skills-section h3 {
          font-size: 2rem;
          color: var(--text-primary);
          margin-bottom: 2rem;
          text-align: center;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .skill-card {
          background: white;
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: var(--shadow-md);
          transition: transform 0.2s ease;
        }

        .skill-card:hover {
          transform: translateY(-4px);
        }

        .skill-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .skill-icon {
          color: var(--primary-color);
        }

        .skill-header h4 {
          margin: 0;
          font-size: 1.3rem;
          color: var(--text-primary);
        }

        .skill-progress {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .progress-bar {
          flex: 1;
          height: 8px;
          background: #e2e8f0;
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
          border-radius: 4px;
          transition: width 1s ease;
        }

        .progress-text {
          font-weight: 600;
          color: var(--primary-color);
          min-width: 40px;
        }

        .skill-technologies {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tech-tag {
          background: var(--bg-secondary);
          color: var(--text-secondary);
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.85rem;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .about-intro {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .skills-grid {
            grid-template-columns: 1fr;
          }

          .achievement-item {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
};

export default About;