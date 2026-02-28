export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: Category;
  sizes: Size[];
  colors: ColorOption[];
  inStock: boolean;
  isNew: boolean;
  isFeatured: boolean;
  rating: number;
  reviewCount: number;
  tags: string[];
}

export interface ColorOption {
  name: string;
  hex: string;
}

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export type Category =
  | 'tees'
  | 'hoodies'
  | 'joggers'
  | 'jackets'
  | 'accessories'
  | 'sneakers'
  | 'caps';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: Size;
  selectedColor: ColorOption;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  addresses: Address[];
  wishlist: string[];
}

export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  trackingNumber?: string;
  shippingAddress: Address;
}

// Categories metadata
export const CATEGORIES: { key: Category; label: string; icon: string }[] = [
  { key: 'tees', label: 'Tees', icon: 'tshirt-crew' },
  { key: 'hoodies', label: 'Hoodies', icon: 'hoodie' },
  { key: 'joggers', label: 'Joggers', icon: 'run' },
  { key: 'jackets', label: 'Jackets', icon: 'jacket' },
  { key: 'accessories', label: 'Accessories', icon: 'watch' },
  { key: 'sneakers', label: 'Sneakers', icon: 'shoe-sneaker' },
  { key: 'caps', label: 'Caps', icon: 'hat-fedora' },
];

// Mock product data
export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p001',
    name: 'Desi Drip Oversized Tee',
    description:
      'Premium cotton oversized tee featuring hand-drawn Indian mandala fusion art. Streetwear meets tradition in this statement piece.',
    price: 49.99,
    originalPrice: 69.99,
    images: ['https://placeholder.com/tee-001-front.jpg'],
    category: 'tees',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Midnight Black', hex: '#0A0A0A' },
      { name: 'Saffron', hex: '#FF6B35' },
      { name: 'Off White', hex: '#F8F9FA' },
    ],
    inStock: true,
    isNew: true,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 124,
    tags: ['oversized', 'mandala', 'bestseller'],
  },
  {
    id: 'p002',
    name: 'Chakra Energy Hoodie',
    description:
      'Heavyweight fleece hoodie with embroidered chakra symbols down the sleeve. Kangaroo pocket, ribbed cuffs.',
    price: 89.99,
    images: ['https://placeholder.com/hoodie-001-front.jpg'],
    category: 'hoodies',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Charcoal', hex: '#36454F' },
      { name: 'Deep Purple', hex: '#4A0E4E' },
    ],
    inStock: true,
    isNew: false,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 87,
    tags: ['heavyweight', 'embroidered', 'chakra'],
  },
  {
    id: 'p003',
    name: 'Mumbai Nights Joggers',
    description:
      'Tapered joggers with reflective INDVA logo and side pocket zipper details. Inspired by Mumbai nightlife.',
    price: 64.99,
    images: ['https://placeholder.com/jogger-001-front.jpg'],
    category: 'joggers',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', hex: '#0A0A0A' },
      { name: 'Olive', hex: '#556B2F' },
    ],
    inStock: true,
    isNew: true,
    isFeatured: false,
    rating: 4.6,
    reviewCount: 56,
    tags: ['reflective', 'tapered', 'jogger'],
  },
  {
    id: 'p004',
    name: 'Rangoli Bomber Jacket',
    description:
      'Lightweight bomber jacket with rangoli-inspired embroidery on the back panel. Satin lining, zip closure.',
    price: 129.99,
    originalPrice: 159.99,
    images: ['https://placeholder.com/jacket-001-front.jpg'],
    category: 'jackets',
    sizes: ['M', 'L', 'XL'],
    colors: [
      { name: 'Black', hex: '#0A0A0A' },
      { name: 'Army Green', hex: '#4B5320' },
    ],
    inStock: true,
    isNew: false,
    isFeatured: true,
    rating: 4.7,
    reviewCount: 42,
    tags: ['bomber', 'embroidered', 'rangoli', 'limited'],
  },
  {
    id: 'p005',
    name: 'Om Snapback Cap',
    description:
      'Structured snapback with 3D embroidered Om symbol. Adjustable snap closure, flat brim.',
    price: 34.99,
    images: ['https://placeholder.com/cap-001-front.jpg'],
    category: 'caps',
    sizes: ['M'],
    colors: [
      { name: 'Black/Gold', hex: '#0A0A0A' },
      { name: 'White/Orange', hex: '#FFFFFF' },
    ],
    inStock: true,
    isNew: false,
    isFeatured: false,
    rating: 4.5,
    reviewCount: 198,
    tags: ['snapback', 'embroidered', 'om'],
  },
  {
    id: 'p006',
    name: 'Karma Chain Bracelet',
    description:
      'Stainless steel chain bracelet with engraved Sanskrit "Karma" text. Adjustable clasp.',
    price: 29.99,
    images: ['https://placeholder.com/bracelet-001.jpg'],
    category: 'accessories',
    sizes: ['M'],
    colors: [{ name: 'Silver', hex: '#C0C0C0' }, { name: 'Gold', hex: '#FFD700' }],
    inStock: true,
    isNew: true,
    isFeatured: false,
    rating: 4.4,
    reviewCount: 73,
    tags: ['bracelet', 'karma', 'sanskrit'],
  },
  {
    id: 'p007',
    name: 'Lotus High-Top Sneakers',
    description:
      'Canvas high-tops with hand-painted lotus design. Cushioned insole, vulcanized rubber sole.',
    price: 109.99,
    images: ['https://placeholder.com/sneaker-001-front.jpg'],
    category: 'sneakers',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'White/Saffron', hex: '#FFFFFF' },
      { name: 'Black/Gold', hex: '#0A0A0A' },
    ],
    inStock: false,
    isNew: false,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 31,
    tags: ['high-top', 'hand-painted', 'lotus', 'sold-out'],
  },
  {
    id: 'p008',
    name: 'Spice Route Drop-Shoulder Tee',
    description:
      'Relaxed drop-shoulder fit with spice route map graphic. Garment-dyed for a vintage feel.',
    price: 44.99,
    images: ['https://placeholder.com/tee-002-front.jpg'],
    category: 'tees',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Washed Sand', hex: '#C2B280' },
      { name: 'Faded Black', hex: '#2C2C2C' },
    ],
    inStock: true,
    isNew: false,
    isFeatured: false,
    rating: 4.3,
    reviewCount: 89,
    tags: ['drop-shoulder', 'vintage', 'garment-dyed'],
  },
];
