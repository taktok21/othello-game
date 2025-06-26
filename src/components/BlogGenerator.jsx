import React, { useState } from 'react';
import { 
  PenTool, 
  Sparkles, 
  Download, 
  Copy, 
  RefreshCw, 
  Settings,
  FileText,
  Tag,
  Calendar,
  Eye,
  Save
} from 'lucide-react';

const BlogGenerator = () => {
  const [formData, setFormData] = useState({
    topic: '',
    keywords: '',
    tone: 'professional',
    length: 'medium',
    category: 'technology',
    targetAudience: 'general',
    includeCode: false,
    includeSEO: true
  });

  const [generatedPost, setGeneratedPost] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedPosts, setSavedPosts] = useState([]);

  // AIブログ生成のシミュレーション
  const generateBlogPost = async () => {
    setIsGenerating(true);
    
    // 実際のAPIコールの代わりにシミュレーション
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockPost = {
      id: Date.now(),
      title: `${formData.topic}の完全ガイド：最新技術とベストプラクティス`,
      excerpt: `${formData.topic}について、実践的な観点から詳しく解説します。最新の技術動向や実装のポイントを含めた包括的な内容をお届けします。`,
      content: generateMockContent(formData),
      keywords: formData.keywords.split(',').map(k => k.trim()),
      category: formData.category,
      readTime: calculateReadTime(formData.length),
      seoScore: Math.floor(Math.random() * 30) + 70,
      createdAt: new Date().toISOString(),
      wordCount: getWordCount(formData.length)
    };
    
    setGeneratedPost(mockPost);
    setIsGenerating(false);
  };

  const generateMockContent = (data) => {
    const { topic, tone, includeCode, length, category } = data;
    
    // 体験談・共感型のトーンの場合は専用生成
    if (['personal', 'emotional', 'storytelling', 'motivational'].includes(tone)) {
      return generatePersonalStoryContent(data);
    }
    
    // カテゴリー別のコンテンツ生成
    const contentTemplates = {
      // テクノロジー系
      technology: () => generateTechContent(data),
      'web-development': () => generateTechContent(data),
      mobile: () => generateTechContent(data),
      'ai-ml': () => generateTechContent(data),
      devops: () => generateTechContent(data),
      security: () => generateTechContent(data),

      // ライフスタイル系
      pets: () => generatePetContent(data),
      cooking: () => generateCookingContent(data),
      travel: () => generateTravelContent(data),
      health: () => generateHealthContent(data),
      beauty: () => generateBeautyContent(data),
      home: () => generateHomeContent(data),

      // 趣味・エンターテイメント系
      gaming: () => generateGamingContent(data),
      movies: () => generateMovieContent(data),
      music: () => generateMusicContent(data),
      sports: () => generateSportsContent(data),
      books: () => generateBookContent(data),
      photography: () => generatePhotoContent(data),

      // ビジネス・教育系
      business: () => generateBusinessContent(data),
      education: () => generateEducationContent(data),
      finance: () => generateFinanceContent(data),
      marketing: () => generateMarketingContent(data),
      career: () => generateCareerContent(data),

      // その他
      news: () => generateNewsContent(data),
      environment: () => generateEnvironmentContent(data),
      parenting: () => generateParentingContent(data),
      relationship: () => generateRelationshipContent(data),
      personal: () => generatePersonalContent(data),
      other: () => generateGeneralContent(data)
    };

    const generator = contentTemplates[category] || contentTemplates.other;
    return generator();
  };

  // 体験談・共感型コンテンツ生成
  const generatePersonalStoryContent = (data) => {
    const { topic, tone, length } = data;
    
    // トーン別の表現パターン
    const toneExpressions = {
      personal: {
        opening: "正直に話すと、",
        feeling: "本当に辛くて、",
        realization: "ある日気づいたのですが、",
        conclusion: "今振り返ると、"
      },
      emotional: {
        opening: "涙が出るほど悩んでいた時期がありました。",
        feeling: "心が押し潰されそうで、",
        realization: "その時、ふと思ったんです。",
        conclusion: "今だからこそ言えることですが、"
      },
      storytelling: {
        opening: "あれは忘れもしない、",
        feeling: "その瞬間、世界が変わったような気がして、",
        realization: "そこで初めて理解したのです。",
        conclusion: "この経験を通して、"
      },
      motivational: {
        opening: "もし今、同じような悩みを抱えている方がいるなら、",
        feeling: "きっと一人じゃないということを伝えたくて、",
        realization: "そんな時に気づいてほしいのは、",
        conclusion: "だからこそ、みなさんにも伝えたい。"
      }
    };

    const expressions = toneExpressions[tone] || toneExpressions.personal;
    
    // エンジニア関連のテーマかどうかを判定
    const isEngineerTheme = topic.toLowerCase().includes('エンジニア') || 
                           topic.toLowerCase().includes('プログラマ') || 
                           topic.toLowerCase().includes('開発') ||
                           topic.toLowerCase().includes('コード') ||
                           topic.toLowerCase().includes('技術');

    if (isEngineerTheme) {
      return generateEngineerStoryContent(data, expressions);
    } else {
      return generateGeneralStoryContent(data, expressions);
    }
  };

  // エンジニア特化の体験談生成
  const generateEngineerStoryContent = (data, expressions) => {
    const { topic, length, tone } = data;
    
    let content = `# ${topic}：一人のエンジニアの正直な想い

## はじめに

${expressions.opening}${topic}について書こうと思ったのは、きっと同じような想いを抱えている人がいるだろうと思ったからです。

エンジニアとして働き始めた頃の私は、理想と現実のギャップに悩み、毎日のように自分の能力について疑問を感じていました。

## 最初の衝撃

入社して最初の数ヶ月間、私は自分がいかに何も知らないかを思い知らされました。

学生時代に学んだプログラミングと、実際の現場で求められるスキルは全く違っていたのです。

### 具体的な悩み

- **技術の深さ**: 表面的な知識しかなく、深い部分が全く理解できない
- **コードレビュー**: 先輩からの指摘が理解できず、何度も同じミスを繰り返す  
- **プレッシャー**: 期待に応えられない自分への焦りと不安
- **インポスター症候群**: 「自分はエンジニアに向いていないのでは」という想い

## 一番つらかった時期

${expressions.feeling}特に印象に残っているのは、初めて担当したプロジェクトでのことです。

簡単だと思っていた機能実装が、実際には複雑な仕様の理解と、チーム全体の設計思想の把握が必要でした。

### その時の心境

毎日終電まで残って作業しても、思うように進まない。先輩に質問するのも申し訳なくて、一人で抱え込んでしまう。

「自分はエンジニアに向いていないんじゃないか」

「他の人はもっとスムーズに理解できているのに、なぜ自分だけ...」

そんな想いが頭の中をぐるぐると回っていました。

## 転機となった出来事

${expressions.realization}ある日、先輩エンジニアから言われた一言が私を変えました。

「君だけじゃないよ。みんな最初は同じような悩みを抱えてる。大事なのは、その悩みとどう向き合うかだ」

### 気づいたこと

1. **完璧を求めすぎていた**: 最初から全てを理解する必要はない
2. **比較の罠**: 他人と比較することの無意味さ
3. **成長の実感**: 小さな進歩を認めることの大切さ
4. **チームワーク**: 一人で抱え込まず、チームで解決する意識

## 今だから分かること

### エンジニアとしての成長の本質

技術力の向上はもちろん大切ですが、それ以上に重要だと感じるのは：

- **学び続ける姿勢**: 技術は日々進歩するため、学習を止めないこと
- **問題解決能力**: 答えがない問題にどう取り組むか
- **コミュニケーション**: 技術だけでなく、人との関わり方
- **メンタルヘルス**: 自分自身を大切にすること

### 後輩エンジニアへのメッセージ

もし今、同じような悩みを抱えている方がいるなら、これだけは伝えたいです：

**あなたは一人じゃない。そして、その悩みは成長の証拠です。**

私も未だに分からないことばかりです。でも、それでいいんだと思います。

## まとめ

${expressions.conclusion}エンジニアとしての悩みや苦悩は、実は成長のための大切なプロセスだったということです。

完璧なエンジニアなんて存在しません。みんな日々学び、悩み、そして少しずつ成長しているのです。

この記事を読んでくださった方が、少しでも心が軽くなったり、「自分だけじゃないんだ」と感じてもらえたら、とても嬉しいです。

一緒に、一歩ずつ前に進んでいきましょう。

---

*最後まで読んでいただき、ありがとうございました。もし共感していただけた部分があれば、ぜひコメントやシェアをしていただけると嬉しいです。*`;

    return adjustContentLength(content, length, true);
  };

  // 一般的な体験談生成
  const generateGeneralStoryContent = (data, expressions) => {
    const { topic, length } = data;
    
    let content = `# ${topic}：私の体験談

## はじめに

${expressions.opening}${topic}について、私の実体験をお話ししたいと思います。

きっと同じような経験をされた方や、これから経験される方の参考になればと思い、正直な気持ちを書かせていただきます。

## 最初の想い

${topic}に向き合うことになったとき、正直不安でいっぱいでした。

周りの人たちは簡単そうにこなしているように見えるのに、自分だけが取り残されているような感覚。

### そのときの状況

- 何から始めればいいのか分からない
- 周りに相談できる人がいない
- 失敗することへの恐怖
- 自分の選択が正しいのかという迷い

## 一番つらかった時期

${expressions.feeling}特に印象に残っているのは、初めて大きな壁にぶつかったときのことです。

今まで順調だと思っていたことが、急に上手くいかなくなりました。

### その時の心境

毎日同じことの繰り返しで、進歩している実感が全くありませんでした。

「なぜ自分だけうまくいかないのだろう」

「他の人はもっと要領よくできているのに...」

そんな想いが心の中で渦巻いていました。

## 転機となった出来事

${expressions.realization}あることがきっかけで、考え方が大きく変わりました。

それまで気づかなかった大切なことに、ようやく目を向けることができたのです。

### 学んだこと

1. **自分らしさを大切にする**: 他人と比較する必要はない
2. **小さな変化を認める**: 大きな変化は小さな積み重ね
3. **周りのサポート**: 一人で頑張る必要はない
4. **継続の力**: 諦めずに続けることの大切さ

## 今だから分かること

### 成長の本質

振り返ってみると、苦しかった時期こそが一番成長できた時期だったと思います。

- **失敗から学ぶ**: 失敗は成功への道しるべ
- **自分を信じる**: 自分の可能性を信じること
- **感謝の気持ち**: 支えてくれた人たちへの感謝
- **前向きな姿勢**: 困難を成長の機会と捉える

### 同じような状況の方へ

もし今、似たような状況で悩んでいる方がいらっしゃるなら：

**あなたの気持ちは間違っていません。そして、必ず道は開けます。**

私も完璧ではありませんが、一歩ずつ前進しています。

## まとめ

${expressions.conclusion}${topic}を通して学んだ最も大切なことは、人生には様々な段階があり、それぞれに意味があるということです。

辛い時期も、楽しい時期も、全てが今の自分を作り上げる大切な要素なのです。

この体験談が、誰かの心に少しでも響いたなら、とても嬉しく思います。

私たちは皆、人生という旅路を歩んでいる仲間です。一緒に歩んでいきましょう。

---

*この記事を読んでくださり、ありがとうございました。あなたの体験談も、きっと誰かの励みになるはずです。*`;

    return adjustContentLength(content, length, true);
  };

  // テクノロジー系コンテンツ生成
  const generateTechContent = (data) => {
    const { topic, includeCode, length } = data;
    
    let content = `# ${topic}の完全ガイド

## はじめに

${topic}は現代のシステム開発において重要な技術要素です。本記事では、${topic}の基本概念から実践的な活用方法まで、包括的に解説いたします。

## ${topic}とは

${topic}は、効率的で拡張性の高いシステム構築を可能にする技術です。特に以下の特徴があります：

- **高性能**: 最適化されたアルゴリズムによる高速処理
- **スケーラビリティ**: 負荷に応じた柔軟な拡張性
- **保守性**: クリーンなコード構造による維持管理の容易さ

## 実装のポイント

### 1. 基本的な設定

${topic}を導入する際は、以下の手順で進めることをお勧めします：

1. 環境の準備
2. 基本設定の実装
3. テストの実装
4. 本番デプロイ

${includeCode ? `

### 2. サンプルコード

\`\`\`javascript
// ${topic}の基本実装例
const config = {
  environment: 'production',
  optimization: true,
  security: {
    enabled: true,
    level: 'high'
  }
};

function initialize() {
  console.log('${topic}を初期化中...');
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('${topic}の初期化が完了しました');
      resolve(true);
    }, 1000);
  });
}
\`\`\`

` : ''}

