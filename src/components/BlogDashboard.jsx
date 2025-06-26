import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Eye, 
  Heart, 
  Share2, 
  Calendar,
  Search,
  Filter,
  Edit3,
  Trash2,
  Plus,
  Download,
  Upload,
  Target,
  Award,
  Clock
} from 'lucide-react';

const BlogDashboard = ({ savedPosts = [], onEditPost, onDeletePost }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [analytics, setAnalytics] = useState({
    totalPosts: 0,
    totalViews: 0,
    totalEngagement: 0,
    avgSeoScore: 0
  });

  // ダミーデータでアナリティクスを生成
  useEffect(() => {
    const mockAnalytics = {
      totalPosts: savedPosts.length,
      totalViews: savedPosts.length * Math.floor(Math.random() * 1000) + 500,
      totalEngagement: Math.floor(Math.random() * 50) + 20,
      avgSeoScore: savedPosts.length > 0 
        ? Math.floor(savedPosts.reduce((sum, post) => sum + (post.seoScore || 75), 0) / savedPosts.length)
        : 0
    };
    setAnalytics(mockAnalytics);
  }, [savedPosts]);

  const filteredPosts = savedPosts
    .filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(post => 
      filterCategory === 'all' || post.category === filterCategory
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'seo':
          return (b.seoScore || 0) - (a.seoScore || 0);
        default:
          return 0;
      }
    });

  const categories = ['all', ...new Set(savedPosts.map(post => post.category))];

  const handleSelectPost = (postId) => {
    setSelectedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const handleSelectAll = () => {
    setSelectedPosts(
      selectedPosts.length === filteredPosts.length 
        ? [] 
        : filteredPosts.map(post => post.id)
    );
  };

  const exportSelectedPosts = () => {
    const postsToExport = savedPosts.filter(post => selectedPosts.includes(post.id));
    const exportData = JSON.stringify(postsToExport, null, 2);
    
    const blob = new Blob([exportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `blog-posts-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const mockPerformanceData = [
    { month: '1月', views: 1200, engagement: 85 },
    { month: '2月', views: 1450, engagement: 92 },
    { month: '3月', views: 1680, engagement: 78 },
    { month: '4月', views: 1920, engagement: 96 },
    { month: '5月', views: 2150, engagement: 89 },
    { month: '6月', views: 2400, engagement: 94 }
  ];

  return (
    <div className="blog-dashboard">
      <div className="dashboard-header">
        <h2 className="dashboard-title gradient-text">
          <BarChart3 size={32} />
          ブログ管理ダッシュボード
        </h2>
        <p className="dashboard-description">
          AIで生成したブログ記事の管理と分析
        </p>
      </div>

      {/* Analytics Cards */}
      <div className="analytics-grid">
        <div className="analytics-card glass-effect animate-float">
          <div className="card-icon">
            <Eye size={24} />
          </div>
          <div className="card-content">
            <h3>総閲覧数</h3>
            <p className="metric-value">{analytics.totalViews.toLocaleString()}</p>
            <span className="metric-change positive">+15.3%</span>
          </div>
        </div>

        <div className="analytics-card glass-effect animate-float">
          <div className="card-icon">
            <Heart size={24} />
          </div>
          <div className="card-content">
            <h3>エンゲージメント率</h3>
            <p className="metric-value">{analytics.totalEngagement}%</p>
            <span className="metric-change positive">+8.7%</span>
          </div>
        </div>

        <div className="analytics-card glass-effect animate-float">
          <div className="card-icon">
            <Target size={24} />
          </div>
          <div className="card-content">
            <h3>平均SEOスコア</h3>
            <p className="metric-value">{analytics.avgSeoScore}</p>
            <span className="metric-change positive">+12.1%</span>
          </div>
        </div>

        <div className="analytics-card glass-effect animate-float">
          <div className="card-icon">
            <Award size={24} />
          </div>
          <div className="card-content">
            <h3>総記事数</h3>
            <p className="metric-value">{analytics.totalPosts}</p>
            <span className="metric-change positive">+{savedPosts.length}</span>
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="performance-chart glass-effect">
        <h3>
          <TrendingUp size={24} />
          パフォーマンス推移
        </h3>
        <div className="chart-container">
          <div className="chart-grid">
            {mockPerformanceData.map((data, index) => (
              <div key={index} className="chart-bar">
                <div 
                  className="bar views"
                  style={{ height: `${(data.views / 2500) * 100}%` }}
                  title={`${data.month}: ${data.views} views`}
                ></div>
                <div 
                  className="bar engagement"
                  style={{ height: `${data.engagement}%` }}
                  title={`${data.month}: ${data.engagement}% engagement`}
                ></div>
                <span className="bar-label">{data.month}</span>
              </div>
            ))}
          </div>
          <div className="chart-legend">
            <div className="legend-item">
              <div className="legend-color views"></div>
              <span>閲覧数</span>
            </div>
            <div className="legend-item">
              <div className="legend-color engagement"></div>
              <span>エンゲージメント率</span>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Management */}
      <div className="posts-management glass-effect">
        <div className="management-header">
          <h3>
            <Edit3 size={24} />
            記事管理
          </h3>
          
          <div className="management-controls">
            <div className="search-box">
              <Search size={18} />
              <input
                type="text"
                placeholder="記事を検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select 
              value={filterCategory} 
              onChange={(e) => setFilterCategory(e.target.value)}
              className="filter-select"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'すべてのカテゴリー' : category}
                </option>
              ))}
            </select>

            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="newest">新しい順</option>
              <option value="oldest">古い順</option>
              <option value="title">タイトル順</option>
              <option value="seo">SEOスコア順</option>
            </select>
          </div>
        </div>

        {selectedPosts.length > 0 && (
          <div className="bulk-actions">
            <span>{selectedPosts.length}件選択中</span>
            <button 
              className="bulk-action-btn glass-effect"
              onClick={exportSelectedPosts}
            >
              <Download size={16} />
              エクスポート
            </button>
            <button 
              className="bulk-action-btn glass-effect danger"
              onClick={() => {
                selectedPosts.forEach(postId => onDeletePost?.(postId));
                setSelectedPosts([]);
              }}
            >
              <Trash2 size={16} />
              削除
            </button>
          </div>
        )}

        <div className="posts-table">
          <div className="table-header">
            <label className="select-all">
              <input
                type="checkbox"
                checked={selectedPosts.length === filteredPosts.length && filteredPosts.length > 0}
                onChange={handleSelectAll}
              />
              <span>すべて選択</span>
            </label>
            <span>タイトル</span>
            <span>カテゴリー</span>
            <span>作成日</span>
            <span>SEOスコア</span>
            <span>アクション</span>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="empty-state">
              <Edit3 size={48} />
              <h4>記事がありません</h4>
              <p>まずは新しいブログ記事を生成してみましょう</p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <div key={post.id} className="table-row">
                <label className="row-select">
                  <input
                    type="checkbox"
                    checked={selectedPosts.includes(post.id)}
                    onChange={() => handleSelectPost(post.id)}
                  />
                </label>
                
                <div className="post-info">
                  <h4>{post.title}</h4>
                  <p>{post.excerpt}</p>
                  {post.keywords && (
                    <div className="post-keywords">
                      {post.keywords.slice(0, 3).map((keyword, index) => (
                        <span key={index} className="keyword-tag">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <span className="category-badge">{post.category}</span>
                
                <div className="date-info">
                  <Clock size={14} />
                  {formatDate(post.createdAt)}
                </div>

                <div className={`seo-score ${post.seoScore >= 80 ? 'good' : 'fair'}`}>
                  {post.seoScore}点
                </div>

                <div className="row-actions">
                  <button 
                    className="action-btn glass-effect"
                    onClick={() => onEditPost?.(post)}
                    title="編集"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button 
                    className="action-btn glass-effect danger"
                    onClick={() => onDeletePost?.(post.id)}
                    title="削除"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <style jsx>{`
        .blog-dashboard {
          padding: 2rem 0;
          background: var(--bg-secondary);
          min-height: 100vh;
        }

        .dashboard-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .dashboard-title {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .dashboard-description {
          font-size: 1.1rem;
          color: var(--text-secondary);
        }

        .analytics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .analytics-card {
          padding: 2rem;
          border-radius: 1rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: all var(--animation-speed) ease;
          animation-delay: calc(var(--index, 0) * 0.1s);
        }

        .analytics-card:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: var(--shadow-glow);
        }

        .card-icon {
          background: var(--gradient-primary);
          color: white;
          padding: 1rem;
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card-content h3 {
          margin: 0 0 0.5rem 0;
          color: var(--text-secondary);
          font-size: 0.9rem;
          font-weight: 500;
        }

        .metric-value {
          margin: 0 0 0.25rem 0;
          font-size: 2rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .metric-change {
          font-size: 0.8rem;
          font-weight: 600;
        }

        .metric-change.positive {
          color: var(--accent-secondary);
        }

        .performance-chart {
          padding: 2rem;
          border-radius: 1.5rem;
          margin-bottom: 3rem;
        }

        .performance-chart h3 {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 2rem;
          color: var(--text-primary);
        }

        .chart-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .chart-grid {
          display: flex;
          align-items: end;
          gap: 1rem;
          height: 200px;
          padding: 1rem;
          background: var(--bg-glass);
          border-radius: 1rem;
          backdrop-filter: blur(var(--blur-strength));
        }

        .chart-bar {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          height: 100%;
        }

        .bar {
          width: 20px;
          border-radius: 4px 4px 0 0;
          transition: all var(--animation-speed) ease;
          position: relative;
        }

        .bar.views {
          background: var(--gradient-primary);
          margin-right: 4px;
        }

        .bar.engagement {
          background: var(--gradient-secondary);
          margin-left: 4px;
        }

        .bar:hover {
          transform: scaleY(1.1);
          filter: brightness(1.2);
        }

        .bar-label {
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin-top: auto;
        }

        .chart-legend {
          display: flex;
          justify-content: center;
          gap: 2rem;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .legend-color {
          width: 16px;
          height: 16px;
          border-radius: 4px;
        }

        .legend-color.views {
          background: var(--gradient-primary);
        }

        .legend-color.engagement {
          background: var(--gradient-secondary);
        }

        .posts-management {
          padding: 2rem;
          border-radius: 1.5rem;
        }

        .management-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .management-header h3 {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-primary);
          margin: 0;
        }

        .management-controls {
          display: flex;
          gap: 1rem;
          align-items: center;
          flex-wrap: wrap;
        }

        .search-box {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-box svg {
          position: absolute;
          left: 1rem;
          color: var(--text-secondary);
        }

        .search-box input {
          padding: 0.75rem 1rem 0.75rem 3rem;
          border: 2px solid var(--border-glass);
          border-radius: 2rem;
          background: var(--bg-glass);
          backdrop-filter: blur(var(--blur-strength));
          color: var(--text-primary);
          min-width: 200px;
        }

        .filter-select,
        .sort-select {
          padding: 0.75rem 1rem;
          border: 2px solid var(--border-glass);
          border-radius: 0.5rem;
          background: var(--bg-glass);
          backdrop-filter: blur(var(--blur-strength));
          color: var(--text-primary);
        }

        .bulk-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: var(--bg-glass);
          border-radius: 0.5rem;
          margin-bottom: 1rem;
          backdrop-filter: blur(var(--blur-strength));
        }

        .bulk-action-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 0.5rem;
          background: var(--primary-color);
          color: white;
          cursor: pointer;
          font-size: 0.9rem;
          transition: all var(--animation-speed) ease;
        }

        .bulk-action-btn.danger {
          background: #ef4444;
        }

        .bulk-action-btn:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-glow);
        }

        .posts-table {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .table-header {
          display: grid;
          grid-template-columns: auto 1fr auto auto auto auto;
          gap: 1rem;
          padding: 1rem;
          background: var(--bg-glass);
          border-radius: 0.5rem;
          font-weight: 600;
          color: var(--text-primary);
          backdrop-filter: blur(var(--blur-strength));
        }

        .select-all {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
        }

        .table-row {
          display: grid;
          grid-template-columns: auto 1fr auto auto auto auto;
          gap: 1rem;
          padding: 1.5rem;
          background: var(--bg-glass);
          border-radius: 1rem;
          backdrop-filter: blur(var(--blur-strength));
          transition: all var(--animation-speed) ease;
          align-items: center;
        }

        .table-row:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-glow);
        }

        .row-select {
          display: flex;
          align-items: center;
          cursor: pointer;
        }

        .post-info h4 {
          margin: 0 0 0.5rem 0;
          color: var(--text-primary);
          font-size: 1.1rem;
        }

        .post-info p {
          margin: 0 0 0.5rem 0;
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.4;
        }

        .post-keywords {
          display: flex;
          gap: 0.25rem;
          flex-wrap: wrap;
        }

        .keyword-tag {
          background: var(--primary-color);
          color: white;
          padding: 0.15rem 0.5rem;
          border-radius: 1rem;
          font-size: 0.7rem;
          font-weight: 500;
        }

        .category-badge {
          background: var(--accent-color);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 1rem;
          font-size: 0.8rem;
          font-weight: 600;
          text-align: center;
        }

        .date-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .seo-score {
          padding: 0.5rem 1rem;
          border-radius: 1rem;
          font-weight: 600;
          font-size: 0.9rem;
          text-align: center;
        }

        .seo-score.good {
          background: var(--accent-secondary);
          color: white;
        }

        .seo-score.fair {
          background: #f59e0b;
          color: white;
        }

        .row-actions {
          display: flex;
          gap: 0.5rem;
        }

        .action-btn {
          padding: 0.5rem;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          color: var(--text-primary);
          transition: all var(--animation-speed) ease;
        }

        .action-btn.danger {
          color: #ef4444;
        }

        .action-btn:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .empty-state {
          text-align: center;
          padding: 3rem;
          color: var(--text-secondary);
        }

        .empty-state svg {
          margin-bottom: 1rem;
          opacity: 0.5;
        }

        .empty-state h4 {
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }

        @media (max-width: 768px) {
          .analytics-grid {
            grid-template-columns: 1fr;
          }

          .management-header {
            flex-direction: column;
            align-items: stretch;
          }

          .management-controls {
            flex-direction: column;
          }

          .table-header,
          .table-row {
            grid-template-columns: 1fr;
            gap: 0.5rem;
          }

          .table-header {
            display: none;
          }

          .table-row {
            padding: 1rem;
          }

          .category-badge,
          .date-info,
          .seo-score,
          .row-actions {
            justify-self: start;
          }
        }
      `}</style>
    </div>
  );
};

export default BlogDashboard;