export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  producer: Producer;
  unit: string;
  inStock: boolean;
  isOrganic: boolean;
  isLocal: boolean;
  rating: number;
}

export interface Producer {
  id: string;
  name: string;
  description: string;
  image: string;
  location: string;
  distance: number;
  rating: number;
  products: Product[];
  categories: string[];
}

export interface Category {
  id: string;
  name: string;
  image: string;
  productsCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'ready' | 'completed' | 'cancelled';
  date: string;
  deliveryMethod: 'pickup' | 'delivery';
  deliveryAddress?: string;
  pickupLocation?: string;
  pickupTime?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
  paymentMethods: PaymentMethod[];
  favorites: Product[];
  orders: Order[];
}

export interface Address {
  id: string;
  street: string;
  city: string;
  zipCode: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal';
  lastFour?: string;
  cardType?: string;
  isDefault: boolean;
}