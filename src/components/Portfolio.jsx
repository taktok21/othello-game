import React, { useState } from 'react';
import { ExternalLink, Github, Calendar, Users, Zap } from 'lucide-react';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'E-コマースプラットフォーム',
      category: 'web',
      description: 'React × Node.jsで構築した高性能なECサイト。決済システム統合、在庫管理、顧客管理機能を実装。',
      image: 'https://via.placeholder.com/400x250/2563eb/ffffff?text=E-Commerce',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Stripe'],
      features: ['決済システム統合', 'リアルタイム在庫管理', '多言語対応'],
      duration: '6ヶ月',
      teamSize: '5人',
      impact: '売上300%向上',
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      id: 2,
      title: 'マイクロサービス基盤',
      category: 'infrastructure',
      description: 'Kubernetesを活用したマイクロサービスアーキテクチャの設計・構築。CI/CDパイプライン自動化。',
      image: 'https://via.placeholder.com/400x250/0ea5e9/ffffff?text=Microservices',
      technologies: ['Kubernetes', 'Docker', 'AWS EKS', 'Jenkins', 'Monitoring'],
      features: ['自動スケーリング', '障害自動復旧', 'ゼロダウンタイム'],
      duration: '4ヶ月',
      teamSize: '3人',
      impact: '運用コスト50%削減',
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      id: 3,
      title: 'データ分析ダッシュボード',
      category: 'web',
      description: 'Vue.js × Pythonで構築したリアルタイムデータ可視化システム。機械学習による予測分析機能付き。',
      image: 'https://via.placeholder.com/400x250/10b981/ffffff?text=Analytics',
      technologies: ['Vue.js', 'Python', 'D3.js', 'TensorFlow', 'Redis'],
      features: ['リアルタイム可視化', '予測分析', 'カスタムレポート'],
      duration: '3ヶ月',
      teamSize: '4人',
      impact: '意思決定速度200%向上',
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      id: 4,
      title: 'レガシーシステム移行',
      category: 'migration',
      description: '20年稼働の基幹システムをクラウドネイティブアーキテクチャへ段階的移行。データ整合性を保ちながら実現。',
      image: 'https://via.placeholder.com/400x250/8b5cf6/ffffff?text=Migration',
      technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'AWS', 'Apache Kafka'],
      features: ['段階的移行', 'データ整合性保証', 'パフォーマンス向上'],
      duration: '12ヶ月',
      teamSize: '8人',
      impact: '処理速度500%向上',
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      id: 5,
      title: 'モバイルアプリ開発',
      category: 'mobile',
      description: 'React Nativeを使用したクロスプラットフォームアプリ。プッシュ通知、オフライン機能を実装。',
      image: 'https://via.placeholder.com/400x250/f59e0b/ffffff?text=Mobile+App',
      technologies: ['React Native', 'Firebase', 'Redux', 'Push Notification'],
      features: ['オフライン対応', 'プッシュ通知', 'バイオメトリクス認証'],
      duration: '5ヶ月',
      teamSize: '3人',
      impact: 'ユーザー満足度95%',
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      id: 6,
      title: 'DevOpsパイプライン構築',
      category: 'infrastructure',
      description: 'GitLab CI/CDとTerraformを活用した完全自動化デプロイメントパイプラインの構築。',
      image: 'https://via.placeholder.com/400x250/ef4444/ffffff?text=DevOps',
      technologies: ['GitLab CI/CD', 'Terraform', 'Ansible', 'AWS', 'Monitoring'],
      features: ['自動テスト', 'インフラ自動化', '品質ゲート'],
      duration: '2ヶ月',
      teamSize: '2人',
      impact: 'デプロイ時間90%短縮',
      demoUrl: '#',
      githubUrl: '#'
    }
  ];

  const filters = [
    { key: 'all', label: 'すべて' },
    { key: 'web', label: 'Webアプリ' },
    { key: 'infrastructure', label: 'インフラ' },
    { key: 'migration', label: 'システム移行' },
    { key: 'mobile', label: 'モバイル' }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="portfolio" className="portfolio section">
      <div className="container">
        <h2 className="section-title">ポートフォリオ</h2>
        <p className="portfolio-intro">
          これまでに手がけた主要プロジェクトの一部をご紹介いたします
        </p>

        <div className="filter-buttons">
          {filters.map((filter) => (
            <button
              key={filter.key}
              className={`filter-btn ${activeFilter === filter.key ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.key)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <div className="project-links">
                    <a href={project.demoUrl} className="project-link" aria-label="デモを見る">
                      <ExternalLink size={20} />
                    </a>
                    <a href={project.githubUrl} className="project-link" aria-label="GitHubを見る">
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>

              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                <div className="project-technologies">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="project-features">
                  <h4>主な機能</h4>
                  <ul>
                    {project.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="project-stats">
                  <div className="stat">
                    <Calendar size={16} />
                    <span>{project.duration}</span>
                  </div>
                  <div className="stat">
                    <Users size={16} />
                    <span>{project.teamSize}</span>
                  </div>
                  <div className="stat">
                    <Zap size={16} />
                    <span>{project.impact}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .portfolio {
          background: var(--bg-secondary);
        }

        .portfolio-intro {
          text-align: center;
          font-size: 1.1rem;
          color: var(--text-secondary);
          margin-bottom: 3rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .filter-buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 0.75rem 1.5rem;
          border: 2px solid var(--border-color);
          background: white;
          color: var(--text-secondary);
          border-radius: 2rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-btn:hover {
          border-color: var(--primary-color);
          color: var(--primary-color);
        }

        .filter-btn.active {
          background: var(--primary-color);
          border-color: var(--primary-color);
          color: white;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 2rem;
        }

        .project-card {
          background: white;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: var(--shadow-md);
          transition: all 0.3s ease;
        }

        .project-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-lg);
        }

        .project-image {
          position: relative;
          height: 250px;
          overflow: hidden;
        }

        .project-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .project-card:hover .project-image img {
          transform: scale(1.05);
        }

        .project-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .project-card:hover .project-overlay {
          opacity: 1;
        }

        .project-links {
          display: flex;
          gap: 1rem;
        }

        .project-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          background: white;
          border-radius: 50%;
          color: var(--text-primary);
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .project-link:hover {
          background: var(--primary-color);
          color: white;
          transform: scale(1.1);
        }

        .project-content {
          padding: 2rem;
        }

        .project-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .project-description {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .project-technologies {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .tech-badge {
          background: var(--primary-color);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .project-features {
          margin-bottom: 1.5rem;
        }

        .project-features h4 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
        }

        .project-features ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .project-features li {
          position: relative;
          padding-left: 1.5rem;
          margin-bottom: 0.5rem;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .project-features li::before {
          content: '•';
          position: absolute;
          left: 0;
          color: var(--primary-color);
          font-weight: bold;
        }

        .project-stats {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .stat {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .stat svg {
          color: var(--primary-color);
        }

        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }

          .project-card {
            margin: 0 0.5rem;
          }

          .filter-buttons {
            padding: 0 1rem;
          }

          .filter-btn {
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Portfolio;