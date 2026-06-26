import { Product } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "g-laranja",
    name: "Geleia de Laranja de Doce Colheita",
    description: "Um clássico refrescante feito com laranjas maduras colhidas direto nos pomares ensolarados de nossa fazenda. Textura brilhante e equilíbrio perfeito entre acidez e dulçor natural.",
    price: 24.90,
    type: "geleia",
    image: "/src/assets/images/geleias_showcase_1781560153090.jpg",
    rating: 4.8,
    badges: ["100% Natural", "Destaque"],
    volume_weight: "Pote de 320g",
    ingredients: ["Laranja orgânica fresca", "Suco de limão", "Açúcar demerara orgânico"]
  },
  {
    id: "g-maca",
    name: "Geleia de Maçã de Doce Colheita",
    description: "Nossa geleia premium de maçãs selecionadas com um toque sutil de canela em rama. Feita sob fogo lento em tachos de cobre tradicionais para uma harmonia aromática reconfortante.",
    price: 26.50,
    type: "geleia",
    image: "/src/assets/images/geleias_showcase_1781560153090.jpg",
    rating: 4.9,
    badges: ["Sucesso de Vendas", "Receita de Família"],
    volume_weight: "Pote de 320g",
    ingredients: ["Maçãs selecionadas da fazenda", "Canela em rama", "Suco de maçã concentrado", "Açúcar orgânico"]
  },
  {
    id: "g-manga",
    name: "Geleia de Manga de Doce Colheita",
    description: "Fragrância tropical inigualável! Feita com polpa carnuda de mangas colhidas no auge da estação. Sabor exótico, encorpado e rico em fibras e antioxidantes naturais.",
    price: 25.90,
    type: "geleia",
    image: "/src/assets/images/geleias_showcase_1781560153090.jpg",
    rating: 4.7,
    badges: ["Sabor de Verão", "Vegano"],
    volume_weight: "Pote de 320g",
    ingredients: ["Mango Hadem/Palmer frescos", "Limão cravo", "Pectina cítrica de maçã", "Açúcar cristal orgânico"]
  },
  {
    id: "t-maca",
    name: "Torta de Maçã Rústica de Doce Colheita",
    description: "Torta folhada de maçã perfumada, montada com pétalas crocantes dispostas em espiral sobre um creme leve de baunilha da fazenda. Assada até o dourado perfeito.",
    price: 68.00,
    type: "torta",
    image: "/src/assets/images/tortas_showcase_1781560169665.jpg",
    rating: 4.9,
    badges: ["Fornada Diária", "Feito com Amor"],
    volume_weight: "Inteira (Aprox. 1.2kg)",
    ingredients: ["Maçãs vermelhas galas", "Massa folhada amanteigada", "Creme de confeiteiro artesanal", "Geleia de brilho de maçã"]
  },
  {
    id: "t-manga",
    name: "Torta de Manga Tropical de Doce Colheita",
    description: "Sabor marcante e inesquecível. Crosta crocante recheada com um sedoso curd de manga orgânica e finalizada com pedaços suculentos de polpa fresca arranjados à mão.",
    price: 65.00,
    type: "torta",
    image: "/src/assets/images/tortas_showcase_1781560169665.jpg",
    rating: 4.8,
    badges: ["Exclusividade", "Refrescante"],
    volume_weight: "Inteira (Aprox. 1.1kg)",
    ingredients: ["Polpa de manga palmer", "Massa sablé crocante", "Creme leve de queijo fresco", "Compota de manga"]
  },
  {
    id: "t-laranja",
    name: "Torta de Laranja Caramelizada de Doce Colheita",
    description: "Uma sobremesa sofisticada que brinca com nuances doces e levemente cítricas. Coberta com fatias finas de laranja caramelizada que derretem na boca.",
    price: 62.00,
    type: "torta",
    image: "/src/assets/images/tortas_showcase_1781560169665.jpg",
    rating: 4.6,
    badges: ["Equilíbrio Ímpar"],
    volume_weight: "Inteira (Aprox. 1.0kg)",
    ingredients: ["Laranjas doces Bahia", "Massa frola amanteigada", "Curd cítrico intenso", "Xarope de caramelo floral"]
  }
];

export const FRUTAS_BASE = [
  { id: "laranja", name: "Laranja Bahia", icon: "🍊" },
  { id: "maca", name: "Maçã Gala", icon: "🍎" },
  { id: "manga", name: "Manga Palmer", icon: "🥭" }
];

export const FRUTAS_SAZONAIS = [
  { id: "figo", name: "Figo Roxo do Outono", icon: "🍇", season: "Outono" },
  { id: "amora", name: "Amora Silvestre da Primavera", icon: "🍓", season: "Primavera" },
  { id: "framboesa", name: "Framboesa do Bosque", icon: "🍒", season: "Primavera/Verão" },
  { id: "maracuja", name: "Maracujá Azedo do Verão", icon: "🍋", season: "Verão" },
  { id: "tangerina", name: "Tangerina Ponkan de Inverno", icon: "🍊", season: "Inverno" },
  { id: "caqui", name: "Caqui Chocolate da Estação", icon: "🍅", season: "Outono/Inverno" },
  { id: "physalis", name: "Physalis Selvagem Exótica", icon: "🌟", season: "Primavera" }
];

export const ADOCANTES = [
  { id: "açucar-demerara", name: "Açúcar Demerara Orgânico", desc: "Açúcar menos processado que preserva nutrientes e confere doçura sutil com notas de melaço." },
  { id: "mel-silvestre", name: "Mel Silvestre do Nosso Apiário", desc: "Adoçado naturalmente com mel produzido pelas abelhas polinizadoras de nossos pomares." },
  { id: "sem-açucar", name: "Sem Açúcar Adicionado (Suco de Maçã)", desc: "100% adoçado apenas com o próprio açúcar natural das frutas concentradas e pectina." },
  { id: "xilitol", name: "Xilitol Natural de Plantas", desc: "Opção com baixo índice glicêmico para quem deseja zero açúcar clássico e zero calorias de sacarose." }
];

export const ESPECIARIAS = [
  { id: "canela", name: "Canela em Rama", icon: "🥖" },
  { id: "alecrim", name: "Alecrim Fresco da Horta", icon: "🌿" },
  { id: "pimenta-rosa", name: "Grãos de Pimenta Rosa", icon: "🌸" },
  { id: "cravo", name: "Cravo-da-Índia Tradicional", icon: "📌" },
  { id: "manjericao", name: "Manjericão Sagrado", icon: "🌱" },
  { id: "gengibre", name: "Gengibre Ralado na Hora", icon: "🍠" },
  { id: "baunilha", name: "Fava de Baunilha Natural", icon: "🪵" },
  { id: "flor-de-sal", name: "Flor de Sal de Acabamento", icon: "🧂" }
];
