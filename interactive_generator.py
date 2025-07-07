#!/usr/bin/env python3
"""
インタラクティブ記事生成ツール
ユーザーから入力を受け取って記事を生成します。
"""

from article_generator import ArticleGenerator, ArticleConfig


def collect_user_input() -> ArticleConfig:
    """ユーザーから記事生成に必要な情報を収集"""
    
    print("🚀 クラウドワークス記事自動生成ツール")
    print("=" * 50)
    print()
    
    # 各項目の入力を受け取る
    print("📝 記事の基本情報を入力してください：")
    print()
    
    purpose = input("【目的】記事の目的を入力してください\n例：初心者に分かりやすく制度のメリットを伝える\n> ")
    print()
    
    theme = input("【テーマ】記事のテーマ・タイトルを入力してください\n例：積立NISAとは？仕組みとメリットをわかりやすく解説\n> ")
    print()
    
    audience = input("【読者層】ターゲット読者を入力してください\n例：20〜30代の投資初心者、働く主婦など\n> ")
    print()
    
    keywords_input = input("【SEOキーワード】キーワードをカンマ区切りで入力してください\n例：積立NISA,節税,投資初心者\n> ")
    keywords = [kw.strip() for kw in keywords_input.split(',') if kw.strip()]
    print()
    
    tone = input("【トーン・文体】記事の文体・雰囲気を入力してください\n例：やさしく、親しみやすい。信頼感がありプロフェッショナル\n> ")
    print()
    
    return ArticleConfig(
        purpose=purpose,
        theme=theme,
        audience=audience,
        keywords=keywords,
        tone=tone
    )


def save_article_to_file(article: str, filename: str = None) -> str:
    """生成された記事をファイルに保存"""
    
    if not filename:
        import datetime
        timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"generated_article_{timestamp}.md"
    
    try:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(article)
        return filename
    except Exception as e:
        print(f"❌ ファイル保存エラー: {e}")
        return None


def main():
    """メイン処理"""
    
    try:
        # ユーザー入力を収集
        config = collect_user_input()
        
        print("⏳ 記事を生成中...")
        print()
        
        # 記事生成
        generator = ArticleGenerator()
        article = generator.generate_article(config)
        
        # 結果表示
        print("✅ 記事生成が完了しました！")
        print("=" * 50)
        print(article)
        print("=" * 50)
        print()
        
        # ファイル保存の確認
        save_choice = input("📁 この記事をファイルに保存しますか？ (y/n): ").strip().lower()
        
        if save_choice in ['y', 'yes', 'はい']:
            filename = input("💾 ファイル名を入力してください（空白でデフォルト名）: ").strip()
            if not filename:
                filename = None
            
            saved_file = save_article_to_file(article, filename)
            if saved_file:
                print(f"✅ 記事を「{saved_file}」に保存しました！")
            else:
                print("❌ ファイル保存に失敗しました。")
        
        print()
        print("🎉 記事生成ツールをご利用いただき、ありがとうございました！")
        
    except KeyboardInterrupt:
        print("\n\n👋 処理を中断しました。")
    except Exception as e:
        print(f"❌ エラーが発生しました: {e}")


if __name__ == "__main__":
    main()