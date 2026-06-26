import { ShoppingBag, ChefHat, Compass, MapPin } from "lucide-react";
import { CartItem } from "../types";

interface HeaderProps {
  cart: CartItem[];
  onOpenCart: () => void;
  activeSection: string;
  onNavigate: (section: string) => void;
}

export default function Header({ cart, onOpenCart, activeSection, onNavigate }: HeaderProps) {
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-amber-100 bg-stone-50/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo and Brand */}
        <div 
          onClick={() => onNavigate("home")} 
          className="flex cursor-pointer items-center gap-3 transition hover:opacity-90"
          id="brand-logo-container"
        >
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-amber-200 bg-white shadow-sm shadow-amber-900/10">
            <img 
              src="/src/assets/images/doce_colheita_logo_1781560137750.jpg" 
              alt="Doce Colheita Logo" 
              className="h-full w-full object-cover scale-110"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h1 className="font-serif text-lg font-bold leading-tight text-emerald-950 tracking-tight sm:text-xl">
              Doce Colheita
            </h1>
            <p className="font-sans text-[10px] md:text-xs font-semibold tracking-wide text-amber-700 uppercase">
              Geleias Artesanais LTDA
            </p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-emerald-900">
          <button 
            id="nav-catalogo"
            onClick={() => onNavigate("catalogo")}
            className={`flex items-center gap-1.5 py-2 transition-all hover:text-amber-600 border-b-2 ${
              activeSection === "catalogo" ? "border-amber-600 text-amber-700 font-semibold" : "border-transparent"
            }`}
          >
            <Compass className="h-4 w-4" />
            Nossos Sabores
          </button>

          <button 
            id="nav-fazenda"
            onClick={() => onNavigate("fazenda")}
            className={`flex items-center gap-1.5 py-2 transition-all hover:text-amber-600 border-b-2 ${
              activeSection === "fazenda" ? "border-amber-600 text-amber-700 font-semibold" : "border-transparent"
            }`}
          >
            <MapPin className="h-4 w-4 text-emerald-600" />
            A Fazenda
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          <button
            id="header-cart-btn"
            onClick={onOpenCart}
            className="group relative flex h-11 items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 text-amber-900 shadow-sm transition-all hover:bg-amber-100 hover:border-amber-300"
          >
            <ShoppingBag className="h-4 w-4 text-amber-700 transition-transform group-hover:scale-110" />
            <span className="hidden text-xs font-semibold uppercase tracking-wider text-amber-800 sm:inline">
              Meu Pedido
            </span>
            {cartCount > 0 ? (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-600 px-1 text-[10px] font-bold text-white animate-pulse">
                {cartCount}
              </span>
            ) : (
              <span className="text-[10px] font-medium text-amber-600">0</span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
}