## ベストプラクティス

${topic}を効果的に活用するためには、以下のベストプラクティスを遵守することが重要です：

### パフォーマンス最適化
- リソースの効率的な利用
- キャッシュ戦略の実装
- 不要な処理の削除

## まとめ

${topic}は、現代のシステム開発において不可欠な技術です。本記事で紹介したポイントを参考に、効果的な実装を進めてください。`;

    return adjustContentLength(content, length);
  };

  // ペット系コンテンツ生成
  const generatePetContent = (data) => {
    const { topic, length } = data;
    
    let content = `# ${topic}について知っておきたいこと

## はじめに

ペットとの生活は私たちに多くの喜びと学びをもたらしてくれます。今回は${topic}について、実体験を交えながらお話ししたいと思います。

## ${topic}の魅力

${topic}には以下のような素晴らしい特徴があります：

- **癒しの存在**: 日々のストレスを和らげてくれる
- **家族の一員**: かけがえのない存在として私たちの心を豊かにする
- **責任感の育成**: お世話を通じて責任感や愛情深さを学べる

## 基本的なお世話のポイント

### 1. 健康管理

ペットの健康を保つためには、以下の点に注意が必要です：

1. 定期的な健康診断
2. 適切な食事管理
3. 十分な運動
4. 清潔な環境の維持

