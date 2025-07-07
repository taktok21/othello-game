// Mock API for repeat products management
// In production, this would connect to a real database

let repeatProducts = [
  {
    id: '1',
    asin: 'B0BNHXDT9Q',
    name: 'カルディ オリジナル コーヒー豆',
    currentPrice: 2000,
    purchasePrice: 1344,
    netIncome: 1700,
    currentProfit: 356,
    autoUpdate: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    asin: 'B07BNQG45P',
    name: 'Nintendo Switch Joy-Con',
    currentPrice: 8500,
    purchasePrice: 7000,
    netIncome: 7225,
    currentProfit: 225,
    autoUpdate: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return res.status(200).json(repeatProducts);
    
    case 'POST':
      const { asin, purchasePrice } = req.body;
      
      if (!asin || !purchasePrice) {
        return res.status(400).json({ 
          message: 'ASIN and purchase price are required' 
        });
      }

      // Mock product data fetch
      const mockProductNames = {
        'B0BNHXDT9Q': 'カルディ オリジナル コーヒー豆',
        'B07BNQG45P': 'Nintendo Switch Joy-Con',
        'B08N5WRWNW': 'ザバス ホエイプロテイン100 ココア味',
      };

      const currentPrice = Math.floor(Math.random() * 5000) + 2000;
      const netIncome = currentPrice * 0.85; // Assuming 15% fees
      const currentProfit = netIncome - purchasePrice;
      
      const newRepeatProduct = {
        id: Date.now().toString(),
        asin,
        name: mockProductNames[asin] || `商品 ${asin}`,
        currentPrice,
        purchasePrice: parseFloat(purchasePrice),
        netIncome,
        currentProfit,
        autoUpdate: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      repeatProducts.push(newRepeatProduct);
      return res.status(201).json(newRepeatProduct);
    
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}