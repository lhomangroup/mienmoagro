import { Product, Producer, Category, Order, User } from '@/types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Fruits & Légumes',
    image: 'https://images.pexels.com/photos/1660027/pexels-photo-1660027.jpeg',
    productsCount: 42
  },
  {
    id: '2',
    name: 'Viandes',
    image: 'https://images.pexels.com/photos/1927377/pexels-photo-1927377.jpeg',
    productsCount: 18
  },
  {
    id: '3',
    name: 'Produits Laitiers',
    image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg',
    productsCount: 24
  },
  {
    id: '4',
    name: 'Boulangerie',
    image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg',
    productsCount: 15
  },
  {
    id: '5',
    name: 'Boissons',
    image: 'https://images.pexels.com/photos/616833/pexels-photo-616833.jpeg',
    productsCount: 19
  },
  {
    id: '6',
    name: 'Épicerie',
    image: 'https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg',
    productsCount: 31
  }
];

export const producers: Producer[] = [
  {
    id: '1',
    name: 'Ferme des Belles Récoltes',
    description: 'Ferme familiale spécialisée dans la culture de fruits et légumes biologiques depuis 1995. Nous privilégions des méthodes de culture respectueuses de l\'environnement et de la biodiversité.',
    image: 'https://images.pexels.com/photos/2382665/pexels-photo-2382665.jpeg',
    location: 'Saint-Paul-de-Vence',
    distance: 8.5,
    rating: 4.8,
    products: [],
    categories: ['Fruits', 'Légumes', 'Bio']
  },
  {
    id: '2',
    name: 'Fromagerie Dupont',
    description: 'Artisans fromagers de père en fils, nous perpétuons la tradition du fromage au lait cru. Nos vaches broutent dans les pâturages des collines environnantes.',
    image: 'https://images.pexels.com/photos/6287264/pexels-photo-6287264.jpeg',
    location: 'Valbonne',
    distance: 12.3,
    rating: 4.6,
    products: [],
    categories: ['Fromages', 'Produits Laitiers']
  },
  {
    id: '3',
    name: 'Domaine Oliviers & Co',
    description: 'Producteurs d\'huile d\'olive extra vierge première pression à froid. Nos oliviers bénéficient d\'un terroir exceptionnel et d\'un savoir-faire ancestral.',
    image: 'https://images.pexels.com/photos/533191/pexels-photo-533191.jpeg',
    location: 'Grasse',
    distance: 15.7,
    rating: 4.9,
    products: [],
    categories: ['Huiles', 'Épicerie Fine']
  },
  {
    id: '4',
    name: 'Boucherie Martin',
    description: 'Élevage traditionnel de bovins et ovins nourris à l\'herbe. Nous proposons une viande de qualité, issue d\'animaux élevés dans le respect du bien-être animal.',
    image: 'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg',
    location: 'Antibes',
    distance: 6.2,
    rating: 4.7,
    products: [],
    categories: ['Viandes', 'Charcuterie']
  },
  {
    id: '5',
    name: 'Boulangerie Tradition',
    description: 'Artisan boulanger utilisant des farines biologiques locales. Nos pains, viennoiseries et pâtisseries sont fabriqués à la main chaque jour.',
    image: 'https://images.pexels.com/photos/1070946/pexels-photo-1070946.jpeg',
    location: 'Cannes',
    distance: 10.8,
    rating: 4.5,
    products: [],
    categories: ['Pains', 'Viennoiseries', 'Pâtisseries']
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Tomates Anciennes Bio',
    description: 'Un mélange coloré de variétés anciennes de tomates cultivées sans pesticides. Parfaites pour les salades d\'été ou en accompagnement.',
    price: 4.95,
    image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg',
    category: 'Fruits & Légumes',
    producer: producers[0],
    unit: 'kg',
    inStock: true,
    isOrganic: true,
    isLocal: true,
    rating: 4.7
  },
  {
    id: '2',
    name: 'Panier de Fraises',
    description: 'Fraises juteuses et sucrées cueillies à maturité. Variété Gariguette reconnue pour sa saveur exceptionnelle.',
    price: 6.50,
    image: 'https://images.pexels.com/photos/89778/strawberries-frisch-ripe-sweet-89778.jpeg',
    category: 'Fruits & Légumes',
    producer: producers[0],
    unit: 'barquette',
    inStock: true,
    isOrganic: true,
    isLocal: true,
    rating: 4.9
  },
  {
    id: '3',
    name: 'Camembert Fermier',
    description: 'Camembert au lait cru affiné pendant 3 semaines. Texture crémeuse et goût authentique de terroir.',
    price: 5.90,
    image: 'https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg',
    category: 'Produits Laitiers',
    producer: producers[1],
    unit: 'pièce',
    inStock: true,
    isOrganic: false,
    isLocal: true,
    rating: 4.8
  },
  {
    id: '4',
    name: 'Huile d\'Olive Extra Vierge',
    description: 'Huile d\'olive première pression à froid, extraite d\'olives cueillies à la main. Notes fruitées et légèrement poivrées.',
    price: 12.90,
    image: 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking.jpg',
    category: 'Épicerie',
    producer: producers[2],
    unit: '50cl',
    inStock: true,
    isOrganic: true,
    isLocal: true,
    rating: 5.0
  },
  {
    id: '5',
    name: 'Entrecôte de Bœuf',
    description: 'Entrecôte de bœuf d\'exception, issue de vaches élevées en plein air et nourries à l\'herbe. Parfaite pour le barbecue ou la poêle.',
    price: 25.80,
    image: 'https://images.pexels.com/photos/618775/pexels-photo-618775.jpeg',
    category: 'Viandes',
    producer: producers[3],
    unit: 'kg',
    inStock: true,
    isOrganic: false,
    isLocal: true,
    rating: 4.6
  },
  {
    id: '6',
    name: 'Pain de Campagne',
    description: 'Pain à la mie dense et à la croûte croustillante, pétri à la main et cuit au feu de bois. À base de farine bio et de levain naturel.',
    price: 3.90,
    image: 'https://images.pexels.com/photos/1756061/pexels-photo-1756061.jpeg',
    category: 'Boulangerie',
    producer: producers[4],
    unit: 'pièce',
    inStock: true,
    isOrganic: true,
    isLocal: true,
    rating: 4.5
  },
  {
    id: '7',
    name: 'Yaourt Nature',
    description: 'Yaourt onctueux au lait entier de vache. Sans sucre ajouté, parfait pour le petit-déjeuner ou en collation.',
    price: 1.20,
    image: 'https://images.pexels.com/photos/373882/pexels-photo-373882.jpeg',
    category: 'Produits Laitiers',
    producer: producers[1],
    unit: 'pot',
    inStock: true,
    isOrganic: false,
    isLocal: true,
    rating: 4.3
  },
  {
    id: '8',
    name: 'Courgettes Bio',
    description: 'Courgettes vertes cultivées sans pesticides. Idéales pour les ratatouilles, poêlées ou farcies.',
    price: 3.50,
    image: 'https://images.pexels.com/photos/128420/pexels-photo-128420.jpeg',
    category: 'Fruits & Légumes',
    producer: producers[0],
    unit: 'kg',
    inStock: true,
    isOrganic: true,
    isLocal: true,
    rating: 4.4
  }
];

