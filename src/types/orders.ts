
// If this file doesn't exist yet or needs updating
export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  status: string;
  customerName: string;
  orderDate: string;
  total: number;
  items: OrderItem[];
}
