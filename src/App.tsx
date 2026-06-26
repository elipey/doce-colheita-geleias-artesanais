import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Map, 
  ArrowRight, 
  Compass, 
  ChefHat, 
  Shield, 
  Calendar, 
  Heart,
  ChevronRight
} from "lucide-react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductCard from "./components/ProductCard";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import { PRODUCTS } from "./data";
import { CartItem, Product } from "./types";

export default function App() {
  // Shopping Cart Persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("doce_colheita_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI Control states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("doce_colheita_cart", JSON.stringify(cart));
  }, [cart]);

  // Navigate to explicit DOM ID elements smoothly
  const handleNavigation = (sectionId: string) => {
    setActiveSection(sectionId);
    
    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity: number) => {
    setCart((prev) => {
      // Find standard product
      const existing = prev.find((item) => item.product.id === product.id && item.product.type !== "custom");
      
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.product.type !== "custom"
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [
        ...prev,
        {
          id: product.id,
          product,
          quantity
        }
      ];
    });
  };



  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const geleias = PRODUCTS.filter((p) => p.type === "geleia");
  const tortas = PRODUCTS.filter((p) => p.type === "torta");

  return (
    <div className="min-h-screen bg-transparent font-sans text-stone-800 antialiased selection:bg-amber-100 selection:text-amber-900">
      
      {/* Header coordinates */}
      <Header
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigation}
      />

      {/* Hero section */}
      <div id="home">
        <Hero
          onExploreCatalog={() => handleNavigation("catalogo")}
          onExploreFarm={() => handleNavigation("fazenda")}
        />
      </div>

      <main className="space-y-16 pb-20">

        {/* 1. Sabor Catalog Section */}
        <section id="catalogo" className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
          
          <div className="flex flex-col space-y-4 text-center mb-10">
            <div className="mx-auto inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 uppercase tracking-widest">
              <Compass className="h-4 w-4 text-emerald-600" />
              Sinfonias Prontas da Cozinha
            </div>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-emerald-950 sm:text-4xl">
              Nossas Linhas Tradicionais
            </h2>
            <p className="mx-auto max-w-2xl text-stone-500 text-sm">
              Conheça e saboreie o frescor original de Doce Colheita. Nossos potes de geleia rústicos e tortas folhadas fresquinhas feitos sob encomenda com ingredientes 100% orgânicos.
            </p>
          </div>

          {/* Subcategory 1: Geleias */}
          <div className="mb-12">
            <h3 className="font-serif text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2 border-b border-stone-200/60 pb-2">
              <span className="text-xl">🍯</span> Geleias Rústicas Artesanais
            </h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {geleias.map((jam) => (
                <ProductCard
                  key={jam.id}
                  product={jam}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </div>

          {/* Subcategory 2: Tortas */}
          <div>
            <h3 className="font-serif text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2 border-b border-stone-200/60 pb-2">
              <span className="text-xl">🥧</span> Tortas Rústicas Folhadas
            </h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {tortas.map((pie) => (
                <ProductCard
                  key={pie.id}
                  product={pie}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </div>

        </section>


        {/* 3. A Fazenda Storytelling Section */}
        <section id="fazenda" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            
            {/* Left Storyteller */}
            <div className="space-y-6 lg:col-span-6">
              
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 uppercase tracking-widest">
                <Heart className="h-4 w-4 text-emerald-600 fill-emerald-600" />
                Respeito à Natureza • Nossa História
              </div>

              <h2 className="font-serif text-3xl font-extrabold text-emerald-950 sm:text-4xl leading-tight">
                Da Semente ao Tacho, uma tradição de amor familiar.
              </h2>

              <p className="text-stone-600 text-sm leading-relaxed">
                Nossa fazenda, com sede em uma tradicional área rural preservada, abriga 25 hectares de solo fértil irrigado por fontes naturais cristalinas. É aqui que nossa equipe familiar semeia, cultiva e colhe maçãs doces, mangas suculentas e laranjas intensas sem qualquer pesticida químico. 
              </p>

              {/* Grid attributes of artisanal processing */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-2">
                <div className="flex gap-3 items-start">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-800 font-bold text-xs shadow-xs">
                    🍂
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 uppercase">Colheita Ecológica</h4>
                    <p className="text-[11px] text-stone-500 leading-normal mt-0.5">As frutas são colhidas manualmente apenas no ponto áureo de madureza aromática.</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs shadow-xs">
                    🔥
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 uppercase">Tachos de Cobre a Lenha</h4>
                    <p className="text-[11px] text-stone-500 leading-normal mt-0.5">O cozimento lento e atento preserva os óleos essenciais, a fibra e a cor cintilante.</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-800 font-bold text-xs shadow-xs">
                    🌿
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 uppercase">Livre de Conservantes</h4>
                    <p className="text-[11px] text-stone-500 leading-normal mt-0.5">Nossa conservação é garantida de forma natural com suco de limão e pasteurização fina.</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-800 font-bold text-xs shadow-xs">
                    🍯
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 uppercase">Rastreabilidade Total</h4>
                    <p className="text-[11px] text-stone-500 leading-normal mt-0.5">Identifique o pomar e a data exata de envasamento impressos no barbante do seu pote.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-amber-100 bg-[#fdfaf2] p-4 text-xs font-medium text-amber-900 leading-normal flex items-start gap-2.5">
                <span className="text-lg">🌿</span>
                <span>
                  <strong>Compromisso de Sustentabilidade:</strong> Reservamos 30% de nossa terra para mata nativa intocada, favorecendo abelhas polinizadoras e preservando as águas da foz.
                </span>
              </div>

            </div>

            {/* Right Picture Column of the farm and orchards */}
            <div className="lg:col-span-6 relative">
              <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white p-3 shadow-lg">
                <img
                  src="/src/assets/images/fazenda_producao_1781560189379.jpg"
                  alt="Nossa Fazenda de Geleia Doce Colheita"
                  className="rounded-2xl aspect-[4/3] w-full object-cover shadow-inner hover:scale-[1.01] transition duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Floating label */}
              <div className="absolute -bottom-4 -right-4 rounded-2xl bg-stone-900 text-amber-200 p-4 border border-amber-900 shadow-xl max-w-xs text-xs space-y-1 sm:block hidden">
                <span className="block font-bold uppercase tracking-wider text-[9px] text-amber-400">Nossa Propriedade</span>
                <span className="block italic">"Onde a fruta nasce sob o sol e vira doce no abraço da tradição."</span>
              </div>
            </div>

          </div>
        </section>

        {/* 4. Contact Coordinate & Visiting Section */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
          <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-10 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="space-y-3">
              <h4 className="font-serif text-lg font-bold text-emerald-950 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-600" />
                Nossos Pomares
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed font-sans">
                Estrada das Amoras, Km 12 (Área Rural)<br />
                São Paulo - SP, CEP 04510-900<br />
                Coordenadas de Acesso Turístico Livre.
              </p>
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-800"
              >
                Como chegar na fazenda <ChevronRight className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="space-y-3">
              <h4 className="font-serif text-lg font-bold text-emerald-950 flex items-center gap-2">
                <Clock className="h-4 w-4 text-emerald-600" />
                Atendimento e Encomendas
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed font-sans">
                Segunda a Sábado: <strong>08h às 18h</strong><br />
                Domingos (Colheita aberta): <strong>09h às 14h</strong><br />
                Contato para Visitas Escolares ou Eventos de Família.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-serif text-lg font-bold text-emerald-950 flex items-center gap-2">
                <Phone className="h-4 w-4 text-amber-600 animate-bounce" />
                Fale Direto Conosco
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed font-sans">
                WhatsApp Vendas: <strong>(11) 99876-0044</strong><br />
                E-mail: <strong>contato@docecolheitageleias.com.br</strong><br />
                Doce Colheita Geleias Artesanais LTDA.
              </p>
              <div className="flex gap-2.5 pt-1">
                <span className="text-lg cursor-pointer hover:scale-110 transition filter drop-shadow-xs">📞</span>
                <span className="text-lg cursor-pointer hover:scale-110 transition filter drop-shadow-xs">💬</span>
                <span className="text-lg cursor-pointer hover:scale-110 transition filter drop-shadow-xs">📸</span>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* Cart Drawer coordinates */}
      <CartDrawer
        isOpen={isCartOpen}
        cart={cart}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout overlay modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        cart={cart}
        onClose={() => setIsCheckoutOpen(false)}
        onClearCart={handleClearCart}
      />

      {/* Aesthetic footer */}
      <footer className="border-t border-amber-100 bg-stone-100 py-12 text-stone-500 text-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="flex justify-center items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-600" />
            <span className="font-serif text-sm font-bold text-emerald-950">Doce Colheita</span>
            <span className="font-sans text-[10px] uppercase font-semibold text-amber-700 tracking-wider">Geleias Artesanais LTDA</span>
            <span className="h-2 w-2 rounded-full bg-emerald-600" />
          </div>
          <p className="max-w-md mx-auto leading-relaxed text-stone-400 font-sans text-[11px]">
            © 2026 Doce Colheita Geleias Artesanais LTDA. CNPJ: 12.345.678/0001-90. Estrada Rural das Amoras, Km 12. Todos os direitos reservados.
          </p>
          <div className="text-[10px] text-stone-400 tracking-widest uppercase">
            Do campo para a sua mesa, com amor e respeito à natureza.
          </div>
        </div>
      </footer>

    </div>
  );
}
