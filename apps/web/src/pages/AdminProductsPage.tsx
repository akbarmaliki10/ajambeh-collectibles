import { useNavigate } from 'react-router-dom';

export default function AdminProductsPage() {
  const navigate = useNavigate();

  return (
    <main className="p-4 sm:p-8 lg:p-12 animate-in fade-in duration-500 font-body">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold font-headline tracking-tight text-on-surface">Manajemen Inventaris</h2>
          <p className="text-on-surface-variant mt-2 text-sm md:text-base">Kelola stok dan visibilitas koleksi kartu Ajambeh.</p>
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

      {/* Search and Table Container */}
      <section className="bg-surface-container-low rounded-lg overflow-hidden border border-outline-variant/10">
        <div className="p-4 sm:p-6 border-b border-outline-variant/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="text-xl font-bold font-headline">Daftar Produk</h3>
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
                <th className="px-6 lg:px-8 py-4">Foto</th>
                <th className="px-6 lg:px-8 py-4">Nama Produk & Set</th>
                <th className="px-6 lg:px-8 py-4 text-center">Stok</th>
                <th className="px-6 lg:px-8 py-4 text-center">Status</th>
                <th className="px-6 lg:px-8 py-4 text-center">Visible</th>
                <th className="px-6 lg:px-8 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {/* Product Row 1 */}
              <tr className="hover:bg-surface-bright/40 transition-colors group">
                <td className="px-6 lg:px-8 py-4 lg:py-6">
                  <div className="w-12 h-16 lg:w-16 lg:h-20 rounded-md overflow-hidden bg-surface-container-high border border-primary/10">
                    <img
                      alt="Charizard VMAX - Shiny Vault"
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlf7kHUzXyIcu4YPWfJ-tZVayI_sudaxn2dYjqiqrRNTaNOdM2WhdVnFGhmlnLO3ZqqBJ8P34pDrDCUuyGhXCjCboMZKRx2Q2IhDlMz_JmjgozP8NTxLmJ5UTG-1vpSxVTeDnj1ZNZwHE3dEr40usmF-GVOCKL1dDGiKQpJqSMT8W_WoSMx2ohDC3zevIalgQMC8KJHR61NI54JbPjB1Jx1kkV0CNLIvF0xf0Fl9YaEUsKDYb_5vM5mf_JBNwlpUTsFLR28eKDj4E"
                    />
                  </div>
                </td>
                <td className="px-6 lg:px-8 py-4 lg:py-6">
                  <p className="font-bold group-hover:text-primary transition-colors text-white">Charizard VMAX - Shiny Vault</p>
                  <p className="text-xs text-on-surface-variant mt-0.5">Shining Fates (SV107/SV122)</p>
                </td>
                <td className="px-6 lg:px-8 py-4 lg:py-6 text-center">
                  <span className="font-bold text-on-surface">24</span>
                </td>
                <td className="px-6 lg:px-8 py-4 lg:py-6 text-center">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase tracking-wider">Available</span>
                </td>
                <td className="px-6 lg:px-8 py-4 lg:py-6 text-center">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </td>
                <td className="px-6 lg:px-8 py-4 lg:py-6 text-right">
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

              {/* Product Row 2 */}
              <tr className="hover:bg-surface-bright/40 transition-colors group">
                <td className="px-6 lg:px-8 py-4 lg:py-6">
                  <div className="w-12 h-16 lg:w-16 lg:h-20 rounded-md overflow-hidden bg-surface-container-high border border-primary/10">
                    <img
                      alt="The One Ring (Foil)"
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVwlvxckK7GSN1ZyDZXwr8NosEOkOaKTfpI0zrT4wpnKkDuhHznnaIOv2VBpNJKdF-RZtQcUJdAnWetqkKOuEoA0tLFKrsUCg_VbiM9mJ5UFWVOZkFVUpVU8jmHBKWf9uWWG56NvWk_8GHteBJoyzFA3XOY5cdGRp95nkPCdCcdNtj8b-e7qAvwQ24d_WQkIhcnEkOlo2S2qh4RbNtI7JSd_0OcGSFWfHRH7dzsBlwXCSvafe0V_JjrmrMCJtI_ZVXM4Hw1Ex0n1E"
                    />
                  </div>
                </td>
                <td className="px-6 lg:px-8 py-4 lg:py-6">
                  <p className="font-bold group-hover:text-primary transition-colors text-white">The One Ring (Foil)</p>
                  <p className="text-xs text-on-surface-variant mt-0.5">Lord of the Rings: Tales of Middle-earth</p>
                </td>
                <td className="px-6 lg:px-8 py-4 lg:py-6 text-center">
                  <span className="font-bold text-secondary">3</span>
                </td>
                <td className="px-6 lg:px-8 py-4 lg:py-6 text-center">
                  <span className="px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-bold rounded-full uppercase tracking-wider">Warning</span>
                </td>
                <td className="px-6 lg:px-8 py-4 lg:py-6 text-center">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </td>
                <td className="px-6 lg:px-8 py-4 lg:py-6 text-right">
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

              {/* Product Row 3 - Out of Stock */}
              <tr className="hover:bg-surface-bright/40 transition-colors group">
                <td className="px-6 lg:px-8 py-4 lg:py-6">
                  <div className="w-12 h-16 lg:w-16 lg:h-20 rounded-md overflow-hidden bg-surface-container-high grayscale opacity-50">
                    <img
                      alt="Black Lotus (Proxy)"
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDO256xmQO_OVf2c_SnWBf0v_JrLaF8BS6F8mZj0x1FLS89GhSoAnDL2rGW2wfbzKjle1THX5CvHp-83mEwmbh_c0xUCi_UUuTkG_g_LGhzNMESeRbQfgzkj4V5rNCkqpcx0J2ma3IZrBXk75vEv97kkdoaHU296ESeS6oS5G9AtNTfxUwMIjBv1xrrk4PeYviEpL7KbmcrMsmtwpdhJ1tPsrFPOwVDK6ATAgxnb4I_qvG4wFKyjOdpByvj9GLro-yEWlMmwKFhadE"
                    />
                  </div>
                </td>
                <td className="px-6 lg:px-8 py-4 lg:py-6 opacity-50">
                  <p className="font-bold group-hover:text-primary transition-colors text-white">Black Lotus (Proxy)</p>
                  <p className="text-xs text-on-surface-variant mt-0.5">Vintage Masters</p>
                </td>
                <td className="px-6 lg:px-8 py-4 lg:py-6 text-center">
                  <span className="font-bold text-on-surface-variant/40">0</span>
                </td>
                <td className="px-6 lg:px-8 py-4 lg:py-6 text-center">
                  <span className="px-3 py-1 bg-surface-container-highest text-on-surface-variant/40 text-[10px] font-bold rounded-full uppercase tracking-wider">Out of Stock</span>
                </td>
                <td className="px-6 lg:px-8 py-4 lg:py-6 text-center">
                  <span className="material-symbols-outlined text-on-surface-variant/30">cancel</span>
                </td>
                <td className="px-6 lg:px-8 py-4 lg:py-6 text-right">
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

              {/* Product Row 4 */}
              <tr className="hover:bg-surface-bright/40 transition-colors group">
                <td className="px-6 lg:px-8 py-4 lg:py-6">
                  <div className="w-12 h-16 lg:w-16 lg:h-20 rounded-md overflow-hidden bg-surface-container-high border border-primary/10">
                    <img
                      alt="Blue-Eyes White Dragon"
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOn-yHS8BJQwp8gZ2z4SQIdPbH-758WvFf6YdJu20lFHJtpx5SazNvq7MXfwyGjInaXa6PIiKBmEw_uVDMoRod8e1_PRKphnXxvinlWU-wG_qf9P95wN4nIB9s_FsPXc2g2Ij3lJadAB40FApWYAD4VydgK5ZGVpSzybJ4Ci2sjScrKfela6Y860P-YTJOkobip77B2f01caN0680-ENlnQhFUqg0KgLoUtmMoIhFoXj1IlD1RY1yI2Jjfb_5SdTBRk3VeCgj1nGY"
                    />
                  </div>
                </td>
                <td className="px-6 lg:px-8 py-4 lg:py-6">
                  <p className="font-bold group-hover:text-primary transition-colors text-white">Blue-Eyes White Dragon</p>
                  <p className="text-xs text-on-surface-variant mt-0.5">Legend of Blue Eyes White Dragon</p>
                </td>
                <td className="px-6 lg:px-8 py-4 lg:py-6 text-center">
                  <span className="font-bold text-on-surface">12</span>
                </td>
                <td className="px-6 lg:px-8 py-4 lg:py-6 text-center">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase tracking-wider">Available</span>
                </td>
                <td className="px-6 lg:px-8 py-4 lg:py-6 text-center">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </td>
                <td className="px-6 lg:px-8 py-4 lg:py-6 text-right">
                  <div className="flex justify-end gap-1">
                    <button onClick={() => navigate('/admin/product/edit/4')} className="p-2 hover:bg-surface-container-highest rounded-full transition-colors text-on-surface-variant hover:text-primary">
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

        {/* Pagination */}
        <div className="px-4 sm:px-6 lg:px-8 py-4 lg:py-6 border-t border-outline-variant/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-on-surface-variant text-sm">
          <span>Menampilkan 4 dari 128 Produk</span>
          <div className="flex gap-2 flex-wrap justify-center">
            <button className="px-4 py-2 rounded-full bg-surface-container-high hover:bg-surface-bright transition-colors disabled:opacity-30" disabled>Previous</button>
            <button className="w-10 h-10 rounded-full bg-primary/20 text-primary border border-primary/30 flex items-center justify-center font-bold">1</button>
            <button className="w-10 h-10 rounded-full bg-surface-container-high hover:bg-surface-bright transition-colors flex items-center justify-center">2</button>
            <button className="w-10 h-10 rounded-full bg-surface-container-high hover:bg-surface-bright transition-colors flex items-center justify-center">3</button>
            <button className="px-4 py-2 rounded-full bg-surface-container-high hover:bg-surface-bright transition-colors">Next</button>
          </div>
        </div>
      </section>
    </main>
  );
}
