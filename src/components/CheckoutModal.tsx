import React, { useState } from "react";
import { X, Check, Loader2, Sparkles, MapPin, Truck, Calendar, ShoppingBag } from "lucide-react";
import { CartItem, CustomerDetails } from "../types";

interface CheckoutModalProps {
  isOpen: boolean;
  cart: CartItem[];
  onClose: () => void;
  onClearCart: () => void;
}

export default function CheckoutModal({ isOpen, cart, onClose, onClearCart }: CheckoutModalProps) {
  if (!isOpen) return null;

  const total = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Form input state
  const [details, setDetails] = useState<CustomerDetails>({
    name: "",
    phone: "",
    email: "",
    deliveryMethod: "entrega",
    addressStreet: "",
    addressNum: "",
    addressCity: "São Paulo - SP",
    notes: ""
  });

  // Call API states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderSuccess, setOrderSuccess] = useState<any | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!details.name || !details.phone) {
      setError("Por favor, informe seu nome e número de telefone para contato.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            name: details.name,
            phone: details.phone,
            email: details.email
          },
          items: cart.map(item => ({
            id: item.product.id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            customRecipe: item.customRecipe
          })),
          total,
          customOrderDetails: details
        })
      });

      if (!response.ok) {
        throw new Error("Erro de conexão com os tachos da fazenda. Tente relançar.");
      }

      const data = await response.json();
      setOrderSuccess(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Tivemos um problema temporário no processamento de pedidos.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSuccess = () => {
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-stone-900/60 font-sans backdrop-blur-xs">
      
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-stone-50 border border-stone-200 p-6 sm:p-8 shadow-2xl">
        
        {/* Header toolbar */}
        {!orderSuccess && (
          <div className="flex items-center justify-between border-b border-stone-200/80 pb-4 mb-6">
            <h3 className="font-serif text-xl font-bold text-stone-900 flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-amber-700" />
              Finalizar Pedido Sazonal
            </h3>
            <button
              onClick={onClose}
              className="rounded-full p-1.5 text-stone-500 hover:bg-stone-200 hover:text-stone-900"
              aria-label="Minimizar ou Fechar"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Normal Form presentation */}
        {!orderSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              
              {/* Left Column: Client Credentials */}
              <div className="space-y-4">
                <h4 className="border-b border-stone-200/50 pb-1.5 text-xs font-bold uppercase tracking-widest text-[#9b7222]">
                  Dados de Contato
                </h4>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-stone-700">Seu Nome Completo *</label>
                  <input
                    type="text"
                    required
                    value={details.name}
                    onChange={(e) => setDetails({ ...details, name: e.target.value })}
                    placeholder="Ex: Clara Silva Guimarães"
                    className="w-full rounded-xl border border-stone-200 bg-white p-2.5 text-xs focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-stone-700">Telefone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={details.phone}
                    onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                    placeholder="Ex: (11) 98765-4321"
                    className="w-full rounded-xl border border-stone-200 bg-white p-2.5 text-xs focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-stone-700">E-mail (Para atualizações)</label>
                  <input
                    type="email"
                    value={details.email}
                    onChange={(e) => setDetails({ ...details, email: e.target.value })}
                    placeholder="Ex: clara@email.com"
                    className="w-full rounded-xl border border-stone-200 bg-white p-2.5 text-xs focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-stone-700">Observações de Encomenda</label>
                  <textarea
                    value={details.notes}
                    onChange={(e) => setDetails({ ...details, notes: e.target.value })}
                    placeholder="Ex. 'Deixe na portaria se eu não estiver', 'Embalagem rústica para presente de casamento'..."
                    className="w-full rounded-xl border border-stone-200 bg-white p-2.5 text-xs focus:border-amber-400 focus:outline-none"
                    rows={2}
                  />
                </div>
              </div>

              {/* Right Column: Delivery methods coordination */}
              <div className="space-y-4">
                <h4 className="border-b border-stone-200/50 pb-1.5 text-xs font-bold uppercase tracking-widest text-[#9b7222]">
                  Como deseja Receber?
                </h4>

                {/* Toggle methods */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDetails({ ...details, deliveryMethod: "entrega" })}
                    className={`flex items-center justify-center gap-1.5 rounded-xl border p-2.5 text-xs font-bold transition-all ${
                      details.deliveryMethod === "entrega"
                        ? "border-emerald-600 bg-emerald-50 text-emerald-900"
                        : "border-stone-200 bg-white hover:border-amber-300"
                    }`}
                  >
                    <Truck className="h-4 w-4" />
                    Entrega Postal
                  </button>
                  <button
                    type="button"
                    onClick={() => setDetails({ ...details, deliveryMethod: "retirada" })}
                    className={`flex items-center justify-center gap-1.5 rounded-xl border p-2.5 text-xs font-bold transition-all ${
                      details.deliveryMethod === "retirada"
                        ? "border-emerald-600 bg-emerald-50 text-emerald-900"
                        : "border-stone-200 bg-white hover:border-amber-300"
                    }`}
                  >
                    <Calendar className="h-4 w-4" />
                    Retirar na Loja
                  </button>
                </div>

                {details.deliveryMethod === "entrega" ? (
                  <div className="space-y-3 rounded-2xl border border-stone-200 bg-stone-100/50 p-4">
                    
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-stone-600">Rua / Logradouro *</label>
                      <input
                        type="text"
                        required
                        value={details.addressStreet}
                        onChange={(e) => setDetails({ ...details, addressStreet: e.target.value })}
                        placeholder="Ex: Av. Paulista"
                        className="w-full rounded-lg border border-stone-200 bg-white p-2 text-xs focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div className="space-y-1 col-span-1">
                        <label className="text-[10px] font-bold text-stone-600">Nº *</label>
                        <input
                          type="text"
                          required
                          value={details.addressNum}
                          onChange={(e) => setDetails({ ...details, addressNum: e.target.value })}
                          placeholder="1000"
                          className="w-full rounded-lg border border-stone-200 bg-white p-2 text-xs focus:border-amber-400 focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1 col-span-2">
                        <label className="text-[10px] font-bold text-stone-600">Cidade - UF *</label>
                        <input
                          type="text"
                          required
                          value={details.addressCity}
                          onChange={(e) => setDetails({ ...details, addressCity: e.target.value })}
                          placeholder="Ex: Jundiaí - SP"
                          className="w-full rounded-lg border border-stone-200 bg-white p-2 text-xs focus:border-amber-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    <p className="text-[9px] text-emerald-700 font-semibold leading-normal">
                      📍 Despacho prioritário embalado com vácuo térmico ecológico. Oferecemos entrega direta e rastreável.
                    </p>

                  </div>
                ) : (
                  <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4 text-xs text-amber-900 space-y-1.5 leading-relaxed">
                    <p className="font-bold flex items-center gap-1 text-[#5c3e06]">
                      <MapPin className="h-4 w-4 shrink-0 text-amber-700" />
                      Retirada na Fazenda Real
                    </p>
                    <p className="text-[11px] text-stone-600">
                      Venha conhecer nossos pomares e tomar um cafezinho conosco! Os potes estarão prontos para retirada em até <strong>2 horas úteis</strong> após a aprovação.
                    </p>
                    <hr className="border-amber-200/50 my-1" />
                    <p className="text-[10px] text-amber-900/80 italic font-medium">
                      Endereço: Estrada das Amoras, Km 12 (Área Rural), São Paulo - SP
                    </p>
                  </div>
                )}

              </div>

            </div>

            {/* Price Overview */}
            <div className="rounded-2xl border border-stone-200 bg-stone-100 p-4 flex items-center justify-between text-xs font-medium text-stone-700">
              <span className="font-serif text-sm font-bold text-stone-900">Total a Pagar na Entrega:</span>
              <span className="font-sans text-lg font-black text-emerald-950">
                R$ {total.toFixed(2).replace(".", ",")}
              </span>
            </div>

            {/* Footer warning message if mistake */}
            {error && (
              <p className="text-xs font-bold text-red-700 bg-red-50 p-2.5 rounded-lg border border-red-200">
                {error}
              </p>
            )}

            {/* Actions Bar */}
            <div className="flex gap-3 justify-end pt-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-stone-300 px-5 py-3 text-xs font-semibold text-stone-700 hover:bg-stone-100"
              >
                Voltar à Loja
              </button>
              
              <button
                type="submit"
                disabled={loading}
                id="checkout-confirm-btn"
                className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-700 px-7 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-emerald-900/10 hover:bg-emerald-800 disabled:bg-stone-300"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-white" />
                    Espere...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 stroke-[3]" />
                    Confirmar Pedido Real
                  </>
                )}
              </button>
            </div>

          </form>
        ) : (
          
          /* Success Screen displays order summary details */
          <div className="text-center py-6 space-y-6 flex flex-col items-center">
            
            {/* Spinning elements representing happiness */}
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <Check className="h-10 w-10 stroke-[3]" />
              <div className="absolute inset-0 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin" />
            </div>

            <div className="space-y-2 max-w-md">
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                <Sparkles className="h-3 w-3 animate-pulse" />
                Pedido Confirmado com Sucesso!
              </div>
              <h3 className="font-serif text-2xl font-black text-[#5c3e06]">
                Colheita Agendada!
              </h3>
              <p className="text-xs text-stone-500 font-sans leading-relaxed">
                {orderSuccess.message}
              </p>
            </div>

            {/* Key Receipt details */}
            <div className="w-full max-w-sm rounded-2xl border border-amber-100 bg-[#fdfaf2] p-5 text-left text-xs text-[#5c3e06] space-y-3 shadow-xs">
              
              <div className="flex justify-between border-b border-dashed border-amber-200 pb-2">
                <span className="font-serif font-bold">Identificador do Pedido:</span>
                <span className="font-mono font-black tracking-wider text-stone-900">{orderSuccess.orderId}</span>
              </div>

              <div className="flex justify-between">
                <span>Cliente Colhedor:</span>
                <span className="font-bold text-stone-800">{orderSuccess.orderSummary.customerName}</span>
              </div>

              <div className="flex justify-between">
                <span>Total dos Potes:</span>
                <span className="font-extrabold text-stone-900">R$ {orderSuccess.orderSummary.total.toFixed(2).replace(".", ",")}</span>
              </div>

              <div className="flex justify-between">
                <span>Volume total deitens:</span>
                <span className="font-bold">{orderSuccess.orderSummary.itemCount} item(ns)</span>
              </div>

              <div className="border-t border-dashed border-amber-200 pt-2 text-[10px] text-stone-500 leading-relaxed font-sans text-center">
                📬 Enviamos também os detalhes para o telefone <strong>{details.phone}</strong>. Nosso artesão entrará em contato em breve via WhatsApp para coordenar o envio!
              </div>

            </div>

            {/* Final checkout close button triggers cart flush */}
            <button
              onClick={handleCloseSuccess}
              id="checkout-success-close-btn"
              className="rounded-xl bg-[#5c3e06] px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-[#463004]"
            >
              Voltar aos Pomares
            </button>

          </div>
        )}

      </div>
    </div>
  );
}
