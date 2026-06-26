export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  type: "geleia" | "torta" | "custom";
  image: string;
  rating: number;
  badges: string[];
  volume_weight: string;
  ingredients: string[];
}

export interface CustomJamRecipe {
  baseFruit: string;
  seasonalFruit: string;
  sweetener: string;
  spices: string[];
  intensity: "suave" | "equilibrada" | "intensa";
  textNote: string;
}

export interface CartItem {
  id: string; // Unique cartridge instance identifier (products can have multiple with different custom specs)
  product: Product;
  quantity: number;
  customRecipe?: CustomJamRecipe;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  email: string;
  deliveryMethod: "entrega" | "retirada";
  addressStreet: string;
  addressNum: string;
  addressCity: string;
  notes: string;
}
