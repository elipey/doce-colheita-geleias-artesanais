import { X, Plus, Minus, Trash2, ShoppingBag, Sparkles } from "lucide-react";
import { CartItem } from "../types";

interface CartDrawerProps {
  isOpen: boolean;
  cart: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  cart,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const total = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      
      {/* Backdrop overlay */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-stone-900/60 transition-opacity backdrop-blur-xs" 
      />

      <div className="absolute inset-y-0 right-0 max-w-full pl-10">
        <div className="flex h-full w-screen max-w-md flex-col bg-stone-50 border-l border-amber-100 shadow-2xl">
          
          {/* Sidebar Drawer Header */}
          <div className="flex items-center justify-between border-b border-amber-100 bg-stone-100 p-6">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-amber-700" />
              <h2 className="font-serif text-lg font-bold text-stone-900">Meu Pedido</h2>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-1.5 text-stone-500 hover:bg-stone-200 hover:text-stone-900 transition"
              aria-label="Pesquisar ou Fechar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Contents list */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-stone-100 text-stone-400 mb-4 border border-stone-200">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-md font-bold text-stone-800">Sua cesta está vazia</h3>
                <p className="mt-1 text-xs text-stone-400 max-w-xs px-4">
                  Escolha um sabor tradicional em nosso catálogo ou experimente misturar suas frutas favoritas no Sommelier Customizado!
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.id} 
                  className="flex gap-4 rounded-2xl bg-white border border-stone-200 p-4 shadow-xs"
                >
                  
                  {/* Item Image */}
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-stone-100 border border-stone-100">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Product Metadata */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-1">
                      <h4 className="font-serif text-xs font-bold text-stone-900 leading-snug line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-stone-400 hover:text-red-700 p-0.5"
                        id={`remove-item-${item.id}`}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {/* Check if item has Custom Jam configuration credentials */}
                    {item.product.type === "custom" && item.customRecipe && (
                      <div className="mt-1 flex flex-col space-y-1">
                        <div className="flex items-center gap-1 text-[9px] font-bold text-amber-800/90 tracking-wide uppercase">
                          <Sparkles className="h-2.5 w-2.5 text-amber-500 animate-spin" />
                          <span>Fórmula Sazonal Custom</span>
                        </div>
                        
                        {/* Display custom recipe ingredient tags */}
                        <div className="flex flex-wrap gap-1">
                          <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[8px] font-medium text-slate-700">
                            Base: {item.customRecipe.baseFruit}
                          </span>
                          <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-[8px] font-medium text-amber-700">
                            Extra: {item.customRecipe.seasonalFruit}
                          </span>
                          <span className="rounded-full bg-purple-100 px-1.5 py-0.5 text-[8px] font-medium text-purple-700">
                            Doce: {item.customRecipe.sweetener}
                          </span>
                          {item.customRecipe.spices.map((spice, idx) => (
                            <span key={idx} className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[8px] font-medium text-emerald-800">
                              {spice}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Pricing, Quantity modifier */}
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs font-extrabold text-stone-900 font-sans">
                        R$ {(item.product.price * item.quantity).toFixed(2).replace(".", ",")}
                      </span>
                      
                      <div className="flex items-center rounded-md border border-stone-200 bg-stone-50 p-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="flex h-5 w-5 items-center justify-center rounded-sm text-stone-500 hover:bg-stone-200"
                          id={`qty-dec-${item.id}`}
                        >
                          <Minus className="h-2.5 w-2.5" />
                        </button>
                        <span className="w-6 text-center text-[11px] font-semibold text-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="flex h-5 w-5 items-center justify-center rounded-sm text-stone-500 hover:bg-stone-200"
                          id={`qty-inc-${item.id}`}
                        >
                          <Plus className="h-2.5 w-2.5" />
                        </button>
                      </div>
                    </div>

                  </div>

                </div>
              ))
            )}
          </div>

          {/* Drawer Cart Checkout Actions footer */}
          {cart.length > 0 && (
            <div className="border-t border-amber-100 bg-white p-6 space-y-4">
              
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-stone-500 font-medium">
                  <span>Subtotal do Pedido</span>
                  <span>R$ {total.toFixed(2).replace(".", ",")}</span>
                </div>
                <div className="flex justify-between text-xs text-stone-500 font-medium">
                  <span>Entrega para o Brasil</span>
                  <span className="text-emerald-700 font-bold">Taxa Orgânica Grátis</span>
                </div>
                <div className="flex justify-between border-t border-stone-100 pt-2 text-md font-bold text-stone-900">
                  <span className="font-serif">Total Geral</span>
                  <span className="font-sans">R$ {total.toFixed(2).replace(".", ",")}</span>
                </div>
              </div>

              <div className="rounded-xl border border-amber-100 bg-amber-50/40 p-3 text-[10px] text-amber-900 leading-normal">
                📍 <strong>Compromisso de Frescor:</strong> Nossos produtos são despachados em embalagens térmicas estofadas ecológicas diretamente do pomar. Nós entraremos em contato após o pedido para agendar sua entrega ou retirada!
              </div>

              <button
                onClick={onCheckout}
                id="cart-checkout-btn"
                className="flex w-full items-center justify-center rounded-xl bg-emerald-700 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-emerald-900/10 transition hover:bg-emerald-800"
              >
                Concluir Pedido Customizado
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
