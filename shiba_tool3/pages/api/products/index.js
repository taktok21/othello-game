// Mock API for products management
// In production, this would connect to a real database

let products = [
  {
    id: '1',
    asin: 'B08N5WRWNW',
    name: 'ザバス ホエイプロテイン100 ココア味',
    imageUrl: 'https://via.placeholder.com/150',
    currentPrice: 7480,
    targetPrice: 8000,
    purchasePrice: 4950,
    netIncome: 6800,
    profit: 1850,
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return res.status(200).json(products);
    
    case 'POST':
      const newProduct = {
        id: Date.now().toString(),
        ...req.body,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      products.push(newProduct);
      return res.status(201).json(newProduct);
    
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}