### 2. 日常のケア

毎日のお世話で大切なのは：

- **食事**: 栄養バランスを考えた食事を規則正しく
- **運動**: 適度な運動でストレス発散と健康維持
- **グルーミング**: 被毛や爪のケアで清潔を保つ

## 注意すべきポイント

${topic}を飼う際は、以下の点に注意しましょう：

### 環境づくり
- 安全で快適な生活空間の確保
- 適切な温度・湿度の管理
- 危険物の除去

### 緊急時の対応
- 近くの動物病院の確認
- 緊急連絡先の把握
- 応急処置の基本知識

## まとめ

${topic}との生活は、私たちの人生を豊かにしてくれる素晴らしい体験です。愛情と責任を持って、大切な家族として迎え入れることで、きっと特別な絆を築くことができるでしょう。

ペットとの生活を始める前に、しっかりと準備を整え、長期的な視点で考えることが大切です。`;

    return adjustContentLength(content, length);
  };

  // 料理系コンテンツ生成
  const generateCookingContent = (data) => {
    const { topic, length } = data;
    
    let content = `# ${topic}の作り方とコツ

## はじめに

料理は毎日の生活に欠かせない大切な要素です。今回は${topic}について、美味しく作るためのポイントをご紹介します。

## ${topic}の魅力