// Update producers with their products
producers.forEach(producer => {
  producer.products = products.filter(product => product.producer.id === producer.id);
});

export const currentUser: User = {
  id: '1',
  name: 'Marie Durand',
  email: 'marie.durand@example.com',
  phone: '06 12 34 56 78',
  addresses: [
    {
      id: '1',
      street: '15 Rue des Oliviers',
      city: 'Nice',
      zipCode: '06000',
      isDefault: true
    },
    {
      id: '2',
      street: '8 Avenue du Soleil',
      city: 'Antibes',
      zipCode: '06600',
      isDefault: false
    }
  ],
  paymentMethods: [
    {
      id: '1',
      type: 'card',
      lastFour: '4242',
      cardType: 'Visa',
      isDefault: true
    },
    {
      id: '2',
      type: 'paypal',
      isDefault: false
    }
  ],
  favorites: [products[0], products[3], products[5]],
  orders: [
    {
      id: '1001',
      items: [
        { product: products[0], quantity: 2 },
        { product: products[3], quantity: 1 },
        { product: products[5], quantity: 1 }
      ],
      total: 27.65,
      status: 'completed',
      date: '2023-06-15',
      deliveryMethod: 'pickup',
      pickupLocation: 'Marché des Producteurs - Nice',
      pickupTime: '2023-06-16 18:00'
    },
    {
      id: '1002',
      items: [
        { product: products[2], quantity: 1 },
        { product: products[7], quantity: 2 }
      ],
      total: 12.90,
      status: 'processing',
      date: '2023-06-20',
      deliveryMethod: 'delivery',
      deliveryAddress: '15 Rue des Oliviers, Nice, 06000'
    }
  ]
};