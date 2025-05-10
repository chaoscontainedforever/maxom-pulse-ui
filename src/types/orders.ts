
export interface OrderItem {
  id: string;
  customerName: string;
  customerPhone?: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    modifiers?: any[];
    status?: string;
  }>;
  total: number;
  status: string;
  timestamp: Date;
  special_instructions?: string;
  restaurant_id?: string;
}