${topic}の特徴と魅力：

- **栄養価**: 健康に良い栄養素が豊富
- **味わい**: 独特の風味と食感が楽しめる
- **アレンジ**: 様々な調理法でバリエーション豊富

## 基本的な作り方

### 材料（4人分）

- 主材料：適量
- 調味料：塩、こしょう、その他
- 副材料：お好みで

### 調理手順

1. **下準備**: 材料を適切なサイズにカット
2. **調理**: 適切な火加減で調理
3. **味付け**: 調味料で味を整える
4. **仕上げ**: 盛り付けて完成

## 美味しく作るコツ

### 材料選び
- 新鮮な材料を選ぶ
- 旬の食材を活用する
- 品質の良い調味料を使用

### 調理のポイント
- 火加減の調整
- 調味のタイミング
- 盛り付けの工夫

## アレンジレシピ

${topic}は以下のようにアレンジすることができます：

- **和風アレンジ**: だしや醤油ベースの味付け
- **洋風アレンジ**: ハーブやスパイスを効かせて
- **エスニック風**: 香辛料でパンチのある味に

## まとめ

${topic}は基本を押さえれば、誰でも美味しく作ることができます。ぜひ今回ご紹介したポイントを参考に、お家でチャレンジしてみてください。

料理は愛情表現の一つでもあります。家族や大切な人のために、心を込めて作ってみてはいかがでしょうか。`;

    return adjustContentLength(content, length);
  };

  // 汎用コンテンツ生成（その他のカテゴリ用）
  const generateGeneralContent = (data) => {
    const { topic, length } = data;
    
    let content = `# ${topic}について

## はじめに

今回は${topic}について、詳しく解説していきたいと思います。この記事を通じて、${topic}に対する理解を深めていただければ幸いです。

## ${topic}とは

${topic}について、基本的な情報から詳細まで見ていきましょう。

### 基本情報

${topic}の特徴：
- 重要なポイント1
- 重要なポイント2
- 重要なポイント3

## 詳細解説

### 主要な要素

${topic}には以下のような要素があります：

1. **第一の要素**: 詳細な説明
2. **第二の要素**: 詳細な説明
3. **第三の要素**: 詳細な説明

### 実践的なアプローチ

${topic}を実際に活用する際のポイント：

- 基本的な考え方
- 実践的な方法
- 注意すべき点

## 具体例

${topic}の具体的な例をいくつか挙げてみます：

### 例1: 基本的なケース
一般的な状況での${topic}の活用方法

### 例2: 応用的なケース
より複雑な状況での${topic}の応用

## まとめ

${topic}について、基本から応用まで幅広く解説しました。これらの情報を参考に、${topic}への理解を深めていただければと思います。

