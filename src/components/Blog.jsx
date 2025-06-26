import React from 'react';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'React 18の新機能とパフォーマンス最適化',
      excerpt: 'React 18で導入されたConcurrent Featuresやサスペンス、バッチ処理の改善について詳しく解説します。実際のプロジェクトでの活用例も紹介。',
      date: '2024-06-15',
      readTime: '8分',
      category: 'フロントエンド',
      tags: ['React', 'JavaScript', 'パフォーマンス'],
      image: 'https://via.placeholder.com/400x250/61dafb/ffffff?text=React+18',
      featured: true
    },
    {
      id: 2,
      title: 'Kubernetes完全攻略：本番環境での運用ノウハウ',
      excerpt: 'Kubernetesクラスターの設計から運用まで、実際の現場で培った知見をまとめました。トラブルシューティングのポイントも解説。',
      date: '2024-06-10',
      readTime: '12分',
      category: 'インフラ',
      tags: ['Kubernetes', 'DevOps', '運用'],
      image: 'https://via.placeholder.com/400x250/2496ed/ffffff?text=Kubernetes'
    },
    {
      id: 3,
      title: 'TypeScriptとGraphQLで作る型安全なAPI',
      excerpt: 'TypeScriptとGraphQLを組み合わせることで、フロントエンドからバックエンドまで一貫した型安全性を実現する方法について説明します。',
      date: '2024-06-05',
      readTime: '10分',
      category: 'バックエンド',
      tags: ['TypeScript', 'GraphQL', 'API設計'],
      image: 'https://via.placeholder.com/400x250/3178c6/ffffff?text=TypeScript'
    },
    {
      id: 4,
      title: 'AWS Lambda関数の最適化とコスト削減',
      excerpt: 'サーバーレスアーキテクチャにおけるLambda関数の性能チューニングとコスト最適化のベストプラクティスを紹介します。',
      date: '2024-05-28',
      readTime: '7分',
      category: 'クラウド',
      tags: ['AWS', 'Lambda', 'サーバーレス'],
      image: 'https://via.placeholder.com/400x250/ff9900/ffffff?text=AWS+Lambda'
    },
    {
      id: 5,
      title: 'CI/CDパイプライン設計の勘所',
      excerpt: '効率的で信頼性の高いCI/CDパイプラインの設計原則と、実装時に気をつけるべきポイントについて詳しく解説します。',
      date: '2024-05-20',
      readTime: '9分',
      category: 'DevOps',
      tags: ['CI/CD', 'GitLab', '自動化'],
      image: 'https://via.placeholder.com/400x250/6366f1/ffffff?text=CI/CD'
    },
    {
      id: 6,
      title: 'セキュアなWebアプリケーション開発',
      excerpt: 'OWASP Top 10を踏まえたセキュリティ対策と、開発工程に組み込むべきセキュリティチェックについて実例を交えて説明します。',
      date: '2024-05-15',
      readTime: '11分',
      category: 'セキュリティ',
      tags: ['セキュリティ', 'OWASP', 'Web開発'],
      image: 'https://via.placeholder.com/400x250/dc2626/ffffff?text=Security'
    }
  ];

  const categories = ['すべて', 'フロントエンド', 'バックエンド', 'インフラ', 'DevOps', 'クラウド', 'セキュリティ'];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <section id="blog" className="blog section">
      <div className="container">
        <h2 className="section-title">技術ブログ</h2>
        <p className="blog-intro">
          最新の技術動向や実際のプロジェクトで得た知見を共有しています
        </p>

        {featuredPost && (
          <div className="featured-post">
            <div className="featured-content">
              <div className="featured-text">
                <div className="post-meta">
                  <span className="post-category featured-category">
                    <Tag size={16} />
                    {featuredPost.category}
                  </span>
                  <span className="post-date">
                    <Calendar size={16} />
                    {formatDate(featuredPost.date)}
                  </span>
                  <span className="post-time">
                    <Clock size={16} />
                    {featuredPost.readTime}
                  </span>
                </div>
                <h3 className="featured-title">{featuredPost.title}</h3>
                <p className="featured-excerpt">{featuredPost.excerpt}</p>
                <div className="featured-tags">
                  {featuredPost.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <a href={`#blog-${featuredPost.id}`} className="read-more-btn">
                  記事を読む
                  <ArrowRight size={16} />
                </a>
              </div>
              <div className="featured-image">
                <img src={featuredPost.image} alt={featuredPost.title} />
              </div>
            </div>
          </div>
        )}

        <div className="blog-posts">
          <div className="posts-grid">
            {regularPosts.map((post) => (
              <article key={post.id} className="post-card">
                <div className="post-image">
                  <img src={post.image} alt={post.title} />
                  <div className="post-category-badge">
                    {post.category}
                  </div>
                </div>
                <div className="post-content">
                  <div className="post-meta">
                    <span className="post-date">
                      <Calendar size={14} />
                      {formatDate(post.date)}
                    </span>
                    <span className="post-time">
                      <Clock size={14} />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="post-title">{post.title}</h3>
                  <p className="post-excerpt">{post.excerpt}</p>
                  <div className="post-tags">
                    {post.tags.map((tag, index) => (
                      <span key={index} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a href={`#blog-${post.id}`} className="read-more">
                    続きを読む
                    <ArrowRight size={14} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="blog-cta">
          <h3>すべての記事を見る</h3>
          <p>技術に関する記事を定期的に更新しています。最新情報をお見逃しなく！</p>
          <a href="#contact" className="btn btn-primary">
            更新通知を受け取る
          </a>
        </div>
      </div>

      <style jsx>{`
        .blog {
          background: var(--bg-primary);
        }

        .blog-intro {
          text-align: center;
          font-size: 1.1rem;
          color: var(--text-secondary);
          margin-bottom: 3rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .featured-post {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 1.5rem;
          padding: 3rem;
          margin-bottom: 4rem;
          color: white;
          position: relative;
          overflow: hidden;
        }

        .featured-post::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.3);
          z-index: 1;
        }

        .featured-content {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
        }

        .post-meta {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }

        .post-meta > span {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          opacity: 0.9;
        }

        .featured-category {
          background: rgba(255, 255, 255, 0.2);
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          backdrop-filter: blur(10px);
        }

        .featured-title {
          font-size: 2.5rem;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 1rem;
        }

        .featured-excerpt {
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          opacity: 0.9;
        }

        .featured-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }

        .tag {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.8rem;
          font-weight: 500;
          backdrop-filter: blur(10px);
        }

        .read-more-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: white;
          color: var(--primary-color);
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .read-more-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }

        .featured-image {
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .featured-image img {
          width: 100%;
          height: 300px;
          object-fit: cover;
        }

        .posts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
        }

        .post-card {
          background: white;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: var(--shadow-md);
          transition: all 0.3s ease;
        }

        .post-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }

        .post-image {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .post-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .post-card:hover .post-image img {
          transform: scale(1.05);
        }

        .post-category-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: var(--primary-color);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 1rem;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .post-content {
          padding: 1.5rem;
        }

        .post-content .post-meta {
          color: var(--text-secondary);
          margin-bottom: 1rem;
        }

        .post-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1rem;
          line-height: 1.3;
        }

        .post-excerpt {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .post-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .post-tags .tag {
          background: var(--bg-secondary);
          color: var(--text-secondary);
        }

        .read-more {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--primary-color);
          text-decoration: none;
          font-weight: 600;
          transition: all 0.2s ease;
        }

        .read-more:hover {
          gap: 0.75rem;
        }

        .blog-cta {
          text-align: center;
          background: var(--bg-secondary);
          padding: 3rem;
          border-radius: 1.5rem;
          margin-top: 4rem;
        }

        .blog-cta h3 {
          font-size: 2rem;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .blog-cta p {
          color: var(--text-secondary);
          margin-bottom: 2rem;
          font-size: 1.1rem;
        }

        @media (max-width: 768px) {
          .featured-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .featured-title {
            font-size: 2rem;
          }

          .featured-post {
            padding: 2rem;
          }

          .posts-grid {
            grid-template-columns: 1fr;
          }

          .post-meta {
            flex-direction: column;
            gap: 0.5rem;
          }

          .blog-cta {
            padding: 2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Blog;