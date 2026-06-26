import React, { useState } from "react";
import { Star, ShoppingCart, Plus, Minus, Info, Check } from "lucide-react";
import { Product } from "../types";

interface ProductCardProps {
  key?: any;
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [showIngredients, setShowIngredients] = useState(false);
  const [added, setAdded] = useState(false);

  const handleIncrement = () => setQuantity((q) => q + 1);
  const handleDecrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setQuantity(1);
    }, 2000);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:border-amber-200">
      
      {/* Product Image Area */}
      <div className="relative aspect-video w-full overflow-hidden bg-stone-100 sm:aspect-[4/3]">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />

        {/* Badges in margins */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {product.badges.map((badge, idx) => (
            <span
              key={idx}
              className="rounded-full bg-emerald-600/90 px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider backdrop-blur-xs"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Packing specification (Weight / Volume) */}
        <div className="absolute bottom-3 right-3 rounded-md bg-stone-900/75 px-2 py-0.5 text-[10px] font-bold text-amber-200 uppercase tracking-widest backdrop-blur-xs">
          {product.volume_weight}
        </div>
      </div>

      {/* Card Body content */}
      <div className="flex flex-1 flex-col p-5">
        
        {/* Rating and Reviews */}
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="font-mono text-emerald-700 font-semibold uppercase tracking-wider">
            {product.type === "geleia" ? "Geleia Artesanal" : "Torta do Pomar"}
          </span>
          <div className="flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-0.5 font-semibold text-amber-800">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span>{product.rating}</span>
          </div>
        </div>

        {/* Title and Description */}
        <h3 className="mb-2 font-serif text-lg font-bold text-stone-900 line-clamp-1 leading-snug group-hover:text-amber-800">
          {product.name}
        </h3>
        
        <p className="mb-4 text-stone-500 text-xs leading-relaxed line-clamp-2">
          {product.description}
        </p>

        {/* Ingredients Accordion toggle */}
        <div className="mt-auto mb-4">
          <button
            onClick={() => setShowIngredients(!showIngredients)}
            className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-700 hover:text-amber-800 focus:outline-none"
            id={`toggle-ingredients-${product.id}`}
          >
            <Info className="h-3 w-3" />
            <span>{showIngredients ? "Ocultar Ingredientes" : "Ver Ingredientes"}</span>
          </button>
          
          {showIngredients && (
            <div className="mt-2 rounded-xl bg-orange-50/50 p-2.5 border border-orange-100 text-[11px] text-stone-600">
              <p className="font-semibold text-amber-950 mb-1">Feito de forma pura com:</p>
              <ul className="list-inside list-disc space-y-0.5">
                {product.ingredients.map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Pricing and Cart Actions Block */}
        <div className="border-t border-stone-100 pt-4">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-sans text-xl font-extrabold text-stone-900">
              R$ {product.price.toFixed(2).replace(".", ",")}
            </span>
            
            {/* Quantity Controls */}
            <div className="flex items-center rounded-lg border border-stone-200 bg-stone-50 px-1">
              <button
                onClick={handleDecrement}
                className="flex h-7 w-7 items-center justify-center rounded-md font-bold text-stone-600 hover:bg-stone-200"
                aria-label="Diminuir"
              >
                <Minus className="h-3 w-3" />
              </button>
              <span className="w-8 text-center text-xs font-bold text-stone-800">{quantity}</span>
              <button
                onClick={handleIncrement}
                className="flex h-7 w-7 items-center justify-center rounded-md font-bold text-stone-600 hover:bg-stone-200"
                aria-label="Aumentar"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Add to Cart button */}
          <button
            onClick={handleAdd}
            disabled={added}
            id={`add-to-cart-btn-${product.id}`}
            className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-xs font-semibold uppercase tracking-wider shadow-xs transition-all ${
              added
                ? "bg-emerald-600 text-white"
                : "bg-emerald-700 text-white hover:bg-emerald-800 hover:shadow-xs"
            }`}
          >
            {added ? (
              <>
                <Check className="h-4 w-4" />
                No Seu Pedido!
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" />
                Adicionar ao Pedido
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