継続的な学習と実践を通じて、${topic}に関する知識をさらに向上させていきましょう。`;

    return adjustContentLength(content, length);
  };

  // その他のコンテンツ生成関数（簡略版）
  const generateTravelContent = (data) => generateLifestyleContent(data, '旅行先として', 'スポット', '観光地');
  const generateHealthContent = (data) => generateLifestyleContent(data, '健康法として', 'メリット', '健康習慣');
  const generateBeautyContent = (data) => generateLifestyleContent(data, '美容法として', '効果', 'ケア方法');
  const generateHomeContent = (data) => generateLifestyleContent(data, 'インテリアアイデアとして', 'ポイント', 'デザイン');
  const generateGamingContent = (data) => generateHobbyContent(data, 'ゲームとして', '特徴', 'プレイ方法');
  const generateMovieContent = (data) => generateHobbyContent(data, '作品として', '見どころ', '鑑賞ポイント');
  const generateMusicContent = (data) => generateHobbyContent(data, '音楽として', '魅力', '楽しみ方');
  const generateSportsContent = (data) => generateHobbyContent(data, 'スポーツとして', 'メリット', '始め方');
  const generateBookContent = (data) => generateHobbyContent(data, '書籍として', '内容', '読み方');
  const generatePhotoContent = (data) => generateHobbyContent(data, '撮影技術として', 'テクニック', '撮り方');
  const generateBusinessContent = (data) => generateProfessionalContent(data, 'ビジネス手法として', '効果', '実践方法');
  const generateEducationContent = (data) => generateProfessionalContent(data, '学習法として', 'メリット', '取り組み方');
  const generateFinanceContent = (data) => generateProfessionalContent(data, '投資手法として', 'ポイント', '戦略');
  const generateMarketingContent = (data) => generateProfessionalContent(data, 'マーケティング手法として', '効果', '実施方法');
  const generateCareerContent = (data) => generateProfessionalContent(data, 'キャリア戦略として', 'メリット', 'アプローチ');
  const generateNewsContent = (data) => generateGeneralContent(data);
  const generateEnvironmentContent = (data) => generateGeneralContent(data);
  const generateParentingContent = (data) => generateLifestyleContent(data, '子育て方法として', 'ポイント', '育児法');
  const generateRelationshipContent = (data) => generateLifestyleContent(data, '関係構築法として', '効果', 'コミュニケーション');
  const generatePersonalContent = (data) => generateGeneralContent(data);

  // ライフスタイル系汎用生成
  const generateLifestyleContent = (data, context, feature, method) => {
    const { topic, length } = data;
    return adjustContentLength(`# ${topic}の魅力と${method}

## はじめに

${topic}は${context}多くの人に愛されています。この記事では、${topic}の${feature}や実践的な${method}について詳しく解説します。

## ${topic}の${feature}

### 主な${feature}

- **${feature}1**: 詳細な説明
- **${feature}2**: 詳細な説明  
- **${feature}3**: 詳細な説明

## 実践的な${method}

### 基本的なアプローチ

${topic}を始める際の基本的な${method}をご紹介します。

### 注意点

${topic}に取り組む際の注意すべきポイントもお伝えします。

## まとめ

${topic}について、${feature}から${method}まで幅広く解説しました。ぜひ参考にして、${topic}を楽しんでください。`, length);
  };

  // 趣味系汎用生成
  const generateHobbyContent = (data, context, feature, method) => {
    const { topic, length } = data;
    return adjustContentLength(`# ${topic}を楽しむための完全ガイド

## はじめに

${topic}は${context}多くの愛好者がいる魅力的な分野です。この記事では${topic}の${feature}と${method}について解説します。

## ${topic}の${feature}

### ${feature}の詳細

${topic}が持つ独特の${feature}について詳しく見ていきましょう。

## ${method}について

### 初心者向けの${method}

これから${topic}を始める方向けの基本的な${method}をご紹介します。

### 上級者向けのテクニック

より深く${topic}を楽しむための応用的な${method}も解説します。

## まとめ

${topic}の世界は奥が深く、探求すればするほど新しい発見があります。ぜひこの記事を参考に、${topic}を楽しんでください。`, length);
  };

  // ビジネス系汎用生成
  const generateProfessionalContent = (data, context, feature, method) => {
    const { topic, length } = data;
    return adjustContentLength(`# ${topic}で成功するための戦略

## はじめに

${topic}は${context}重要な役割を果たしています。この記事では${topic}の${feature}と実践的な${method}について解説します。

## ${topic}の${feature}

### 主要な${feature}

${topic}がもたらす具体的な${feature}について詳しく見ていきます。

## 実践的な${method}

### ステップバイステップガイド

${topic}を効果的に活用するための${method}を段階的に説明します。

### 成功事例

実際に${topic}で成果を上げた事例もご紹介します。

## まとめ

${topic}を効果的に活用することで、大きな成果を得ることができます。ぜひ実践してみてください。`, length);
  };

  // コンテンツ長さ調整（体験談対応）
  const adjustContentLength = (content, length, isPersonalStory = false) => {
    if (length === 'short') {
      return content.slice(0, Math.floor(content.length * 0.6));
    } else if (length === 'long') {
      if (isPersonalStory) {
        return content + `

