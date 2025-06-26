import React, { useState } from 'react';
import { 
  PenTool, 
  FileText, 
  Settings,
  Download,
  Copy,
  RefreshCw,
  Sparkles,
  Target,
  Users,
  BookOpen,
  Lightbulb
} from 'lucide-react';

const WritingTool = () => {
  const [formData, setFormData] = useState({
    theme: '',
    purpose: '',
    audience: '',
    tone: 'やさしく、親しみやすい口調。信頼感を重視',
    minWords: '2000',
    maxWords: '3000',
    keywords: ''
  });

  const [generatedArticle, setGeneratedArticle] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateArticle = async () => {
    if (!formData.theme || !formData.purpose || !formData.audience) {
      alert('テーマ、目的、ターゲット読者を入力してください。');
      return;
    }

    setIsGenerating(true);
    
    // プロンプトテンプレートの作成
    const prompt = `あなたはSEOに強く、読者の心をつかむプロのWebライターです。

以下の条件に従って、高品質な記事を執筆してください。

【記事テーマ】
${formData.theme}

【目的】
${formData.purpose}

【ターゲット読者】
${formData.audience}

【記事構成】
- 導入文（共感・問題提起）
- 本文（2〜3の小見出し構成：背景→具体例→解決策）
- まとめ（学び・行動を促す）

【トーン・スタイル】
${formData.tone}

【その他の条件】
- 文字数：${formData.minWords}〜${formData.maxWords}字
- SEOキーワード：${formData.keywords}

【出力形式】
- Markdown形式で出力してください
- 各セクションに見出し（H2/H3）をつけてください`;

    // 実際のAPIコールの代わりにシミュレーション
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockArticle = generateMockArticle(formData);
    setGeneratedArticle({
      id: Date.now(),
      prompt: prompt,
      content: mockArticle,
      wordCount: mockArticle.length,
      createdAt: new Date().toISOString(),
      ...formData
    });
    
    setIsGenerating(false);
  };

  const generateMockArticle = (data) => {
    const { theme, purpose, audience, tone, keywords } = data;
    
    return `# ${theme}の完全ガイド

## はじめに

${audience}の皆さん、こんにちは。

「${theme}」について考えたことはありますか？多くの方が関心を持ちながらも、**どこから始めればいいのか分からない**と感じているのではないでしょうか。

実は、${theme}は${purpose}ために非常に重要な要素です。しかし、正しい知識と方法を知らないまま取り組んでしまうと、期待した効果を得られないばかりか、時間と労力を無駄にしてしまう可能性があります。

この記事では、${audience}に向けて、${theme}の基本から実践的な活用法まで、分かりやすく解説していきます。

## ${theme}の基本知識

### なぜ${theme}が重要なのか

現代社会において、${theme}の重要性はますます高まっています。特に${audience}にとって、これは以下のような理由で欠かせない要素となっています：

- **効率性の向上**: 正しい方法を知ることで、より効率的に目標を達成できます
- **リスクの軽減**: 適切な知識があることで、不要なリスクを避けることができます
- **競争優位性**: 他の人よりも一歩先を行く知識を身につけることができます

### ${theme}の基本的な仕組み

${theme}を理解するためには、まずその基本的な仕組みを把握することが重要です。

簡単に説明すると、${theme}は以下のような流れで機能します：

1. **準備段階**: 必要な情報収集と計画立案
2. **実行段階**: 具体的な行動と実践
3. **評価段階**: 結果の分析と改善点の特定

## 実践的な活用方法

### 初心者でも始められる3つのステップ

${theme}を始めるにあたって、${audience}の方々におすすめしたいのが、以下の3つのステップです。

#### ステップ1: 基礎知識の習得

まずは${theme}に関する基礎知識をしっかりと身につけましょう。

- 関連する用語や概念の理解
- 業界の動向や最新情報の把握
- 成功事例や失敗事例の研究

#### ステップ2: 小さく始める

いきなり大きなことを始めるのではなく、小さなところから始めることが成功の秘訣です。

- 低リスクで始められる方法を選択
- 短期間で結果が見える取り組みから開始
- 段階的にスケールアップしていく

#### ステップ3: 継続的な改善

一度始めたら終わりではありません。継続的に改善を重ねることが重要です。

- 定期的な見直しと評価
- 新しい手法や技術の取り入れ
- 専門家からのアドバイスの活用

### よくある失敗例と対策

${theme}に取り組む際によくある失敗例と、それらを避けるための対策をご紹介します。

**失敗例1: 準備不足で始めてしまう**
- 対策: 十分な情報収集と計画立案を行う

**失敗例2: 短期間で結果を求めすぎる**
- 対策: 長期的な視点を持ち、継続的に取り組む

**失敗例3: 一人で全てを解決しようとする**
- 対策: 専門家や経験者からのサポートを積極的に求める

## まとめ：今日から始める${theme}

ここまで、${theme}について詳しく解説してきました。

重要なポイントをまとめると：

- **基礎知識の習得が最重要**: しっかりとした知識基盤があることで、より効果的に取り組むことができます
- **小さく始めて継続する**: 最初から完璧を求めず、段階的に成長していくことが成功の鍵です
- **専門家のサポートを活用**: 一人で悩まず、経験豊富な専門家からのアドバイスを積極的に求めましょう

${audience}の皆さんにとって、${theme}は単なる選択肢の一つではなく、より良い未来を築くための重要なツールです。

今日からでも始められる小さな一歩を踏み出してみませんか？

**行動を起こすための具体的な次のステップ：**

1. まずは${theme}に関する基本的な情報収集から始める
2. 自分の状況や目標に合った方法を選択する
3. 信頼できる専門家や情報源を見つける

皆さんの${theme}への取り組みが、素晴らしい結果をもたらすことを心から願っています。

---

*この記事が参考になったら、ぜひ周りの方にもシェアしてください。*

**関連キーワード**: ${keywords}`;
  };

  const copyToClipboard = () => {
    if (generatedArticle) {
      navigator.clipboard.writeText(generatedArticle.content);
      alert('記事をクリップボードにコピーしました！');
    }
  };

  const downloadAsMarkdown = () => {
    if (generatedArticle) {
      const blob = new Blob([generatedArticle.content], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${generatedArticle.theme.replace(/[^a-zA-Z0-9]/g, '_')}.md`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="writing-tool">
      <div className="container">
        <header className="tool-header">
          <h1 className="tool-title">
            <Sparkles className="title-icon" />
            プロライティングツール
          </h1>
          <p className="tool-description">
            SEOに強く、読者の心をつかむ高品質な記事を自動生成
          </p>
        </header>

        <div className="tool-layout">
          <div className="form-section">
            <div className="form-card">
              <h2 className="form-title">
                <Settings className="section-icon" />
                記事設定
              </h2>

              <div className="form-group">
                <label htmlFor="theme">
                  <BookOpen className="label-icon" />
                  記事テーマ *
                </label>
                <input
                  type="text"
                  id="theme"
                  name="theme"
                  value={formData.theme}
                  onChange={handleInputChange}
                  placeholder="例：ふるさと納税の始め方、新NISAの活用術"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="purpose">
                  <Target className="label-icon" />
                  目的 *
                </label>
                <textarea
                  id="purpose"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleInputChange}
                  placeholder="例：初心者にやさしく制度の魅力を伝える"
                  rows="3"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="audience">
                  <Users className="label-icon" />
                  ターゲット読者 *
                </label>
                <input
                  type="text"
                  id="audience"
                  name="audience"
                  value={formData.audience}
                  onChange={handleInputChange}
                  placeholder="例：20〜40代の会社員、投資初心者"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="tone">
                  <Lightbulb className="label-icon" />
                  トーン・スタイル
                </label>
                <select
                  id="tone"
                  name="tone"
                  value={formData.tone}
                  onChange={handleInputChange}
                >
                  <option value="やさしく、親しみやすい口調。信頼感を重視">やさしく親しみやすい（信頼感重視）</option>
                  <option value="専門的で権威のある口調。詳細な解説を重視">専門的で権威のある（詳細解説重視）</option>
                  <option value="カジュアルで親近感のある口調。読みやすさを重視">カジュアルで親近感のある（読みやすさ重視）</option>
                  <option value="熱意のある励ましの口調。行動を促すことを重視">熱意のある励まし（行動促進重視）</option>
                  <option value="客観的で中立的な口調。事実の提示を重視">客観的で中立的（事実提示重視）</option>
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="minWords">最小文字数</label>
                  <select
                    id="minWords"
                    name="minWords"
                    value={formData.minWords}
                    onChange={handleInputChange}
                  >
                    <option value="1000">1,000字</option>
                    <option value="2000">2,000字</option>
                    <option value="3000">3,000字</option>
                    <option value="4000">4,000字</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="maxWords">最大文字数</label>
                  <select
                    id="maxWords"
                    name="maxWords"
                    value={formData.maxWords}
                    onChange={handleInputChange}
                  >
                    <option value="2000">2,000字</option>
                    <option value="3000">3,000字</option>
                    <option value="4000">4,000字</option>
                    <option value="5000">5,000字</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="keywords">SEOキーワード</label>
                <input
                  type="text"
                  id="keywords"
                  name="keywords"
                  value={formData.keywords}
                  onChange={handleInputChange}
                  placeholder="例：ふるさと納税 / 初心者 / 節税（スラッシュ区切り）"
                />
              </div>

              <button
                className="generate-btn"
                onClick={generateArticle}
                disabled={!formData.theme || !formData.purpose || !formData.audience || isGenerating}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="spinning" />
                    記事生成中...
                  </>
                ) : (
                  <>
                    <PenTool />
                    高品質記事を生成
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="preview-section">
            {generatedArticle ? (
              <div className="preview-card">
                <div className="preview-header">
                  <h2 className="preview-title">
                    <FileText className="section-icon" />
                    生成された記事
                  </h2>
                  <div className="preview-meta">
                    <span className="word-count">
                      約{Math.floor(generatedArticle.wordCount / 1)}文字
                    </span>
                    <span className="reading-time">
                      約{Math.ceil(generatedArticle.wordCount / 500)}分で読める
                    </span>
                  </div>
                  <div className="preview-actions">
                    <button
                      className="action-btn"
                      onClick={() => setShowPrompt(!showPrompt)}
                      title="プロンプトを表示/非表示"
                    >
                      <Settings />
                    </button>
                    <button
                      className="action-btn"
                      onClick={copyToClipboard}
                      title="クリップボードにコピー"
                    >
                      <Copy />
                    </button>
                    <button
                      className="action-btn"
                      onClick={downloadAsMarkdown}
                      title="Markdownファイルとしてダウンロード"
                    >
                      <Download />
                    </button>
                  </div>
                </div>

                {showPrompt && (
                  <div className="prompt-display">
                    <h4>使用されたプロンプト</h4>
                    <pre className="prompt-content">{generatedArticle.prompt}</pre>
                  </div>
                )}

                <div className="preview-content">
                  <pre className="article-content">{generatedArticle.content}</pre>
                </div>
              </div>
            ) : (
              <div className="preview-placeholder">
                <FileText className="placeholder-icon" />
                <h3>記事プレビュー</h3>
                <p>左側のフォームに必要事項を入力して、「高品質記事を生成」ボタンをクリックしてください。</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .writing-tool {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          position: relative;
        }

        .writing-tool::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
          pointer-events: none;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
          position: relative;
          z-index: 1;
        }

        .tool-header {
          text-align: center;
          margin-bottom: 3rem;
          color: white;
        }

        .tool-title {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
          background: linear-gradient(45deg, #fff, #f0f0f0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .title-icon {
          width: 3rem;
          height: 3rem;
          color: #ffd700;
        }

        .tool-description {
          font-size: 1.2rem;
          opacity: 0.9;
          margin: 0;
        }

        .tool-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          align-items: start;
        }

        .form-card, .preview-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 1.5rem;
          padding: 2rem;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .form-title, .preview-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 2rem;
          color: #333;
        }

        .section-icon {
          width: 1.5rem;
          height: 1.5rem;
          color: #667eea;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          color: #333;
          margin-bottom: 0.5rem;
        }

        .label-icon {
          width: 1rem;
          height: 1rem;
          color: #667eea;
        }

        .form-group input,
        .form-group textarea,
        .form-group select {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 2px solid #e1e5e9;
          border-radius: 0.75rem;
          font-size: 1rem;
          background: white;
          transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .generate-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 0.75rem;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 1rem;
        }

        .generate-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
        }

        .generate-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .spinning {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .preview-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .preview-meta {
          display: flex;
          gap: 1rem;
          font-size: 0.9rem;
          color: #666;
        }

        .preview-actions {
          display: flex;
          gap: 0.5rem;
        }

        .action-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .action-btn:hover {
          background: #5a67d8;
          transform: translateY(-1px);
        }

        .preview-content {
          max-height: 70vh;
          overflow-y: auto;
          border: 1px solid #e1e5e9;
          border-radius: 0.75rem;
          background: #f8f9fa;
        }

        .article-content {
          padding: 2rem;
          font-family: 'Arial', sans-serif;
          line-height: 1.8;
          color: #333;
          white-space: pre-wrap;
          margin: 0;
          font-size: 0.95rem;
        }

        .preview-placeholder {
          text-align: center;
          padding: 3rem 2rem;
          color: #666;
        }

        .placeholder-icon {
          width: 4rem;
          height: 4rem;
          color: #ccc;
          margin-bottom: 1rem;
        }

        .preview-placeholder h3 {
          margin-bottom: 1rem;
          color: #333;
        }

        .prompt-display {
          background: #f8f9fa;
          border: 1px solid #e1e5e9;
          border-radius: 0.75rem;
          padding: 1.5rem;
          margin-bottom: 1rem;
        }

        .prompt-display h4 {
          margin: 0 0 1rem 0;
          color: #333;
          font-size: 1rem;
          font-weight: 600;
        }

        .prompt-content {
          background: white;
          border: 1px solid #e1e5e9;
          border-radius: 0.5rem;
          padding: 1rem;
          font-family: 'Courier New', monospace;
          font-size: 0.85rem;
          line-height: 1.5;
          color: #555;
          white-space: pre-wrap;
          margin: 0;
          max-height: 300px;
          overflow-y: auto;
        }

        @media (max-width: 1024px) {
          .tool-layout {
            grid-template-columns: 1fr;
          }
          
          .tool-title {
            font-size: 2rem;
          }
          
          .title-icon {
            width: 2rem;
            height: 2rem;
          }
        }

        @media (max-width: 768px) {
          .container {
            padding: 1rem;
          }
          
          .form-card, .preview-card {
            padding: 1.5rem;
          }
          
          .form-row {
            grid-template-columns: 1fr;
          }
          
          .preview-header {
            flex-direction: column;
            align-items: stretch;
          }
        }
      `}</style>
    </div>
  );
};

export default WritingTool;