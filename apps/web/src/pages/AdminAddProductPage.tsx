import { useNavigate } from 'react-router-dom';

export default function AdminAddProductPage() {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/admin/dashboard');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Mock Save Success! (Backend API not connected)');
    navigate('/admin/dashboard');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-12 animate-in fade-in duration-500 relative z-10 w-full overflow-hidden">
      {/* Background Accents (Matched with Aetheric Aesthetic) */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-primary/3 blur-[100px] rounded-full"></div>
      </div>

      {/* Header Section (Matched with Admin Dashboard) */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold font-headline tracking-tight text-on-surface">Tambah Produk</h2>
          <p className="text-on-surface-variant mt-2 text-sm md:text-base">Masukan detail koleksi baru ke dalam Vault sistem Ajambeh.</p>
        </div>
        <div className="flex flex-wrap gap-4 w-full md:w-auto">
          <button 
            type="button"
            onClick={handleCancel}
            className="flex-1 md:flex-none justify-center bg-surface-container-high text-on-surface px-6 py-3 rounded-full font-bold hover:bg-surface-bright active:scale-[0.97] transition-all flex items-center gap-2 border border-outline-variant/20 text-sm md:text-base"
          >
            <span className="material-symbols-outlined text-xl">close</span>
            Batal
          </button>
          <button 
            type="submit"
            form="addProductForm"
            className="flex-1 md:flex-none justify-center bg-gradient-to-r from-primary to-primary-container text-on-primary-container px-6 py-3 rounded-full font-bold hover:scale-105 active:scale-[0.97] transition-all shadow-lg shadow-primary/20 flex items-center gap-2 text-sm md:text-base"
          >
            <span className="material-symbols-outlined text-xl">save</span>
            Simpan Produk
          </button>
        </div>
      </header>

      {/* Main Form Grid */}
      <form id="addProductForm" onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-8 font-body">
        
        {/* Left Column: Details */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* General Information */}
          <section className="bg-surface-container-low p-6 md:p-8 rounded-lg border border-outline-variant/10 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>edit_note</span>
              <h3 className="text-xl font-bold font-headline text-on-surface">Informasi Umum</h3>
            </div>
            <div className="space-y-6 text-sm">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Nama Produk</label>
                <input 
                  required
                  type="text"
                  className="w-full bg-surface-container-highest/30 border border-outline-variant/10 rounded-lg p-4 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:bg-surface-container-high transition-all placeholder:text-on-surface-variant/30 font-medium" 
                  placeholder="Contoh: Charizard VMAX - Darkness Ablaze" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Deskripsi</label>
                <textarea 
                  required
                  rows={6}
                  className="w-full bg-surface-container-highest/30 border border-outline-variant/10 rounded-lg p-4 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:bg-surface-container-high transition-all placeholder:text-on-surface-variant/30 resize-none font-medium" 
                  placeholder="Berikan detail statistik kartu, info artist, dan spesifikasi kondisi..." 
                ></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Kategori</label>
                  <div className="relative">
                    <select className="w-full bg-surface-container-highest/30 border border-outline-variant/10 rounded-lg p-4 text-on-surface appearance-none focus:outline-none focus:ring-1 focus:ring-primary focus:bg-surface-container-high transition-all font-medium cursor-pointer">
                      <option>Holo</option>
                      <option>VMAX</option>
                      <option>GX</option>
                      <option>Graded</option>
                      <option>Alternative Art</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">expand_more</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Kondisi</label>
                  <div className="relative">
                    <select className="w-full bg-surface-container-highest/30 border border-outline-variant/10 rounded-lg p-4 text-on-surface appearance-none focus:outline-none focus:ring-1 focus:ring-primary focus:bg-surface-container-high transition-all font-medium cursor-pointer">
                      <option>Mint (M)</option>
                      <option>Near Mint (NM)</option>
                      <option>Lightly Played (LP)</option>
                      <option>Played (P)</option>
                      <option>Damaged (D)</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">expand_more</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Inventory & Specs */}
          <section className="bg-surface-container-low p-6 md:p-8 rounded-lg border border-outline-variant/10 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>inventory_2</span>
              <h3 className="text-xl font-bold font-headline text-on-surface">Inventaris & Spesifikasi</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">SKU Identifier</label>
                <input 
                  required
                  type="text"
                  className="w-full bg-surface-container-highest/30 border border-outline-variant/10 rounded-lg p-4 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary transition-all font-mono uppercase" 
                  placeholder="AJM-TCG-XXX" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Stok Tersedia</label>
                <div className="flex items-center bg-surface-container-highest/30 border border-outline-variant/10 rounded-lg overflow-hidden h-[54px] md:h-[58px]">
                  <button type="button" className="w-16 h-full flex items-center justify-center hover:bg-surface-bright active:bg-surface-container-highest transition-colors text-on-surface-variant hover:text-primary border-r border-outline-variant/10">
                    <span className="material-symbols-outlined">remove</span>
                  </button>
                  <input 
                    type="number" 
                    min="0"
                    defaultValue="1"
                    className="flex-1 bg-transparent border-none text-center font-bold text-lg md:text-xl text-on-surface focus:ring-0 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" 
                  />
                  <button type="button" className="w-16 h-full flex items-center justify-center hover:bg-surface-bright active:bg-surface-container-highest transition-colors text-on-surface-variant hover:text-primary border-l border-outline-variant/10">
                    <span className="material-symbols-outlined">add</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Right Column: Pricing & Media */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Pricing Card */}
          <section className="bg-surface-container-low p-6 md:p-8 rounded-lg border border-outline-variant/10 overflow-hidden relative shadow-sm">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[40px] rounded-full -mr-16 -mt-16 pointer-events-none"></div>
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
              <h3 className="text-xl font-bold font-headline text-on-surface">Harga</h3>
            </div>
            <div className="space-y-4 relative z-10 text-sm">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Harga Jual</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-primary">Rp</span>
                  <input 
                    required
                    type="number" 
                    min="0"
                    placeholder="0"
                    className="w-full bg-surface-container-highest/30 border border-outline-variant/10 rounded-lg py-5 pl-12 pr-4 text-2xl font-black text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:bg-surface-container-high transition-all placeholder:text-on-surface-variant/20 tracking-tighter appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" 
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-primary/5 rounded border border-primary/10">
                <span className="material-symbols-outlined text-primary text-sm flex-shrink-0">info</span>
                <span className="text-[10px] text-on-surface-variant italic leading-tight">Rata-rata pasar: Rp 1.250.000</span>
              </div>
            </div>
          </section>

          {/* Media Upload */}
          <section className="bg-surface-container-low p-6 md:p-8 rounded-lg border border-outline-variant/10 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>image</span>
              <h3 className="text-xl font-bold font-headline text-on-surface">Media</h3>
            </div>
            <div className="group relative border-2 border-dashed border-outline-variant/20 rounded-lg p-8 text-center hover:border-primary/50 transition-all cursor-pointer bg-surface-container-highest/10 hover:bg-surface-container-highest/30">
              <div className="relative z-10 flex flex-col items-center">
                <span className="material-symbols-outlined text-4xl text-on-surface-variant group-hover:text-primary transition-colors mb-4 block">cloud_upload</span>
                <p className="text-sm font-semibold text-on-surface mb-1">Upload Card Image</p>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">JPG, PNG up to 10MB</p>
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.02] transition-opacity bg-primary rounded-lg pointer-events-none"></div>
            </div>
          </section>

          {/* Visibility Toggle */}
          <section className="bg-surface-container-low p-6 rounded-lg border border-outline-variant/10 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <span className="font-bold text-on-surface text-sm">Visibilitas Katalog</span>
                <span className="text-[10px] text-on-surface-variant uppercase tracking-widest mt-0.5">Publish immediately</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary border border-outline-variant/10"></div>
              </label>
            </div>
          </section>

        </div>
      </form>
    </div>
  );
}
