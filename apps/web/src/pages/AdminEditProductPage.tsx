import { useNavigate, useParams } from 'react-router-dom';
import { useState, useRef } from 'react';

const formatNumber = (num: number | string): string => {
  const n = typeof num === 'string' ? num : String(num);
  return n.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

// Mock product data (will be replaced by API later)
const mockProducts: Record<string, { name: string; category: string; condition: string; description: string; price: number; stock: number; sku: string; mainImage: string; detailImages: string[]; visible: boolean }> = {
  '1': {
    name: 'Charizard VMAX',
    category: 'VMAX',
    condition: 'Near Mint',
    description: 'Shiny Charizard VMAX from Shining Fates. Pulled fresh from pack, immediately sleeved and top-loaded. Perfect centering and clean edges. A must-have for any high-end Pokémon TCG archive.',
    price: 3500000,
    stock: 1,
    sku: 'TCG-SF-001-CHAR',
    mainImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJ9iZzQo--lapaFwa4kVAZF17VHbcCE5Ruc-J6wXdwcSpZv6E3Au8Z3iOonkk0U3N4HNIiEFMjMg2Bp17X2ph0PmoiXVlm3M_b_viBNE2vlEIxdbPlOSYGXlT_DPjMnpUOEvc8dKUaInVPGozk89VvvwrKM21A702IT4vOkTfe-rcCVozu3WAZIe1G0pahTZYLf1_FS9bLvvlhnW5bHKIbsetQw45ZI_wxe_5bzxbecJ7c-PcqSFb-AJFcVsZ0pPEDuClIvFsn2dk',
    detailImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAICLcvfzuuE415k7RwyurMM1MAdUgVLJxseMZuj7Y9-CpGAc-NBhE1wf7TF17NI7BsVD7yWr5AYEAqWL9kf33CN8VH-rPh4MZ-wwh6ezmdxNItPL-jdvV7XqyfW4_SWZHN-WZVRMeEB4yOBx8Cq8h_vyf7F7N8IkWGZVoey7BQqXsZqYXXhQqLXfHUECXJRxUeYJP-VvGTrHae16tjLxXDijpvG9XB_MToqg5UbUtYsWCB-XkSt0S5D_kOBcXh-MV3anTWFfWOKPk',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCJPGNvD2gj_o-KZvcIryQ_omAeaAj9p4ipZlkgH5wravQbvUxDoJVyRYbpB3I7q0GuG-qVBip2pcM-3_SjFhGTTHO-2NaYXvqQ3foGZLw6hgZmxafiM-tpCEJ-N5kcP6sTgkH50j8X52gzCscsWRes-XmV7g3xDYwBt8Yv_t_A0auiwMdOneWStjcPRW3-yO7d7H-x8hoHONPm5nUqQcid05NvcpCI9GJ4sZmep-__U-Mmq5eb_Yq8Ja-LrMtEXbX-WYGzTqvpAO0',
    ],
    visible: true,
  },
  '2': {
    name: 'The One Ring (Foil)',
    category: 'Full Art',
    condition: 'Near Mint',
    description: 'Limited edition foil variant of The One Ring from Lord of the Rings: Tales of Middle-earth set.',
    price: 8500000,
    stock: 3,
    sku: 'MTG-LOTR-001-RING',
    mainImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVwlvxckK7GSN1ZyDZXwr8NosEOkOaKTfpI0zrT4wpnKkDuhHznnaIOv2VBpNJKdF-RZtQcUJdAnWetqkKOuEoA0tLFKrsUCg_VbiM9mJ5UFWVOZkFVUpVU8jmHBKWf9uWWG56NvWk_8GHteBJoyzFA3XOY5cdGRp95nkPCdCcdNtj8b-e7qAvwQ24d_WQkIhcnEkOlo2S2qh4RbNtI7JSd_0OcGSFWfHRH7dzsBlwXCSvafe0V_JjrmrMCJtI_ZVXM4Hw1Ex0n1E',
    detailImages: [],
    visible: true,
  },
  '3': {
    name: 'Black Lotus (Proxy)',
    category: 'Full Art',
    condition: 'Moderately Played',
    description: 'High quality proxy reproduction of the iconic Black Lotus from Vintage Masters.',
    price: 150000,
    stock: 0,
    sku: 'MTG-VM-001-LOTUS',
    mainImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDO256xmQO_OVf2c_SnWBf0v_JrLaF8BS6F8mZj0x1FLS89GhSoAnDL2rGW2wfbzKjle1THX5CvHp-83mEwmbh_c0xUCi_UUuTkG_g_LGhzNMESeRbQfgzkj4V5rNCkqpcx0J2ma3IZrBXk75vEv97kkdoaHU296ESeS6oS5G9AtNTfxUwMIjBv1xrrk4PeYviEpL7KbmcrMsmtwpdhJ1tPsrFPOwVDK6ATAgxnb4I_qvG4wFKyjOdpByvj9GLro-yEWlMmwKFhadE',
    detailImages: [],
    visible: false,
  },
  '4': {
    name: 'Blue-Eyes White Dragon',
    category: 'Full Art',
    condition: 'Near Mint',
    description: 'Classic Blue-Eyes White Dragon from the Legend of Blue Eyes White Dragon set.',
    price: 2200000,
    stock: 12,
    sku: 'YGO-LOB-001-BEWD',
    mainImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOn-yHS8BJQwp8gZ2z4SQIdPbH-758WvFf6YdJu20lFHJtpx5SazNvq7MXfwyGjInaXa6PIiKBmEw_uVDMoRod8e1_PRKphnXxvinlWU-wG_qf9P95wN4nIB9s_FsPXc2g2Ij3lJadAB40FApWYAD4VydgK5ZGVpSzybJ4Ci2sjScrKfela6Y860P-YTJOkobip77B2f01caN0680-ENlnQhFUqg0KgLoUtmMoIhFoXj1IlD1RY1yI2Jjfb_5SdTBRk3VeCgj1nGY',
    detailImages: [],
    visible: true,
  },
};

