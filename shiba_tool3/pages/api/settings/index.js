// Mock API for settings management
// In production, this would connect to a real database and use proper encryption

let userSettings = {
  id: '1',
  userId: 'user-1',
  keeperApiKey: '',
  rakutenId: '',
  autoUpdateEnabled: false,
  updateSchedule: '02:00',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
      // In production, fetch user-specific settings from database
      return res.status(200).json(userSettings);
    
    case 'PUT':
      // In production, validate and encrypt sensitive data before saving
      const updatedSettings = {
        ...userSettings,
        ...req.body,
        updatedAt: new Date().toISOString(),
      };
      
      // Simulate validation
      if (req.body.keeperApiKey && req.body.keeperApiKey.length < 10) {
        return res.status(400).json({ 
          message: 'Keeper APIキーが短すぎます' 
        });
      }
      
      userSettings = updatedSettings;
      return res.status(200).json(userSettings);
    
    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}