## 読者の方へのメッセージ

この記事を最後まで読んでくださり、本当にありがとうございます。

### あなたは一人じゃない

もしこの記事を読んで、「自分と似ている」と感じた部分があるなら、それはあなたが一人じゃないということの証拠です。

多くの人が同じような想いを抱え、同じような道を歩んでいます。

### 小さな一歩から

変化は大きな一歩から始まるものではありません。毎日の小さな積み重ねが、やがて大きな変化を生み出します。

今日できることから、無理をせずに始めてみてください。

### コメントやメッセージをお待ちしています

もしよろしければ、あなたの体験談や想いも聞かせてください。

一人ひとりの体験談が、誰かの勇気や励みになるかもしれません。

### 最後に

人生は長い旅路です。時には迷うこともあるし、立ち止まりたくなることもあります。

でも、その全てが意味のある経験なのだと、今は心から思えます。

あなたの人生が、素晴らしいものでありますように。

そして、この記事が少しでもあなたのお役に立てたなら、これ以上の喜びはありません。`;
      } else {
        return content + `

## さらに詳しく

より詳細な情報や応用例について追加で解説します。

### 応用事例

実際の活用事例をいくつかご紹介しましょう。

### よくある質問

Q: よくある質問内容は？
A: 詳細な回答内容

### 関連情報