export default function AdminEditProductPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const product = mockProducts[id || '1'] || mockProducts['1'];

  const [name, setName] = useState(product.name);
  const [category, setCategory] = useState(product.category);
  const [condition, setCondition] = useState(product.condition);
  const [description, setDescription] = useState(product.description);
  const [priceRaw, setPriceRaw] = useState(String(product.price));
  const [stock, setStock] = useState(product.stock);
  const [sku, setSku] = useState(product.sku);
  const [visible, setVisible] = useState(product.visible);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    alert('Mock Save Success! (Backend API not connected)');
    navigate('/admin/products');
  };

  const handleDelete = () => {
    if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      alert('Mock Delete Success!');
      navigate('/admin/products');
    }
  };

  return (
    <main className="p-4 sm:p-8 lg:p-12 animate-in fade-in duration-500 font-body">
      {/* Background Blobs */}
      <div className="fixed top-[-10%] right-[-5%] w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      {/* Header */}
      <header className="mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold font-headline tracking-tight text-on-surface">Edit Produk</h2>
        <p className="text-on-surface-variant mt-2 text-sm md:text-base">Perbarui informasi aset kartu di dalam inventaris Anda.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Left Column: Visuals */}
        <div className="lg:col-span-5 space-y-6">
          <div className="text-primary font-bold tracking-widest uppercase text-xs mb-2">Pratinjau Aset</div>
          
          {/* Main Image */}
          <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <div className="aspect-[3/4] overflow-hidden bg-surface-container-low border border-outline-variant/15" style={{ borderRadius: '0.75rem', background: 'rgba(34, 37, 50, 0.6)', boxShadow: 'inset 0 0 10px rgba(158, 202, 255, 0.1)' }}>
              <img
                alt={product.name}
                className="w-full h-full object-cover"
                src={product.mainImage}
              />
            </div>
            {/* Hover overlay sits outside overflow-hidden so it's not clipped */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none" style={{ borderRadius: '0.75rem' }}>
              <div className="bg-primary text-on-primary-container px-4 py-2 rounded-lg font-bold flex items-center gap-2 text-sm">
                <span className="material-symbols-outlined">cloud_upload</span>
                Ganti Foto
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png"
              className="hidden"
              onChange={() => alert('Mock: Main image upload would be handled by backend')}
            />
          </div>

          {/* Thumbnail Grid */}
          <div className="grid grid-cols-3 gap-3">
            {product.detailImages.length > 0 ? (
              product.detailImages.map((img, i) => (
                <div
                  key={i}
                  className={`aspect-square overflow-hidden bg-surface-container-low flex items-center justify-center relative border ${i === 0 ? 'border-primary/20' : 'border-outline-variant/10'}`}
                  style={{ borderRadius: '0.5rem' }}
                >
                  <img
                    alt={`Detail ${i + 1}`}
                    className="w-full h-full object-cover"
                    src={img}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  {/* Fallback icon if image doesn't load */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="material-symbols-outlined text-3xl text-on-surface-variant/20">image</span>
                  </div>
                </div>
              ))
            ) : (
              <>
                <div className="aspect-square bg-surface-container-low border border-outline-variant/10 flex items-center justify-center" style={{ borderRadius: '0.5rem' }}>
                  <span className="material-symbols-outlined text-3xl text-on-surface-variant/20">image</span>
                </div>
                <div className="aspect-square bg-surface-container-low border border-outline-variant/10 flex items-center justify-center" style={{ borderRadius: '0.5rem' }}>
                  <span className="material-symbols-outlined text-3xl text-on-surface-variant/20">image</span>
                </div>
              </>
            )}
            <button
              type="button"
              onClick={() => thumbnailInputRef.current?.click()}
              className="aspect-square bg-surface-container-high border border-dashed border-outline-variant flex flex-col items-center justify-center gap-1 hover:bg-surface-bright hover:border-primary/50 transition-colors"
              style={{ borderRadius: '0.5rem' }}
            >
              <span className="material-symbols-outlined text-outline">add</span>
              <span className="text-[10px] text-outline uppercase font-bold">Tambah</span>
            </button>
            <input
              ref={thumbnailInputRef}
              type="file"
              accept="image/jpeg,image/png"
              className="hidden"
              onChange={() => alert('Mock: Thumbnail upload would be handled by backend')}
            />
          </div>
        </div>

        {/* Right Column: Form Fields */}
        <div className="lg:col-span-7 space-y-8">
          <section className="space-y-6">
            {/* Header with visibility toggle */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="text-2xl font-bold tracking-tight text-on-surface font-headline">Detail Produk</h2>
              <div className="flex items-center gap-3 bg-surface-container-low px-4 py-2 rounded-full">
                <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Tampilkan di Katalog</span>
                <button
                  type="button"
                  onClick={() => setVisible(!visible)}
                  className={`w-10 h-5 rounded-full relative flex items-center px-1 transition-colors ${visible ? 'bg-primary/40' : 'bg-surface-container-high'}`}
                >
                  <div className={`w-3.5 h-3.5 rounded-full shadow-lg absolute transition-all ${visible ? 'bg-primary right-1' : 'bg-outline left-1'}`}></div>
                </button>
              </div>
            </div>

            <div className="space-y-4 text-sm">
              {/* Product Name */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-primary tracking-widest uppercase">Nama Produk</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-surface-container-low border-none rounded-lg p-4 text-on-surface focus:ring-1 focus:ring-primary focus:bg-surface-container transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Category */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-on-surface-variant tracking-widest uppercase">Kategori</label>
                  <div className="relative">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-surface-container-low border-none rounded-lg p-4 text-on-surface appearance-none focus:ring-1 focus:ring-primary cursor-pointer"
                    >
                      <option>VMAX</option>
                      <option>V-Star</option>
                      <option>GX</option>
                      <option>Full Art</option>
                      <option>Holo</option>
                      <option>Graded</option>
                      <option>Alternative Art</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-4 pointer-events-none text-outline">expand_more</span>
                  </div>
                </div>
                {/* Condition */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-on-surface-variant tracking-widest uppercase">Kondisi</label>
                  <div className="relative">
                    <select
                      value={condition}
                      onChange={(e) => setCondition(e.target.value)}
                      className="w-full bg-surface-container-low border-none rounded-lg p-4 text-on-surface appearance-none focus:ring-1 focus:ring-primary cursor-pointer"
                    >
                      <option>Near Mint</option>
                      <option>Lightly Played</option>
                      <option>Moderately Played</option>
                      <option>Damaged</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-4 pointer-events-none text-outline">expand_more</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-on-surface-variant tracking-widest uppercase">Deskripsi</label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-surface-container-low border-none rounded-lg p-4 text-on-surface focus:ring-1 focus:ring-primary transition-all resize-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Price */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-primary tracking-widest uppercase">Harga (IDR)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold">Rp</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={priceRaw ? formatNumber(priceRaw) : ''}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/[^0-9]/g, '');
                        setPriceRaw(raw === '' ? '' : String(parseInt(raw)));
                      }}
                      className="w-full bg-surface-container-low border-none rounded-lg p-4 pl-12 text-primary font-black text-lg focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
                {/* Stock */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-on-surface-variant tracking-widest uppercase">Stok Unit</label>
                  <div className="flex items-stretch bg-surface-container-low overflow-hidden" style={{ borderRadius: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => setStock(Math.max(0, stock - 1))}
                      className="w-12 min-h-[56px] flex items-center justify-center hover:bg-surface-bright text-outline transition-colors shrink-0"
                    >
                      <span className="material-symbols-outlined text-xl">remove</span>
                    </button>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={formatNumber(stock)}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/\./g, '');
                        setStock(Math.max(0, parseInt(raw) || 0));
                      }}
                      className="flex-1 bg-transparent border-none text-center font-bold text-on-surface focus:ring-0 min-w-0"
                    />
                    <button
                      type="button"
                      onClick={() => setStock(stock + 1)}
                      className="w-12 min-h-[56px] flex items-center justify-center hover:bg-surface-bright text-primary transition-colors shrink-0"
                    >
                      <span className="material-symbols-outlined text-xl">add</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* SKU */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-on-surface-variant tracking-widest uppercase">SKU / Serial Number</label>
                <input
                  type="text"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  className="w-full bg-surface-container-low border-none rounded-lg p-4 text-on-surface-variant font-mono focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
          </section>

          {/* Actions */}
          <div className="flex flex-col gap-4 pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleSave}
                className="flex-1 bg-gradient-to-r from-primary to-primary-container text-on-primary-container font-black py-4 shadow-lg shadow-primary/10 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm" style={{ borderRadius: '0.75rem' }}
              >
                <span className="material-symbols-outlined">save</span>
                Simpan Perubahan
              </button>
              <button
                onClick={() => navigate('/admin/products')}
                className="px-8 border border-primary/30 text-primary font-bold py-4 hover:bg-primary/10 transition-all active:scale-[0.98]" style={{ borderRadius: '0.75rem' }}
              >
                Batal
              </button>
            </div>
            <div className="pt-10 border-t border-outline-variant/15">
              <button
                onClick={handleDelete}
                className="w-full py-4 text-error font-bold border border-error/20 hover:bg-error-container/10 transition-all flex items-center justify-center gap-2 active:scale-[0.98]" style={{ borderRadius: '0.75rem' }}
              >
                <span className="material-symbols-outlined">delete</span>
                Hapus Produk dari Inventaris
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
