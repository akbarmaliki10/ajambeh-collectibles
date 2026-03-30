import { useNavigate } from 'react-router-dom';

export default function AdminDashboardPage() {
  const navigate = useNavigate();

  return (
    <main className="p-8 lg:p-12 animate-in fade-in duration-500">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold font-headline tracking-tight text-on-surface">Dashboard - Admin</h2>
          <p className="text-on-surface-variant mt-2 text-sm md:text-base">Manage your "Toko Hobi Kartu Pokemon" inventory and sales performance.</p>
        </div>
        <div className="flex flex-wrap gap-4 w-full md:w-auto">
          <button className="flex-1 md:flex-none justify-center bg-surface-container-high text-on-surface px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2 border border-outline-variant/20 text-sm md:text-base">
            <span className="material-symbols-outlined">file_download</span>
            Export Data
          </button>
          <button 
            onClick={() => navigate('/admin/product/add')}
            className="flex-1 md:flex-none justify-center bg-gradient-to-r from-primary to-primary-container text-on-primary-container px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform shadow-lg shadow-primary/20 flex items-center gap-2 text-sm md:text-base"
          >
            <span className="material-symbols-outlined">add</span>
            Tambah Produk
          </button>
        </div>
      </header>

      {/* Stats Bento Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {/* Stat Card 1 */}
        <div className="bg-surface-container-low p-8 rounded-lg relative overflow-hidden group border border-outline-variant/5 hover:border-outline-variant/20 transition-colors">
          <div className="absolute -right-4 -top-4 opacity-5 group-hover:scale-110 transition-transform duration-500">
            <span className="material-symbols-outlined text-[120px]" style={{ fontVariationSettings: "'FILL' 1" }}>inventory</span>
          </div>
          <p className="text-sm font-label uppercase tracking-widest text-on-surface-variant mb-2">Total Produk</p>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-extrabold font-headline">128</span>
            <span className="text-xs font-bold font-body">Items</span>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-on-surface-variant/60 font-body">
            <span className="material-symbols-outlined text-sm">trending_up</span>
            <span>+4 since last week</span>
          </div>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-surface-container-low p-8 rounded-lg relative overflow-hidden group border border-outline-variant/5 hover:border-secondary/20 transition-colors">
          <div className="absolute -right-4 -top-4 opacity-5 group-hover:scale-110 transition-transform duration-500 text-secondary">
            <span className="material-symbols-outlined text-[120px]" style={{ fontVariationSettings: "'FILL' 1" }}>block</span>
          </div>
          <p className="text-sm font-label uppercase tracking-widest text-on-surface-variant mb-2 text-secondary">Stok Habis</p>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-extrabold font-headline text-secondary">5</span>
            <span className="text-xs text-secondary font-bold font-body">Alerts</span>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-secondary/60 font-body">
            <span className="material-symbols-outlined text-sm">warning</span>
            <span>Requires attention</span>
          </div>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-surface-container-low p-8 rounded-lg relative overflow-hidden group border border-outline-variant/5 hover:border-tertiary/20 transition-colors sm:col-span-2 lg:col-span-1">
          <div className="absolute -right-4 -top-4 opacity-5 group-hover:scale-110 transition-transform duration-500 text-tertiary">
            <span className="material-symbols-outlined text-[120px]" style={{ fontVariationSettings: "'FILL' 1" }}>production_quantity_limits</span>
          </div>
          <p className="text-sm font-label uppercase tracking-widest text-on-surface-variant mb-2 text-tertiary">Stok Rendah</p>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-extrabold font-headline text-tertiary">12</span>
            <span className="text-xs text-tertiary font-bold font-body">Items</span>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-tertiary/60 font-body">
            <span className="material-symbols-outlined text-sm">info</span>
            <span>Refill suggested</span>
          </div>
        </div>
      </section>

      {/* Product Table Area */}
      <section className="bg-surface-container-low rounded-lg overflow-hidden border border-outline-variant/10">
        <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center sm:flex-row flex-col gap-4">
          <h3 className="text-xl font-bold font-headline self-start sm:self-center">Manajemen Inventaris</h3>
          <div className="relative w-full sm:w-auto">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
            <input 
              className="bg-surface-container-high border-none rounded-full pl-10 pr-6 py-2 text-sm focus:ring-2 focus:ring-primary w-full sm:w-64 text-on-surface placeholder:text-on-surface-variant/40 transition-all" 
              placeholder="Cari nama kartu..." 
              type="text"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-surface-container-lowest text-on-surface-variant uppercase text-[10px] tracking-[0.2em] font-bold">
              <tr>
                <th className="px-6 py-4">Foto</th>
                <th className="px-6 py-4">Nama Produk</th>
                <th className="px-6 py-4">Stok</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Visible</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10 font-body">
              {/* Row 1 */}
              <tr className="hover:bg-surface-bright/40 transition-colors group">
                <td className="px-6 py-4">
                  <div className="w-12 h-16 rounded-md overflow-hidden bg-surface-container-high shadow-sm">
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHtsn96Zte9mqHhP59GfNN3GABYOyJXhdrij-ABlUIGDCAnLy1PtOaV044uTROYjNIRkIQAeW8KGQ1tpO9WBM7gLmwOJF0sklUu4E9Hfze8XqFj-EWVfT_ycLOd6fVgOUPvVP8_nc6rz4uqduJV9MTZEQPWgYT1ZvIcQ_Bq80J4h8Fv4yF2dIK_CnzDfF3D5IZxZN1gyflb0uz8ulqHY7ugSsMbDxyDGc2fgkUq-ajwKtyaedIj5FZMp9RMVruRGsX8SZoV0RjXA8" alt="Charizard VMAX" />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="font-bold group-hover:text-primary transition-colors text-white">Charizard VMAX</p>
                  <p className="text-xs text-on-surface-variant mt-0.5">Expansion: Darkness Ablaze</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-tertiary shadow-[0_0_8px_rgba(233,196,0,0.5)]"></span>
                    <span className="text-tertiary font-bold">3</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-tertiary/10 text-tertiary text-[10px] font-bold rounded-full uppercase tracking-wider">Warning</span>
                </td>
                <td className="px-6 py-4">
                  <span className="material-symbols-outlined text-green-500" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-1">
                    <button onClick={() => navigate('/admin/product/edit/1')} className="p-2 hover:bg-surface-container-highest rounded-full transition-colors text-on-surface-variant hover:text-primary">
                      <span className="material-symbols-outlined text-lg">edit</span>
                    </button>
                    <button className="p-2 hover:bg-surface-container-highest rounded-full transition-colors text-on-surface-variant hover:text-secondary">
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
              
              {/* Row 2 */}
              <tr className="hover:bg-surface-bright/40 transition-colors group">
                <td className="px-6 py-4">
                  <div className="w-12 h-16 rounded-md overflow-hidden bg-surface-container-high shadow-sm">
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAI_5x1ClmrvrrHnGqiAjtf1shNoQdSAwMPFU2HYJ0ZcTGBuV0ZyVJVB3lDIrWLjYiFSwlyiA7jmboGWHJX4W_WpkM7ERS4DKFQ05FKmLAaY1l58dWAESxgvUBhMqMTxcWfYhJc-bUq-r2cefR3dfyfGbsLQERgpiIrLNapA8XsXLmnM1z9R7Aw8ScDT2bC4xkL2DviQ1OyoxjH5IpL1xSgKdqPUeCkm4H4YrB36FQfg-CbVmtcFxLBefVPM61G8_JFFFuV65xB0aQ" alt="Pikachu V" />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="font-bold group-hover:text-primary transition-colors text-white">Pikachu V</p>
                  <p className="text-xs text-on-surface-variant mt-0.5">Expansion: Vivid Voltage</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(255,180,170,0.5)]"></span>
                    <span className="text-secondary font-bold">0</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-bold rounded-full uppercase tracking-wider">Out of Stock</span>
                </td>
                <td className="px-6 py-4">
                  <span className="material-symbols-outlined text-on-surface-variant/30 text-lg">cancel</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-1">
                    <button onClick={() => navigate('/admin/product/edit/2')} className="p-2 hover:bg-surface-container-highest rounded-full transition-colors text-on-surface-variant hover:text-primary">
                      <span className="material-symbols-outlined text-lg">edit</span>
                    </button>
                    <button className="p-2 hover:bg-surface-container-highest rounded-full transition-colors text-on-surface-variant hover:text-secondary">
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
              
              {/* Row 3 */}
              <tr className="hover:bg-surface-bright/40 transition-colors group">
                <td className="px-6 py-4">
                  <div className="w-12 h-16 rounded-md overflow-hidden bg-surface-container-high shadow-sm">
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQltrlGAlzWIVbO5g_oNeBkfTgQCGlUl1TZ0Hjxc1pU1q026VwP3AA5GRCPVzU6lC9aBmOhVnTuK2-gBnEpWL8cxYcB-jVmDyJWCm3q0cZxDPkFJhOZwRe23ay3WG_nbpU1LuBs1GZ0z8rHha8zFoS68_4ANqrtOpw45cwcxvZZX7CRGix_1maKCVIpPeIIRYIBPetQBKXu7mJsLuv-7NHPtIoASTl49hLKPmuAGWW6BJ_w8Wyksei57uOIsGskHsDZlLIsA4mqP8" alt="Mewtwo GX" />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="font-bold group-hover:text-primary transition-colors text-white">Mewtwo GX</p>
                  <p className="text-xs text-on-surface-variant mt-0.5">Expansion: Shining Legends</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
                    <span className="text-green-500 font-bold">42</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-green-500/10 text-green-500 text-[10px] font-bold rounded-full uppercase tracking-wider">Stable</span>
                </td>
                <td className="px-6 py-4">
                  <span className="material-symbols-outlined text-green-500" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-1">
                    <button onClick={() => navigate('/admin/product/edit/3')} className="p-2 hover:bg-surface-container-highest rounded-full transition-colors text-on-surface-variant hover:text-primary">
                      <span className="material-symbols-outlined text-lg">edit</span>
                    </button>
                    <button className="p-2 hover:bg-surface-container-highest rounded-full transition-colors text-on-surface-variant hover:text-secondary">
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 border-t border-outline-variant/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-on-surface-variant text-sm font-body">
          <span>Showing 1-3 of 128 products</span>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-full bg-surface-container-high hover:bg-surface-bright transition-colors disabled:opacity-30" disabled>Previous</button>
            <button className="px-4 py-2 rounded-full border border-primary text-primary hover:bg-primary/5 transition-colors">Next</button>
          </div>
        </div>
      </section>

      {/* Premium Insights (Editorial Element) */}
      <section className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 font-body">
        <div 
          className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 p-8 rounded-lg relative overflow-hidden" 
          style={{ backgroundImage: "linear-gradient(to bottom right, rgba(0, 212, 255, 0.1), transparent)" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-[#00D4FF]">auto_awesome</span>
            <h4 className="text-lg md:text-xl font-bold font-headline text-[#00D4FF]">Market Insights</h4>
          </div>
          <p className="text-on-surface-variant mb-6 text-sm md:text-base leading-relaxed hidden sm:block">
            Holographic Charizard prices are trending <span className="font-bold text-[#00D4FF]">+12% higher</span> this month across global auction platforms. Consider adjusting your shelf pricing for Near-Mint items.
          </p>
          <div className="h-32 bg-surface-container-high/50 rounded-md relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-[#00D4FF]/20 to-transparent"></div>
            {/* Mock chart line SVG */}
            <svg className="absolute bottom-0 w-full h-full text-[#00D4FF]" viewBox="0 0 400 100" preserveAspectRatio="none">
              <path d="M0,80 Q50,70 100,85 T200,40 T300,50 T400,20" fill="none" stroke="currentColor" strokeWidth="3"></path>
            </svg>
          </div>
        </div>
        
        <div className="bg-surface-container-low p-8 rounded-lg flex flex-col justify-center border border-outline-variant/10">
          <h4 className="text-lg md:text-xl font-bold font-headline mb-6 text-on-surface">Quick Condition Guide</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-tertiary font-bold w-28 sm:w-36">MINT (M)</span>
              <div className="h-2 flex-1 mx-4 bg-outline-variant/20 rounded-full overflow-hidden shrink-0">
                <div className="h-full bg-tertiary w-[95%] shadow-[0_0_8px_rgba(233,196,0,0.5)]"></div>
              </div>
              <span className="text-on-surface-variant font-medium w-16 sm:w-20 text-right shrink-0">95% Stock</span>
            </div>
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-green-500 font-bold w-28 sm:w-36">NEAR MINT (NM)</span>
              <div className="h-2 flex-1 mx-4 bg-outline-variant/20 rounded-full overflow-hidden shrink-0">
                <div className="h-full bg-green-500 w-[60%] shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
              </div>
              <span className="text-on-surface-variant font-medium w-16 sm:w-20 text-right shrink-0">60% Stock</span>
            </div>
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-secondary font-bold w-28 sm:w-36">PLAYED (P)</span>
              <div className="h-2 flex-1 mx-4 bg-outline-variant/20 rounded-full overflow-hidden shrink-0">
                <div className="h-full bg-secondary w-[15%] shadow-[0_0_8px_rgba(255,180,170,0.5)]"></div>
              </div>
              <span className="text-on-surface-variant font-medium w-16 sm:w-20 text-right shrink-0">15% Stock</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
