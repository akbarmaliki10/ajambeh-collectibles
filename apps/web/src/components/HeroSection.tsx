export default function HeroSection() {
  return (
    <section className="relative min-h-[100vh] lg:min-h-[870px] flex items-center justify-center overflow-hidden px-4 md:px-6 pt-24 pb-12 mesh-gradient">
      <div className="relative z-10 max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase">
          <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          Premium TCG Archive
        </div>
        <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter leading-tight md:leading-none mb-6 md:mb-8 hero-glow" style={{ color: '#E0F7FA' }}>
          Koleksi Kartu <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container">Impianmu</span>
        </h1>
        <p className="text-on-surface-variant text-base md:text-xl max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed font-light">
          Temukan kartu Pokemon langka, edisi terbatas, dan aset koleksi premium yang telah terverifikasi keasliannya di ekosistem Neon Archive.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          <a className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-br from-primary to-primary-container text-on-primary-fixed font-bold rounded-lg shadow-[0_0_30px_rgba(109,221,255,0.3)] hover:scale-105 active:scale-95 transition-all w-full sm:w-auto" href="#catalog">
            Jelajahi Katalog
          </a>
          <a className="px-8 py-4 bg-transparent border border-primary/30 hover:bg-primary/10 text-primary font-bold rounded-lg transition-all w-full sm:w-auto flex items-center justify-center gap-2" href="#">
            <span className="material-symbols-outlined text-xl">chat</span>
            WhatsApp Kami
          </a>
        </div>
      </div>
      {/* Abstract background elements */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]"></div>
      <div className="absolute top-1/4 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[100px]"></div>
    </section>
  );
}
