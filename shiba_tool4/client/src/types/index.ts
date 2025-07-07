export interface User {
  id: number;
  email: string;
  keeperApiKey?: string;
  rakutenId?: string;
  autoUpdateEnabled: boolean;
}

export interface Product {
  id: number;
  userId: number;
  asin: string;
  productName?: string;
  productImageUrl?: string;
  currentPrice?: number;
  targetSellPrice?: number;
  purchasePrice?: number;
  fees?: number;
  netIncome?: number;
  profit?: number;
  isSellable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RepeatItem {
  id: number;
  userId: number;
  asin: string;
  productName?: string;
  productImageUrl?: string;
  currentPrice?: number;
  purchasePrice?: number;
  fees?: number;
  netIncome?: number;
  profit?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Settings {
  keeperApiKey?: string;
  rakutenId?: string;
  autoUpdateEnabled: boolean;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, keeperApiKey?: string, rakutenId?: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}