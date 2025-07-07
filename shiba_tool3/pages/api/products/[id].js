// Mock API for individual product operations
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
  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      const product = products.find(p => p.id === id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.status(200).json(product);
    
    case 'PUT':
      const productIndex = products.findIndex(p => p.id === id);
      if (productIndex === -1) {
        return res.status(404).json({ message: 'Product not found' });
      }
      
      products[productIndex] = {
        ...products[productIndex],
        ...req.body,
        updatedAt: new Date().toISOString(),
      };
      
      return res.status(200).json(products[productIndex]);
    
    case 'DELETE':
      const deleteIndex = products.findIndex(p => p.id === id);
      if (deleteIndex === -1) {
        return res.status(404).json({ message: 'Product not found' });
      }
      
      products.splice(deleteIndex, 1);
      return res.status(204).end();
    
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}