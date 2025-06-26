import React, { useState } from 'react';
import BlogGenerator from './BlogGenerator';
import BlogDashboard from './BlogDashboard';
import BlogEditor from './BlogEditor';
import { 
  PenTool, 
  BarChart3, 
  Edit3, 
  ArrowLeft,
  Settings,
  Download,
  Upload,
  Trash2,
  RefreshCw
} from 'lucide-react';

const BlogTools = () => {
  const [activeView, setActiveView] = useState('generator');
  const [savedPosts, setSavedPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  const handleSavePost = (post) => {
    setSavedPosts(prev => {
      const existingIndex = prev.findIndex(p => p.id === post.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = post;
        return updated;
      } else {
        return [...prev, { ...post, id: Date.now() }];
      }
    });
    
    if (activeView === 'editor') {
      setActiveView('dashboard');
      setEditingPost(null);
    }
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setActiveView('editor');
  };

  const handleDeletePost = (postId) => {
    if (confirm('この記事を削除してもよろしいですか？')) {
      setSavedPosts(prev => prev.filter(p => p.id !== postId));
    }
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
    setActiveView('dashboard');
  };

  const exportAllPosts = () => {
    const exportData = {
      exportDate: new Date().toISOString(),
      posts: savedPosts,
      metadata: {
        totalPosts: savedPosts.length,
        categories: [...new Set(savedPosts.map(p => p.category))],
        averageSeoScore: savedPosts.length > 0 
          ? Math.floor(savedPosts.reduce((sum, p) => sum + (p.seoScore || 0), 0) / savedPosts.length)
          : 0
      }
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `blog-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importPosts = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importData = JSON.parse(e.target.result);
        if (importData.posts && Array.isArray(importData.posts)) {
          setSavedPosts(prev => [...prev, ...importData.posts]);
          alert(`${importData.posts.length}件の記事をインポートしました`);
        } else {
          alert('無効なファイル形式です');
        }
      } catch (error) {
        alert('ファイルの読み込みに失敗しました');
      }
    };
    reader.readAsText(file);
    
    // リセット
    event.target.value = '';
  };

  const clearAllPosts = () => {
    if (confirm('すべての記事を削除してもよろしいですか？この操作は取り消せません。')) {
      setSavedPosts([]);
      alert('すべての記事を削除しました');
    }
  };

  const renderNavigation = () => (
    <div className="blog-navigation glass-effect">
      <div className="nav-header">
        <h2 className="gradient-text">ブログ作成ツール</h2>
        <div className="nav-stats">
          <span className="stat">
            記事数: <strong>{savedPosts.length}</strong>
          </span>
          <span className="stat">
            平均SEO: <strong>
              {savedPosts.length > 0 
                ? Math.floor(savedPosts.reduce((sum, p) => sum + (p.seoScore || 0), 0) / savedPosts.length)
                : 0}点
            </strong>
          </span>
        </div>
      </div>

      <nav className="nav-menu">
        <button
          className={`nav-item ${activeView === 'generator' ? 'active' : ''}`}
          onClick={() => setActiveView('generator')}
        >
          <PenTool size={20} />
          <span>記事生成</span>
        </button>
        
        <button
          className={`nav-item ${activeView === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveView('dashboard')}
        >
          <BarChart3 size={20} />
          <span>ダッシュボード</span>
          {savedPosts.length > 0 && (
            <span className="badge">{savedPosts.length}</span>
          )}
        </button>

        {editingPost && (
          <button
            className={`nav-item ${activeView === 'editor' ? 'active' : ''}`}
            onClick={() => setActiveView('editor')}
          >
            <Edit3 size={20} />
            <span>エディタ</span>
          </button>
        )}
      </nav>

      <div className="nav-actions">
        <button 
          className="action-btn glass-effect"
          onClick={exportAllPosts}
          disabled={savedPosts.length === 0}
          title="記事をエクスポート"
        >
          <Download size={18} />
        </button>
        
        <label className="action-btn glass-effect" title="記事をインポート">
          <Upload size={18} />
          <input
            type="file"
            accept=".json"
            onChange={importPosts}
            style={{ display: 'none' }}
          />
        </label>

        <button 
          className="action-btn glass-effect danger"
          onClick={clearAllPosts}
          disabled={savedPosts.length === 0}
          title="すべての記事を削除"
        >
          <Trash2 size={18} />
        </button>

        <button 
          className="action-btn glass-effect"
          onClick={() => window.location.reload()}
          title="リフレッシュ"
        >
          <RefreshCw size={18} />
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeView) {
      case 'generator':
        return (
          <BlogGenerator 
            onPostGenerated={handleSavePost}
            savedPosts={savedPosts}
          />
        );
      
      case 'dashboard':
        return (
          <BlogDashboard
            savedPosts={savedPosts}
            onEditPost={handleEditPost}
            onDeletePost={handleDeletePost}
          />
        );
      
      case 'editor':
        return (
          <BlogEditor
            post={editingPost}
            onSave={handleSavePost}
            onCancel={handleCancelEdit}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <section className="blog-tools">
      <div className="container">
        {renderNavigation()}
        
        <div className="content-area">
          {activeView === 'editor' && (
            <div className="breadcrumb">
              <button 
                className="back-btn glass-effect"
                onClick={handleCancelEdit}
              >
                <ArrowLeft size={18} />
                ダッシュボードに戻る
              </button>
            </div>
          )}
          
          {renderContent()}
        </div>
      </div>

      <style jsx>{`
        .blog-tools {
          background: var(--bg-secondary);
          min-height: 100vh;
          padding: 2rem 0;
          position: relative;
        }

        .blog-tools::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%);
          pointer-events: none;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 2;
        }

        .blog-navigation {
          padding: 1.5rem;
          border-radius: 1.5rem;
          margin-bottom: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .nav-header {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .nav-header h2 {
          margin: 0;
          font-size: 1.8rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .nav-stats {
          display: flex;
          gap: 1rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .stat strong {
          color: var(--primary-color);
        }

        .nav-menu {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border: 2px solid var(--border-glass);
          border-radius: 2rem;
          background: transparent;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--animation-speed) ease;
          font-weight: 500;
          position: relative;
        }

        .nav-item:hover {
          background: var(--bg-glass);
          backdrop-filter: blur(var(--blur-strength));
          transform: translateY(-2px);
        }

        .nav-item.active {
          background: var(--gradient-primary);
          color: white;
          border-color: transparent;
          box-shadow: var(--shadow-glow);
        }

        .badge {
          background: rgba(255, 255, 255, 0.9);
          color: var(--primary-color);
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.2rem 0.5rem;
          border-radius: 1rem;
          margin-left: 0.5rem;
        }

        .nav-item.active .badge {
          background: rgba(255, 255, 255, 0.2);
          color: white;
        }

        .nav-actions {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .action-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border: none;
          border-radius: 50%;
          background: var(--bg-glass);
          backdrop-filter: blur(var(--blur-strength));
          color: var(--text-primary);
          cursor: pointer;
          transition: all var(--animation-speed) ease;
          position: relative;
        }

        .action-btn:hover:not(:disabled) {
          transform: translateY(-2px) scale(1.05);
          box-shadow: var(--shadow-glow);
        }

        .action-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .action-btn.danger:hover:not(:disabled) {
          background: #ef4444;
          color: white;
        }

        .content-area {
          position: relative;
        }

        .breadcrumb {
          margin-bottom: 2rem;
        }

        .back-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 2rem;
          background: var(--bg-glass);
          backdrop-filter: blur(var(--blur-strength));
          color: var(--text-primary);
          cursor: pointer;
          transition: all var(--animation-speed) ease;
          font-weight: 500;
        }

        .back-btn:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-glow);
          background: var(--primary-color);
          color: white;
        }

        @media (max-width: 768px) {
          .blog-navigation {
            flex-direction: column;
            align-items: stretch;
          }

          .nav-header {
            text-align: center;
          }

          .nav-menu {
            justify-content: center;
            flex-wrap: wrap;
          }

          .nav-item {
            flex: 1;
            min-width: 120px;
            justify-content: center;
          }

          .nav-actions {
            justify-content: center;
          }

          .container {
            padding: 0 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default BlogTools;