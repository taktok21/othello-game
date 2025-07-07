// Mock API for individual repeat product operations
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
  }
];

export default function handler(req, res) {
  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      const repeatProduct = repeatProducts.find(p => p.id === id);
      if (!repeatProduct) {
        return res.status(404).json({ message: 'Repeat product not found' });
      }
      return res.status(200).json(repeatProduct);
    
    case 'PUT':
      const productIndex = repeatProducts.findIndex(p => p.id === id);
      if (productIndex === -1) {
        return res.status(404).json({ message: 'Repeat product not found' });
      }
      
      // Recalculate profit if purchase price changed
      const updatedData = { ...req.body };
      if (updatedData.purchasePrice) {        
        const currentPrice = repeatProducts[productIndex].currentPrice;
        const netIncome = currentPrice * 0.85; // Assuming 15% fees
        updatedData.netIncome = netIncome;
        updatedData.currentProfit = netIncome - updatedData.purchasePrice;
      }
      
      repeatProducts[productIndex] = {
        ...repeatProducts[productIndex],
        ...updatedData,
        updatedAt: new Date().toISOString(),
      };
      
      return res.status(200).json(repeatProducts[productIndex]);
    
    case 'DELETE':
      const deleteIndex = repeatProducts.findIndex(p => p.id === id);
      if (deleteIndex === -1) {
        return res.status(404).json({ message: 'Repeat product not found' });
      }
      
      repeatProducts.splice(deleteIndex, 1);
      return res.status(204).end();
    
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}