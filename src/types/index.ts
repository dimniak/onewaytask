export interface Transaction {
    id: string;
    type: 'Payment' | 'Credit';
    amount: number;
    name: string;
    description: string;
    date: string; // ISO формат або рядок
    pending: boolean;
    authorizedUser?: string;
    icon?: string;
  }