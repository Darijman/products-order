import { Product } from './Product';

export interface Order {
  id: string;
  products: Product[];
  address: string;
  orderPlacedDate: Date;
  deliveryDate: Date;
  isDelivered: boolean;
  totalPrice: number;
  shippingType: 'STANDARD' | 'FAST';
}
