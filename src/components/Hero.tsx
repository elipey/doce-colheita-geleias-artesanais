import { Sparkles, ArrowRight, Heart, Star, ShieldCheck } from "lucide-react";

interface HeroProps {
  onExploreCatalog: () => void;
  onExploreFarm: () => void;
}

export default function Hero({ onExploreCatalog, onExploreFarm }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-transparent pb-12 pt-6 sm:pb-16 lg:pb-24">
      
      {/* Decorative Orchard Background Highlights */}
      <div className="absolute top-0 right-0 -z-10 h-96 w-96 rounded-full bg-amber-100/40 blur-3xl" />
      <div className="absolute bottom-10 left-0 -z-10 h-72 w-72 rounded-full bg-emerald-100/30 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Text Column */}
          <div className="flex flex-col space-y-6 lg:col-span-7">
            <div className="inline-flex max-w-xs items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50/70 px-3 py-1 text-xs font-semibold text-emerald-800 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-amber-500 animate-spin" />
              <span>Geleias Artesanais Premium</span>
            </div>

            <h1 className="font-serif text-4xl font-extrabold tracking-tight text-emerald-950 sm:text-5xl lg:text-6xl leading-tight">
              O sabor fresco do campo, colhido <span className="text-amber-600 decoration-amber-100 underline decoration-8">com respeito</span> à natureza.
            </h1>

            <p className="max-w-xl text-stone-600 md:text-lg leading-relaxed font-sans">
              Bem-vindo à <strong className="text-emerald-900 font-semibold">Doce Colheita</strong>! Cultivamos frutas de qualidade em nossos pomares ensolarados, preparando artesanalmente geleias rústicas de laranja, maçã, manga, além de tortas folhadas fresquinhas com receitas tradicionais passadas de geração em geração.
            </p>

            {/* CTAs */}
            <div className="flex flex-col gap-4 sm:flex-row pt-2">
              <button
                id="hero-cta-catalog"
                onClick={onExploreCatalog}
                className="group flex items-center justify-center gap-2 rounded-full bg-emerald-700 px-7 py-4 text-sm font-semibold text-white shadow-md shadow-emerald-900/20 transition-all hover:bg-emerald-800 hover:shadow-lg"
              >
                Ver Sabores Prontos
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                id="hero-cta-farm"
                onClick={onExploreFarm}
                className="flex items-center justify-center gap-2 rounded-full border border-stone-300 bg-white/80 px-7 py-4 text-sm font-semibold text-stone-750 transition-all hover:bg-stone-100 hover:border-amber-400 hover:text-amber-900 backdrop-blur-sm"
              >
                Conhecer a Fazenda
              </button>
            </div>

            {/* Farm Guarantees Cards */}
            <div className="grid grid-cols-3 gap-4 border-t border-stone-200 pt-8 text-stone-700">
              <div className="flex flex-col gap-1">
                <span className="flex items-center gap-1 text-xs font-bold text-emerald-800 uppercase tracking-widest sm:text-sm">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> 4.9 / 5.0
                </span>
                <span className="text-xs text-stone-500">Avaliação Média</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="flex items-center gap-1 text-xs font-bold text-emerald-800 uppercase tracking-widest sm:text-sm">
                  <Heart className="h-4 w-4 fill-emerald-600 text-emerald-600" /> 100%
                </span>
                <span className="text-xs text-stone-500">Frutas da Fazenda</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="flex items-center gap-1 text-xs font-bold text-emerald-800 uppercase tracking-widest sm:text-sm">
                  <ShieldCheck className="h-4 w-4 text-emerald-700" /> Sem Aditivos
                </span>
                <span className="text-xs text-stone-500">Ingredientes Reais</span>
              </div>
            </div>

          </div>

          {/* Right Image/Logo Columns */}
          <div className="relative flex justify-center lg:col-span-5">
            <div className="relative z-10 w-full max-w-sm overflow-hidden rounded-3xl border border-amber-100 bg-white p-4 shadow-xl shadow-stone-200/50 sm:p-6">
              
              {/* Product Card Showcase within hero */}
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-stone-100">
                <img
                  src="/src/assets/images/doce_colheita_logo_1781560137750.jpg"
                  alt="Doce Colheita Logo do Campo"
                  className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 rounded-md bg-stone-900/75 px-2.5 py-1 text-[10px] font-semibold text-amber-200 uppercase tracking-wider backdrop-blur-xs">
                  Selo Orgânico
                </div>
              </div>

              {/* Quote caption */}
              <div className="mt-4 text-center">
                <blockquote className="font-serif italic text-stone-700 text-sm">
                  "Do campo para a sua mesa, com amor e respeito à natureza"
                </blockquote>
                <div className="mt-2 text-[10px] text-stone-400 font-sans tracking-widest uppercase">
                  Doce Colheita LTDA
                </div>
              </div>

            </div>

            {/* Decorative background circle behind image */}
            <div className="absolute -inset-4 -z-10 rounded-[40px] border border-amber-200 bg-gradient-to-tr from-amber-50 to-stone-100/40" />
          </div>

        </div>
      </div>
    </section>
  );
}
