import React from 'react';
import { Monitor, Server, Cloud, Settings, Users, Zap } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Monitor size={48} />,
      title: 'Webアプリケーション開発',
      description: 'React、Vue.jsを使用したモダンなフロントエンドと、スケーラブルなバックエンドシステムの開発',
      features: [
        'レスポンシブWebデザイン',
        'SPA・PWAアプリケーション',
        'API設計・開発',
        'データベース設計'
      ],
      price: '¥500,000〜'
    },
    {
      icon: <Cloud size={48} />,
      title: 'クラウドインフラ構築',
      description: 'AWS、GCPを活用した高可用性・高性能なクラウドインフラの設計・構築・運用',
      features: [
        'クラウドアーキテクチャ設計',
        'CI/CDパイプライン構築',
        'コンテナ化・オーケストレーション',
        '監視・ログ管理システム'
      ],
      price: '¥300,000〜'
    },
    {
      icon: <Server size={48} />,
      title: 'システム統合・移行',
      description: 'レガシーシステムのモダナイゼーションや、異なるシステム間の統合プロジェクト',
      features: [
        'レガシーシステム分析',
        'マイクロサービス化',
        'データ移行計画・実行',
        'API統合'
      ],
      price: '¥800,000〜'
    },
    {
      icon: <Settings size={48} />,
      title: '技術コンサルティング',
      description: 'プロジェクト初期の技術選定から、開発プロセスの改善まで幅広いコンサルティング',
      features: [
        '技術選定アドバイス',
        'アーキテクチャレビュー',
        'コードレビュー',
        'チーム技術研修'
      ],
      price: '¥100,000〜/月'
    },
    {
      icon: <Users size={48} />,
      title: 'チーム開発支援',
      description: '開発チームのリード、プロジェクト管理、技術指導を通じたチーム生産性向上',
      features: [
        'チームリード・PM',
        'アジャイル導入支援',
        '開発プロセス改善',
        'メンタリング'
      ],
      price: '¥200,000〜/月'
    },
    {
      icon: <Zap size={48} />,
      title: 'パフォーマンス最適化',
      description: '既存システムの性能分析・改善、スケーラビリティの向上',
      features: [
        '性能分析・診断',
        'データベース最適化',
        'キャッシュ戦略',
        '負荷分散設計'
      ],
      price: '¥400,000〜'
    }
  ];

  return (
    <section id="services" className="services section">
      <div className="container">
        <h2 className="section-title">サービス</h2>
        <p className="services-intro">
          豊富な経験と最新技術を活かし、お客様のビジネス課題に最適なソリューションを提供いたします
        </p>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">
                {service.icon}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              
              <div className="service-features">
                <h4>主な内容</h4>
                <ul>
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>{feature}</li>
                  ))}
                </ul>
              </div>
              
              <div className="service-price">
                <span className="price-label">参考価格</span>
                <span className="price-value">{service.price}</span>
              </div>
              
              <a href="#contact" className="service-cta btn btn-primary">
                お問い合わせ
              </a>
            </div>
          ))}
        </div>
        
        <div className="services-note">
          <p>
            ※ 価格は参考価格です。プロジェクトの規模・複雑さにより変動いたします。
            <br />
            まずはお気軽にご相談ください。無料でお見積もりいたします。
          </p>
        </div>
      </div>

      <style jsx>{`
        .services {
          background: var(--bg-primary);
        }

        .services-intro {
          text-align: center;
          font-size: 1.1rem;
          color: var(--text-secondary);
          margin-bottom: 3rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .service-card {
          background: var(--bg-glass);
          backdrop-filter: blur(var(--blur-strength));
          border: 1px solid var(--border-glass);
          border-radius: 1.5rem;
          padding: 2rem;
          box-shadow: var(--shadow-glass);
          transition: all var(--animation-speed) cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }

        .service-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: var(--gradient-primary);
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }

        .service-card:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: var(--shadow-glow);
          border-color: rgba(255, 255, 255, 0.4);
        }

        .service-icon {
          color: var(--primary-color);
          margin-bottom: 1.5rem;
          background: rgba(37, 99, 235, 0.1);
          width: 80px;
          height: 80px;
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .service-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .service-description {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1.5rem;
          flex-grow: 1;
        }

        .service-features {
          margin-bottom: 2rem;
        }

        .service-features h4 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
        }

        .service-features ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .service-features li {
          position: relative;
          padding-left: 1.5rem;
          margin-bottom: 0.5rem;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .service-features li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: var(--primary-color);
          font-weight: bold;
        }

        .service-price {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1rem;
          background: var(--bg-secondary);
          border-radius: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .price-label {
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-bottom: 0.25rem;
        }

        .price-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary-color);
        }

        .service-cta {
          width: 100%;
          justify-content: center;
        }

        .services-note {
          background: var(--bg-secondary);
          padding: 2rem;
          border-radius: 1rem;
          text-align: center;
        }

        .services-note p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr;
          }
          
          .service-card {
            padding: 1.5rem;
          }
          
          .services-note {
            padding: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Services;