import { Product } from './Product';

export interface Order {
  id: string;
  products: Product[];
  address: string;
  deliveryDate: Date;
  isDelivered: boolean;
}
