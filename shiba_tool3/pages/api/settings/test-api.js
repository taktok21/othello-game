// Mock API for testing external API connections
// In production, this would make actual API calls to test connectivity

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { apiType, credentials } = req.body;

  try {
    // Simulate API testing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    switch (apiType) {
      case 'keeper':
        if (!credentials.keeperApiKey) {
          return res.status(400).json({ 
            message: 'Keeper APIキーが設定されていません' 
          });
        }
        
        // Mock validation - in production, make actual API call
        if (credentials.keeperApiKey.length < 10) {
          return res.status(401).json({ 
            message: 'Keeper APIキーが無効です' 
          });
        }
        
        return res.status(200).json({ 
          message: 'Keeper API接続テスト成功' 
        });
      
      case 'rakuten':
        if (!credentials.rakutenId) {
          return res.status(400).json({ 
            message: '楽天IDが設定されていません' 
          });
        }
        
        // Mock validation - in production, make actual API call
        if (credentials.rakutenId.length < 5) {
          return res.status(401).json({ 
            message: '楽天IDが無効です' 
          });
        }
        
        return res.status(200).json({ 
          message: '楽天API接続テスト成功' 
        });
      
      default:
        return res.status(400).json({ 
          message: '不明なAPIタイプです' 
        });
    }
  } catch (error) {
    console.error('API test error:', error);
    return res.status(500).json({ 
      message: 'API接続テストでエラーが発生しました',
      error: error.message 
    });
  }
}