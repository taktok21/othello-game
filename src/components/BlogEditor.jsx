import React, { useState, useEffect } from 'react';
import { 
  Save, 
  Eye, 
  Type, 
  Image, 
  Link, 
  Bold, 
  Italic, 
  List,
  Quote,
  Code,
  Heading,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  Search,
  Target,
  TrendingUp
} from 'lucide-react';

const BlogEditor = ({ post, onSave, onCancel }) => {
  const [editedPost, setEditedPost] = useState({
    title: '',
    excerpt: '',
    content: '',
    keywords: [],
    category: 'technology',
    ...post
  });

  const [isPreview, setIsPreview] = useState(false);
  const [seoAnalysis, setSeoAnalysis] = useState({
    score: 0,
    suggestions: []
  });

  useEffect(() => {
    analyzeSEO();
  }, [editedPost.title, editedPost.content, editedPost.keywords]);

  const analyzeSEO = () => {
    let score = 0;
    const suggestions = [];

    // タイトル分析
    if (editedPost.title.length >= 30 && editedPost.title.length <= 60) {
      score += 20;
    } else {
      suggestions.push('タイトルは30-60文字が理想的です');
    }

    // メタディスクリプション分析
    if (editedPost.excerpt.length >= 120 && editedPost.excerpt.length <= 160) {
      score += 15;
    } else {
      suggestions.push('メタディスクリプションは120-160文字が理想的です');
    }

    // コンテンツ長分析
    if (editedPost.content.length >= 1000) {
      score += 25;
    } else {
      suggestions.push('コンテンツは1000文字以上が推奨されます');
    }

    // キーワード分析
    if (editedPost.keywords.length >= 3) {
      score += 20;
    } else {
      suggestions.push('3つ以上のキーワードを設定してください');
    }

    // 見出し分析
    const headingCount = (editedPost.content.match(/#{1,6}\s/g) || []).length;
    if (headingCount >= 3) {
      score += 10;
    } else {
      suggestions.push('3つ以上の見出しを使用してください');
    }

    // 内部リンク分析
    const linkCount = (editedPost.content.match(/\[.*?\]\(.*?\)/g) || []).length;
    if (linkCount >= 2) {
      score += 10;
    } else {
      suggestions.push('内部リンクを追加してください');
    }

    setSeoAnalysis({ score, suggestions });
  };

  const handleInputChange = (field, value) => {
    if (field === 'keywords') {
      setEditedPost(prev => ({
        ...prev,
        keywords: value.split(',').map(k => k.trim()).filter(k => k)
      }));
    } else {
      setEditedPost(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const insertFormatting = (format) => {
    const textarea = document.getElementById('content-textarea');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = editedPost.content.substring(start, end);
    
    let formattedText = '';
    
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText || 'テキスト'}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText || 'テキスト'}*`;
        break;
      case 'heading':
        formattedText = `## ${selectedText || '見出し'}`;
        break;
      case 'list':
        formattedText = `- ${selectedText || 'リストアイテム'}`;
        break;
      case 'quote':
        formattedText = `> ${selectedText || '引用文'}`;
        break;
      case 'code':
        formattedText = selectedText.includes('\n') 
          ? `\`\`\`\n${selectedText || 'コード'}\n\`\`\``
          : `\`${selectedText || 'コード'}\``;
        break;
      case 'link':
        formattedText = `[${selectedText || 'リンクテキスト'}](URL)`;
        break;
      default:
        return;
    }

    const newContent = 
      editedPost.content.substring(0, start) + 
      formattedText + 
      editedPost.content.substring(end);
    
    handleInputChange('content', newContent);
    
    // カーソル位置を調整
    setTimeout(() => {
      textarea.focus();
      const newPosition = start + formattedText.length;
      textarea.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  const renderMarkdown = (text) => {
    return text
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>')
      .replace(/`([^`]*)`/gim, '<code>$1</code>')
      .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
      .replace(/^- (.*$)/gim, '<li>$1</li>')
      .replace(/\[([^\]]*)\]\(([^)]*)\)/gim, '<a href="$2">$1</a>')
      .replace(/\n/gim, '<br>');
  };

  const handleSave = () => {
    const updatedPost = {
      ...editedPost,
      seoScore: seoAnalysis.score,
      updatedAt: new Date().toISOString()
    };
    onSave(updatedPost);
  };

  return (
    <div className="blog-editor">
      <div className="editor-header glass-effect">
        <h2>
          <Type size={24} />
          ブログ記事エディタ
        </h2>
        
        <div className="editor-actions">
          <button
            className={`mode-toggle ${!isPreview ? 'active' : ''}`}
            onClick={() => setIsPreview(false)}
          >
            <Type size={18} />
            編集
          </button>
          <button
            className={`mode-toggle ${isPreview ? 'active' : ''}`}
            onClick={() => setIsPreview(true)}
          >
            <Eye size={18} />
            プレビュー
          </button>
          
          <div className="action-buttons">
            <button className="btn btn-secondary" onClick={onCancel}>
              キャンセル
            </button>
            <button className="btn btn-primary neon-glow" onClick={handleSave}>
              <Save size={18} />
              保存
            </button>
          </div>
        </div>
      </div>

      <div className="editor-layout">
        <div className="editor-main">
          {!isPreview ? (
            <div className="edit-mode">
              <div className="post-meta glass-effect">
                <div className="meta-group">
                  <label htmlFor="title">タイトル *</label>
                  <input
                    type="text"
                    id="title"
                    value={editedPost.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="記事のタイトルを入力..."
                  />
                  <span className="char-count">
                    {editedPost.title.length}/60文字
                  </span>
                </div>

                <div className="meta-group">
                  <label htmlFor="excerpt">メタディスクリプション</label>
                  <textarea
                    id="excerpt"
                    rows="3"
                    value={editedPost.excerpt}
                    onChange={(e) => handleInputChange('excerpt', e.target.value)}
                    placeholder="記事の要約を入力..."
                  />
                  <span className="char-count">
                    {editedPost.excerpt.length}/160文字
                  </span>
                </div>

                <div className="meta-row">
                  <div className="meta-group">
                    <label htmlFor="category">カテゴリー</label>
                    <select
                      id="category"
                      value={editedPost.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                    >
                      <optgroup label="テクノロジー">
                        <option value="technology">技術</option>
                        <option value="web-development">Web開発</option>
                        <option value="mobile">モバイル</option>
                        <option value="ai-ml">AI・機械学習</option>
                        <option value="devops">DevOps</option>
                        <option value="security">セキュリティ</option>
                      </optgroup>
                      <optgroup label="ライフスタイル">
                        <option value="pets">ペット・動物</option>
                        <option value="cooking">料理・グルメ</option>
                        <option value="travel">旅行・観光</option>
                        <option value="health">健康・フィットネス</option>
                        <option value="beauty">美容・ファッション</option>
                        <option value="home">住まい・インテリア</option>
                      </optgroup>
                      <optgroup label="趣味・エンターテイメント">
                        <option value="gaming">ゲーム</option>
                        <option value="movies">映画・ドラマ</option>
                        <option value="music">音楽</option>
                        <option value="sports">スポーツ</option>
                        <option value="books">読書・文学</option>
                        <option value="photography">写真・カメラ</option>
                      </optgroup>
                      <optgroup label="ビジネス・教育">
                        <option value="business">ビジネス</option>
                        <option value="education">教育・学習</option>
                        <option value="finance">金融・投資</option>
                        <option value="marketing">マーケティング</option>
                        <option value="career">キャリア・転職</option>
                      </optgroup>
                      <optgroup label="その他">
                        <option value="news">ニュース・時事</option>
                        <option value="environment">環境・エコ</option>
                        <option value="parenting">子育て・育児</option>
                        <option value="relationship">恋愛・人間関係</option>
                        <option value="personal">個人的な体験</option>
                        <option value="other">その他</option>
                      </optgroup>
                    </select>
                  </div>

                  <div className="meta-group">
                    <label htmlFor="keywords">キーワード</label>
                    <input
                      type="text"
                      id="keywords"
                      value={editedPost.keywords.join(', ')}
                      onChange={(e) => handleInputChange('keywords', e.target.value)}
                      placeholder="キーワード1, キーワード2, ..."
                    />
                  </div>
                </div>
              </div>

              <div className="toolbar glass-effect">
                <div className="toolbar-group">
                  <button 
                    className="toolbar-btn"
                    onClick={() => insertFormatting('bold')}
                    title="太字"
                  >
                    <Bold size={18} />
                  </button>
                  <button 
                    className="toolbar-btn"
                    onClick={() => insertFormatting('italic')}
                    title="斜体"
                  >
                    <Italic size={18} />
                  </button>
                  <button 
                    className="toolbar-btn"
                    onClick={() => insertFormatting('heading')}
                    title="見出し"
                  >
                    <Heading size={18} />
                  </button>
                </div>

                <div className="toolbar-group">
                  <button 
                    className="toolbar-btn"
                    onClick={() => insertFormatting('list')}
                    title="リスト"
                  >
                    <List size={18} />
                  </button>
                  <button 
                    className="toolbar-btn"
                    onClick={() => insertFormatting('quote')}
                    title="引用"
                  >
                    <Quote size={18} />
                  </button>
                  <button 
                    className="toolbar-btn"
                    onClick={() => insertFormatting('code')}
                    title="コード"
                  >
                    <Code size={18} />
                  </button>
                </div>

                <div className="toolbar-group">
                  <button 
                    className="toolbar-btn"
                    onClick={() => insertFormatting('link')}
                    title="リンク"
                  >
                    <Link size={18} />
                  </button>
                  <button className="toolbar-btn" title="画像">
                    <Image size={18} />
                  </button>
                </div>
              </div>

              <div className="content-editor glass-effect">
                <textarea
                  id="content-textarea"
                  value={editedPost.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  placeholder="記事の内容をMarkdown形式で入力してください..."
                  rows="20"
                />
                <div className="editor-stats">
                  <span>文字数: {editedPost.content.length}</span>
                  <span>単語数: {editedPost.content.split(/\s+/).filter(w => w).length}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="preview-mode glass-effect">
              <article className="preview-article">
                <header className="article-header">
                  <h1>{editedPost.title || 'タイトル未設定'}</h1>
                  <p className="article-meta">
                    <span className="category">{editedPost.category}</span>
                    <span className="reading-time">
                      約{Math.ceil(editedPost.content.length / 500)}分で読めます
                    </span>
                  </p>
                  
                  {editedPost.excerpt && (
                    <div className="article-excerpt">
                      {editedPost.excerpt}
                    </div>
                  )}

                  {editedPost.keywords.length > 0 && (
                    <div className="article-keywords">
                      {editedPost.keywords.map((keyword, index) => (
                        <span key={index} className="keyword-tag">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  )}
                </header>

                <div 
                  className="article-content"
                  dangerouslySetInnerHTML={{ 
                    __html: renderMarkdown(editedPost.content || '内容が入力されていません...') 
                  }}
                />
              </article>
            </div>
          )}
        </div>

        <div className="editor-sidebar">
          <div className="seo-panel glass-effect">
            <h3>
              <Target size={20} />
              SEO分析
            </h3>
            
            <div className="seo-score">
              <div className="score-circle">
                <div 
                  className="score-progress"
                  style={{ 
                    background: `conic-gradient(
                      ${seoAnalysis.score >= 80 ? '#10b981' : seoAnalysis.score >= 60 ? '#f59e0b' : '#ef4444'} ${seoAnalysis.score * 3.6}deg,
                      #e5e7eb 0deg
                    )`
                  }}
                >
                  <div className="score-inner">
                    <span className="score-value">{seoAnalysis.score}</span>
                    <span className="score-max">/100</span>
                  </div>
                </div>
              </div>
              <p className="score-label">
                {seoAnalysis.score >= 80 ? '優秀' : seoAnalysis.score >= 60 ? '良好' : '要改善'}
              </p>
            </div>

            {seoAnalysis.suggestions.length > 0 && (
              <div className="seo-suggestions">
                <h4>改善提案</h4>
                <ul>
                  {seoAnalysis.suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="content-stats glass-effect">
            <h3>
              <TrendingUp size={20} />
              コンテンツ統計
            </h3>
            
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-label">文字数</span>
                <span className="stat-value">{editedPost.content.length}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">段落数</span>
                <span className="stat-value">
                  {editedPost.content.split('\n\n').filter(p => p.trim()).length}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">見出し数</span>
                <span className="stat-value">
                  {(editedPost.content.match(/#{1,6}\s/g) || []).length}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">リンク数</span>
                <span className="stat-value">
                  {(editedPost.content.match(/\[.*?\]\(.*?\)/g) || []).length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .blog-editor {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
          background: var(--bg-secondary);
          min-height: 100vh;
        }

        .editor-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-radius: 1rem;
          margin-bottom: 2rem;
        }

        .editor-header h2 {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin: 0;
          color: var(--text-primary);
        }

        .editor-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .mode-toggle {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          border: 2px solid var(--border-glass);
          border-radius: 0.5rem;
          background: transparent;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--animation-speed) ease;
        }

        .mode-toggle.active {
          background: var(--primary-color);
          color: white;
          border-color: var(--primary-color);
        }

        .action-buttons {
          display: flex;
          gap: 1rem;
        }

        .editor-layout {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 2rem;
          align-items: start;
        }

        .post-meta {
          padding: 1.5rem;
          border-radius: 1rem;
          margin-bottom: 1rem;
        }

        .meta-group {
          margin-bottom: 1.5rem;
          position: relative;
        }

        .meta-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .meta-group label {
          display: block;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .meta-group input,
        .meta-group textarea,
        .meta-group select {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid var(--border-glass);
          border-radius: 0.5rem;
          background: var(--bg-glass);
          backdrop-filter: blur(var(--blur-strength));
          color: var(--text-primary);
          font-size: 1rem;
          transition: all var(--animation-speed) ease;
          resize: vertical;
        }

        .meta-group input:focus,
        .meta-group textarea:focus,
        .meta-group select:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: var(--shadow-glow);
        }

        .char-count {
          position: absolute;
          bottom: -1.5rem;
          right: 0;
          font-size: 0.8rem;
          color: var(--text-light);
        }

        .toolbar {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          border-radius: 1rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }

        .toolbar-group {
          display: flex;
          gap: 0.5rem;
          padding-right: 1rem;
          border-right: 1px solid var(--border-glass);
        }

        .toolbar-group:last-child {
          border-right: none;
        }

        .toolbar-btn {
          padding: 0.75rem;
          border: none;
          border-radius: 0.5rem;
          background: transparent;
          color: var(--text-primary);
          cursor: pointer;
          transition: all var(--animation-speed) ease;
        }

        .toolbar-btn:hover {
          background: var(--bg-glass);
          transform: translateY(-2px);
        }

        .content-editor {
          position: relative;
          border-radius: 1rem;
          overflow: hidden;
        }

        .content-editor textarea {
          width: 100%;
          padding: 2rem;
          border: none;
          background: transparent;
          color: var(--text-primary);
          font-family: 'JetBrains Mono', monospace;
          font-size: 1rem;
          line-height: 1.6;
          resize: vertical;
          min-height: 500px;
        }

        .content-editor textarea:focus {
          outline: none;
        }

        .editor-stats {
          display: flex;
          justify-content: space-between;
          padding: 1rem 2rem;
          background: var(--bg-glass);
          border-top: 1px solid var(--border-glass);
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .preview-mode {
          padding: 2rem;
          border-radius: 1rem;
          min-height: 500px;
        }

        .preview-article {
          max-width: 800px;
          margin: 0 auto;
        }

        .article-header {
          margin-bottom: 3rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid var(--border-glass);
        }

        .article-header h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: var(--text-primary);
          line-height: 1.2;
        }

        .article-meta {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .category {
          background: var(--primary-color);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-weight: 500;
        }

        .article-excerpt {
          background: var(--bg-glass);
          padding: 1.5rem;
          border-radius: 1rem;
          margin-bottom: 1rem;
          border-left: 4px solid var(--primary-color);
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .article-keywords {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .keyword-tag {
          background: var(--accent-color);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .article-content {
          line-height: 1.8;
          color: var(--text-primary);
        }

        .article-content h1,
        .article-content h2,
        .article-content h3 {
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .article-content p {
          margin-bottom: 1.5rem;
        }

        .article-content code {
          background: var(--bg-glass);
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-family: 'JetBrains Mono', monospace;
        }

        .article-content pre {
          background: var(--bg-glass);
          padding: 1.5rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1.5rem 0;
        }

        .article-content blockquote {
          border-left: 4px solid var(--primary-color);
          padding-left: 1rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: var(--text-secondary);
        }

        .editor-sidebar {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          position: sticky;
          top: 2rem;
        }

        .seo-panel,
        .content-stats {
          padding: 1.5rem;
          border-radius: 1rem;
        }

        .seo-panel h3,
        .content-stats h3 {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          color: var(--text-primary);
        }

        .seo-score {
          text-align: center;
          margin-bottom: 2rem;
        }

        .score-circle {
          width: 100px;
          height: 100px;
          margin: 0 auto 1rem;
          position: relative;
        }

        .score-progress {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .score-inner {
          width: 70px;
          height: 70px;
          background: var(--bg-primary);
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .score-value {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .score-max {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .score-label {
          margin: 0;
          font-weight: 600;
          color: var(--text-primary);
        }

        .seo-suggestions h4 {
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .seo-suggestions ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .seo-suggestions li {
          padding: 0.75rem;
          background: var(--bg-glass);
          border-radius: 0.5rem;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .stat-item {
          text-align: center;
          padding: 1rem;
          background: var(--bg-glass);
          border-radius: 0.5rem;
        }

        .stat-label {
          display: block;
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        @media (max-width: 1024px) {
          .editor-layout {
            grid-template-columns: 1fr;
          }

          .editor-sidebar {
            order: -1;
          }
        }

        @media (max-width: 768px) {
          .editor-header {
            flex-direction: column;
            gap: 1rem;
          }

          .editor-actions {
            width: 100%;
            justify-content: space-between;
          }

          .meta-row {
            grid-template-columns: 1fr;
          }

          .toolbar {
            flex-direction: column;
            gap: 0.5rem;
          }

          .toolbar-group {
            border-right: none;
            border-bottom: 1px solid var(--border-glass);
            padding-bottom: 0.5rem;
            justify-content: center;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default BlogEditor;