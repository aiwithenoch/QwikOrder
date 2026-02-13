
export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  safetyBuffer: number;
  image: string;
}

export enum OrderStatus {
  NEW = 'New',
  AWAITING_PAYMENT = 'Awaiting Payment',
  PAID = 'Paid',
  DELIVERED = 'Delivered'
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  landmark: string;
  items: { productId: string; quantity: number; name: string }[];
  totalAmount: number;
  status: OrderStatus;
  paymentRef?: string;
  screenshot?: string;
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  address: string;
  orderCount: number;
  totalSpent: number;
}

export interface SMSBundle {
  count: number;
  price: number;
}