関連する情報や参考リンクもご紹介します。`;
      }
    }
    return content;
  };

  const calculateReadTime = (length) => {
    const baseTime = { short: 3, medium: 5, long: 8 };
    return `${baseTime[length]}分`;
  };

  const getWordCount = (length) => {
    const baseCount = { short: 800, medium: 1500, long: 2500 };
    return baseCount[length] + Math.floor(Math.random() * 300);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const savePost = () => {
    if (generatedPost) {
      setSavedPosts(prev => [...prev, generatedPost]);
      alert('ブログ記事を保存しました！');
    }
  };

  const copyToClipboard = () => {
    if (generatedPost) {
      navigator.clipboard.writeText(generatedPost.content);
      alert('記事をクリップボードにコピーしました！');
    }
  };

  const exportAsMarkdown = () => {
    if (generatedPost) {
      const blob = new Blob([generatedPost.content], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${generatedPost.title}.md`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <section className="blog-generator section">
      <div className="container">
        <div className="generator-header">
          <h2 className="section-title gradient-text">
            <Sparkles size={32} />
            AI ブログ記事自動作成ツール
          </h2>
          <p className="generator-description">
            AIを活用して、プロフェッショナルなブログ記事を自動生成します
          </p>
        </div>

        <div className="generator-layout">
          <div className="generator-form glass-effect">
            <h3>
              <Settings size={24} />
              記事設定
            </h3>
            
            <div className="form-group">
              <label htmlFor="topic">記事トピック *</label>
              <input
                type="text"
                id="topic"
                name="topic"
                value={formData.topic}
                onChange={handleInputChange}
                placeholder="例: React Hooks の活用方法"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="keywords">キーワード (カンマ区切り)</label>
              <input
                type="text"
                id="keywords"
                name="keywords"
                value={formData.keywords}
                onChange={handleInputChange}
                placeholder="例: React, Hooks, JavaScript, フロントエンド"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="tone">文章のトーン</label>
                <select
                  id="tone"
                  name="tone"
                  value={formData.tone}
                  onChange={handleInputChange}
                >
                  <option value="professional">プロフェッショナル</option>
                  <option value="casual">カジュアル</option>
                  <option value="technical">技術的</option>
                  <option value="friendly">親しみやすい</option>
                  <option value="personal">体験談・共感型</option>
                  <option value="emotional">感情重視</option>
                  <option value="storytelling">ストーリーテリング</option>
                  <option value="motivational">励まし・応援</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="length">記事の長さ</label>
                <select
                  id="length"
                  name="length"
                  value={formData.length}
                  onChange={handleInputChange}
                >
                  <option value="short">短い (800語程度)</option>
                  <option value="medium">中程度 (1500語程度)</option>
                  <option value="long">長い (2500語程度)</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">カテゴリー</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
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

              <div className="form-group">
                <label htmlFor="targetAudience">対象読者</label>
                <select
                  id="targetAudience"
                  name="targetAudience"
                  value={formData.targetAudience}
                  onChange={handleInputChange}
                >
                  <option value="general">一般</option>
                  <option value="beginner">初心者</option>
                  <option value="intermediate">中級者</option>
                  <option value="advanced">上級者</option>
                </select>
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-group">
                <input
                  type="checkbox"
                  name="includeCode"
                  checked={formData.includeCode}
                  onChange={handleInputChange}
                />
                <span>コードサンプルを含める</span>
              </label>

              <label className="checkbox-group">
                <input
                  type="checkbox"
                  name="includeSEO"
                  checked={formData.includeSEO}
                  onChange={handleInputChange}
                />
                <span>SEO最適化を適用</span>
              </label>
            </div>

            {['personal', 'emotional', 'storytelling', 'motivational'].includes(formData.tone) && (
              <div className="tone-guidance glass-effect">
                <h4>📝 体験談・共感型記事のヒント</h4>
                <p>より魅力的な体験談記事を書くためのコツ：</p>
                <ul>
                  <li><strong>具体的な体験</strong>を入力（例：「エンジニアとして働いてみて感じた悩みや苦悩について」）</li>
                  <li><strong>感情や想い</strong>を含むテーマ（例：「転職で失敗した話」「子育ての大変さ」）</li>
                  <li><strong>学びや成長</strong>の要素（例：「挫折から学んだこと」「困難を乗り越えた方法」）</li>
                </ul>
                <div className="example-topics">
                  <strong>おすすめトピック例：</strong>
                  <div className="topic-tags">
                    <span className="topic-tag">新卒エンジニアの現実</span>
                    <span className="topic-tag">転職活動の失敗談</span>
                    <span className="topic-tag">フリーランスになった理由</span>
                    <span className="topic-tag">働き方を変えた体験</span>
                  </div>
                </div>
              </div>
            )}

            <button
              className="generate-btn btn btn-primary glass-effect neon-glow"
              onClick={generateBlogPost}
              disabled={!formData.topic || isGenerating}
            >
              {isGenerating ? (
                <>
                  <RefreshCw size={20} className="spinning" />
                  生成中...
                </>
              ) : (
                <>
                  <PenTool size={20} />
                  記事を生成
                </>
              )}
            </button>
          </div>

          {generatedPost && (
            <div className="generated-content">
              <div className="content-header glass-effect">
                <div className="post-info">
                  <h3>
                    <FileText size={24} />
                    生成された記事
                  </h3>
                  <div className="post-stats">
                    <span className="stat">
                      <Tag size={16} />
                      {generatedPost.category}
                    </span>
                    <span className="stat">
                      <Calendar size={16} />
                      {generatedPost.readTime}
                    </span>
                    <span className="stat">
                      <Eye size={16} />
                      {generatedPost.wordCount}語
                    </span>
                    <span className={`seo-score ${generatedPost.seoScore >= 80 ? 'good' : 'fair'}`}>
                      SEO: {generatedPost.seoScore}点
                    </span>
                  </div>
                </div>

                <div className="content-actions">
                  <button 
                    className="action-btn glass-effect"
                    onClick={savePost}
                    title="保存"
                  >
                    <Save size={18} />
                  </button>
                  <button 
                    className="action-btn glass-effect"
                    onClick={copyToClipboard}
                    title="コピー"
                  >
                    <Copy size={18} />
                  </button>
                  <button 
                    className="action-btn glass-effect"
                    onClick={exportAsMarkdown}
                    title="Markdownでダウンロード"
                  >
                    <Download size={18} />
                  </button>
                </div>
              </div>

              <div className="content-preview glass-effect">
                <div className="preview-header">
                  <h4>{generatedPost.title}</h4>
                  <p className="excerpt">{generatedPost.excerpt}</p>
                  {generatedPost.keywords.length > 0 && (
                    <div className="keywords">
                      {generatedPost.keywords.map((keyword, index) => (
                        <span key={index} className="keyword-tag">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="content-body">
                  <pre>{generatedPost.content}</pre>
                </div>
              </div>
            </div>
          )}
        </div>

        {savedPosts.length > 0 && (
          <div className="saved-posts glass-effect">
            <h3>
              <FileText size={24} />
              保存された記事 ({savedPosts.length})
            </h3>
            <div className="posts-grid">
              {savedPosts.map((post) => (
                <div key={post.id} className="saved-post-card glass-effect">
                  <h4>{post.title}</h4>
                  <p>{post.excerpt}</p>
                  <div className="post-meta">
                    <span>{post.category}</span>
                    <span>{post.readTime}</span>
                    <span>SEO: {post.seoScore}点</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .blog-generator {
          background: var(--bg-secondary);
          min-height: 100vh;
          position: relative;
        }

        .blog-generator::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 30% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 70% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%);
          pointer-events: none;
        }

        .generator-header {
          text-align: center;
          margin-bottom: 3rem;
          position: relative;
          z-index: 2;
        }

        .generator-header h2 {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }

        .generator-description {
          font-size: 1.1rem;
          color: var(--text-secondary);
          margin-top: 1rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .generator-layout {
          display: grid;
          grid-template-columns: 400px 1fr;
          gap: 3rem;
          align-items: start;
          position: relative;
          z-index: 2;
        }

        .generator-form {
          padding: 2rem;
          border-radius: 1.5rem;
          position: sticky;
          top: 100px;
        }

        .generator-form h3 {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 2rem;
          color: var(--text-primary);
          font-size: 1.3rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-group label {
          display: block;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid var(--border-glass);
          border-radius: 0.5rem;
          background: var(--bg-glass);
          backdrop-filter: blur(var(--blur-strength));
          color: var(--text-primary);
          font-size: 1rem;
          transition: all var(--animation-speed) ease;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: var(--shadow-glow);
        }

        .form-options {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .checkbox-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          color: var(--text-primary);
        }

        .checkbox-group input[type="checkbox"] {
          width: auto;
          margin: 0;
        }

        .tone-guidance {
          padding: 1.5rem;
          border-radius: 1rem;
          margin-top: 1rem;
          border-left: 4px solid var(--primary-color);
        }

        .tone-guidance h4 {
          margin: 0 0 1rem 0;
          color: var(--text-primary);
          font-size: 1.1rem;
        }

        .tone-guidance p {
          margin: 0 0 1rem 0;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .tone-guidance ul {
          margin: 0 0 1.5rem 0;
          padding-left: 1.5rem;
          color: var(--text-secondary);
        }

        .tone-guidance li {
          margin-bottom: 0.5rem;
          line-height: 1.5;
        }

        .example-topics {
          border-top: 1px solid var(--border-glass);
          padding-top: 1rem;
        }

        .example-topics strong {
          color: var(--text-primary);
          display: block;
          margin-bottom: 0.75rem;
        }

        .topic-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .topic-tag {
          background: var(--gradient-primary);
          color: white;
          padding: 0.4rem 0.8rem;
          border-radius: 1rem;
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: all var(--animation-speed) ease;
        }

        .topic-tag:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-glow);
        }

        .generate-btn {
          width: 100%;
          padding: 1rem 2rem;
          font-size: 1.1rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all var(--animation-speed) ease;
        }

        .generate-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .spinning {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .generated-content {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .content-header {
          padding: 1.5rem;
          border-radius: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .post-info h3 {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .post-stats {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .stat {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .seo-score {
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-weight: 600;
          font-size: 0.8rem;
        }

        .seo-score.good {
          background: var(--accent-secondary);
          color: white;
        }

        .seo-score.fair {
          background: #f59e0b;
          color: white;
        }

        .content-actions {
          display: flex;
          gap: 0.5rem;
        }

        .action-btn {
          padding: 0.75rem;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          color: var(--text-primary);
          transition: all var(--animation-speed) ease;
        }

        .action-btn:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-glow);
        }

        .content-preview {
          padding: 2rem;
          border-radius: 1rem;
          max-height: 600px;
          overflow-y: auto;
        }

        .preview-header h4 {
          color: var(--text-primary);
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        .excerpt {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .keywords {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }

        .keyword-tag {
          background: var(--primary-color);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .content-body {
          border-top: 1px solid var(--border-glass);
          padding-top: 2rem;
        }

        .content-body pre {
          white-space: pre-wrap;
          word-wrap: break-word;
          line-height: 1.6;
          color: var(--text-primary);
          font-family: inherit;
          margin: 0;
        }

        .saved-posts {
          padding: 2rem;
          border-radius: 1.5rem;
          margin-top: 3rem;
        }

        .saved-posts h3 {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 2rem;
          color: var(--text-primary);
        }

        .posts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .saved-post-card {
          padding: 1.5rem;
          border-radius: 1rem;
          transition: all var(--animation-speed) ease;
        }

        .saved-post-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-glow);
        }

        .saved-post-card h4 {
          color: var(--text-primary);
          margin-bottom: 0.5rem;
          font-size: 1.1rem;
        }

        .saved-post-card p {
          color: var(--text-secondary);
          margin-bottom: 1rem;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .post-meta {
          display: flex;
          gap: 1rem;
          font-size: 0.8rem;
          color: var(--text-light);
        }

        @media (max-width: 1024px) {
          .generator-layout {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .generator-form {
            position: static;
          }
        }

        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
          }

          .content-header {
            flex-direction: column;
            align-items: stretch;
            gap: 1rem;
          }

          .content-actions {
            justify-content: center;
          }

          .posts-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default BlogGenerator;