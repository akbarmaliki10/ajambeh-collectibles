import { Link, useParams } from 'react-router-dom';
import CatalogItem from '../components/CatalogItem';

const relatedMock = [
  {
    id: 11,
    imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuDY5uiThQJOkPgdShZya_2wbgRloxCrGvfbQZ2YH-Juvk_LWYdHwjwuzSnqd9AAwb2O7jS0zVF6ccaxPGpTqQ6rBYEXUI_TWdxLy19D57WrUD9S8P2eIdZlE-vsuKdDvHvTwzS-wCuxVarY9h-xYaeJ3wL_560VCrBX9oVYAsYPgiaS7PztAVoKdtKtH2OcHyyBWdn6kUl6Bh6Y52zz0d_xGPlLPh9hlPAf_8vRpO0EazONgVourOUvXesDHdiqYG4AIORssK9DfmU",
    imageAlt: "pikachu vmax pokemon card",
    condition: "Mint",
    conditionColor: "text-tertiary border-tertiary/30",
    collection: "Vivid Voltage",
    title: "Pikachu VMAX",
    price: "Rp 350.000",
    categoryTags: ["vmax"]
  },
  {
    id: 12,
    imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuDuVcEh8F6sLJTiEvEFW70MP11WHMFQ7GTV9VkSa6phxcCiNkLYV_qc3pL3Ggd63hShUXBAZWy3lUKAPkhOglL8kyOJ4bqlGUdu0cRQH1HkxpAukU45BYxThni7Q0LLfPQVJ2-SxxRSLdqkpKSKeLkP549fX1lHXIrnb6sdbYJmifo-veTlxYm-_HHW4xwE9qkNRvS00-CkApPhGjmOzfojT645mfOO5k80fZuSBzN39KnC76tDEE8Xj78q_yoBwPTb4XT9DI7oQS8",
    imageAlt: "rayquaza vmax alternative art",
    condition: "NM",
    conditionColor: "text-[#4CAF50] border-[#4CAF50]/30",
    collection: "Evolving Skies",
    title: "Rayquaza VMAX",
    price: "Rp 1.200.000",
    categoryTags: ["vmax"]
  },
  {
    id: 13,
    imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0xRdghNDAa9hhdnQmvb0Mc2T9SoGI2oor67qUhLHmw7FAabj3kMjaeECeenlRj0KaxiFqVzG26RtMV3BJrlguNbeIqj-Rjsj9xrAW56CTWqu8ivPa_VAjZUFKtjqrngVAqBDpTzG9rC02Y0g3AYGTx1WFZ_RjYXRvuX9Yiw8AGBuQsYiK38viOrNG0mBxJMKv0YBVVU1mW9_2yZuj4pVDFNv5TtT6y_cNm-k3cpTQMd8exR_H5915n8T4kZPhGspTDN-NGer6tJA",
    imageAlt: "mew vmax pokemon card",
    condition: "Mint",
    conditionColor: "text-tertiary border-tertiary/30",
    collection: "Fusion Strike",
    title: "Mew VMAX",
    price: "Rp 250.000",
    categoryTags: ["vmax"]
  },
  {
    id: 14,
    imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuDo1BgYYMq-6BSwjtgO-Ah4skRtMAyggzP3hTcxVviy0WysyPNpMZ2I5LZC6az-30MaIS-n8KrCZZeucgE9_KSokyunedliUL3YPFHJ8kRQXWYfQktE9tyACgoFQablkX6q_v2OnFWBxh3NPtp15FxttHKyfMFYBK6H-42xCrw4DU1_G3_YBlPOFDzIR1eaN1AJ7qHt5fiF17KDsVukWYFcS8tuiBBaJauMgHMYOEyO_M9sDOhoXE9fTQidGfgbWIyuc-fR4u5xPA4",
    imageAlt: "umbreon vmax alternative art",
    condition: "Played",
    conditionColor: "text-secondary border-secondary/30",
    collection: "Evolving Skies",
    title: "Umbreon VMAX",
    price: "Rp 4.500.000",
    categoryTags: ["vmax"]
  }
];

export default function ProductPage() {
  const { id } = useParams();

  return (
    <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-20 animate-in fade-in duration-500 relative">
      <nav className="flex items-center gap-2 mb-10 text-xs font-label uppercase tracking-widest text-on-surface-variant flex-wrap">
        <Link to="/" className="hover:text-primary whitespace-nowrap transition-colors">Beranda</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <Link to="/catalog" className="hover:text-primary whitespace-nowrap transition-colors">Katalog</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-on-surface whitespace-nowrap">Charizard VMAX (ID: {id})</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        {/* Gallery */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="relative group aspect-[3/4] rounded-lg overflow-hidden bg-surface-container-low holographic-glow transition-all duration-500 lg:hover:scale-[1.02]">
            <img 
              alt="Charizard VMAX Card" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJccB15wp08J-OwEPw-UArbscX5bFomzkJOf0Qbnb7RYMP7UszV1mBoAU5U34frytxXaG-FSyNSiCQ_ucpxwhH-FE_JLiVRxf6ydmac6nNA2lHYH_XuY1dDEkPDZ762DnpIXXWLhaskFLDvTR3n0lqGC6t9mlzFRr8FbRWUfQhvuYCxdm_pzo3Z4kxGJP5LHNFvmwSse4kWdva3p3YrpEEBrWAlTEEMhqXnFBzyZDT3zXd_JSpY_i8AnYPSaMrcYjj-UHIdbEyARk"
            />
            <div className="absolute top-6 right-6 bg-surface-bright/90 backdrop-blur-md px-4 py-2 rounded-full border border-[#4CAF50]/30 shadow-2xl">
              <span className="text-[#4CAF50] text-sm font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#4CAF50] animate-pulse"></span>
                Near Mint
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            <button className="aspect-square rounded-md overflow-hidden ring-2 ring-primary bg-surface-container-high">
              <img className="w-full h-full object-cover opacity-100" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaZ97BZo3mMdFExoePRbTRxIF5R5CNLrolWKl12vYwmypeAlA6lu3OHbchHzvtDLTAZa-YaKar6k0XsjG3Qi-fixM2MjeHOTiB9HjXVosMT07HcRK6Ac2yYI-ry2RzY3sEUf2LBwY1wqLrKp_CbfP4LZ6C95zpQ4TFvB-XNH6GImHK56BNKP67Wj1_84aw1LzCQ2frWWPxvrYHhice0cwvsaTkn8SuYKooTF1VoO6gWS05mIFenyUsCCfQkMg0m-ogu_FRqUyDWm0" alt="thumbnail 1" />
            </button>
            <button className="aspect-square rounded-md overflow-hidden bg-surface-container-high opacity-50 hover:opacity-100 transition-opacity">
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbMJFcgGsP5b1qg6FInNINqLQ2b7I-3m_D6ktnFY1B9BVWI2k28hnCUPR9oUaN5yaEtdcvDWWTmInl0KTbSSIKRT-DsfTlnc4hM3fzGLliHrfI4VEoU04h_V7VzTeUkfTbyF3QMo1ekjBa0zYzHVHSSdIpv5aZ4u8dtCXZV-1_HUiAvKA9iVDiRwo1VBH3Y4-L2F-_z-EevMZKANyw1ussM0oj769_6gXXrhPWfTkzoI93Bgd2rr3bVTUY3EFu7Nj6QrJk-WjpIwc" alt="thumbnail 2" />
            </button>
            <button className="aspect-square rounded-md overflow-hidden bg-surface-container-high opacity-50 hover:opacity-100 transition-opacity">
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUhraGxoOZWELtuhzkuf1XEjIM8U73qv3di2TKFVc4w5Uv97is0XMZK95UKNc6wrqwdvBu0IdDPmRJljJzkHlfun1KXkV6-ZGq_YFzrgJWmUT-ThmejsBIIdte6TxBYcsYtnz5K8JVNP3EiSkUfo3vPHZSAnzozvFVk3-VnuL5gMsjiI_kWRvHSIoM2TzXiTeGTma_dw5Ay4jFTUA9FjWqdr7ELhipBprXf-OA65PppQJjTYBiaNWBuZXG9DMhPciMrwWZqTn-zLE" alt="thumbnail 3" />
            </button>
            <div className="aspect-square rounded-md flex items-center justify-center bg-surface-container-high border border-outline-variant/20 text-on-surface-variant cursor-pointer hover:bg-surface-bright transition-colors">
              <span className="material-symbols-outlined">add_photo_alternate</span>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="mb-8">
            <span className="text-secondary font-label text-sm uppercase tracking-[0.2em] mb-3 block">Shining Fates • SV107/SV122</span>
            <h1 className="text-4xl md:text-5xl font-extrabold font-headline leading-tight tracking-tight mb-4 text-white" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>Charizard VMAX</h1>
            <div className="flex flex-wrap items-center gap-4">
              <span className="bg-tertiary/10 text-tertiary text-xs font-bold px-3 py-1 rounded border border-tertiary/20 uppercase tracking-tighter">VMAX</span>
              <span className="text-on-surface-variant text-sm font-medium">✅ Stok: 3 tersedia</span>
            </div>
          </div>

          <div className="p-6 md:p-8 rounded-lg bg-surface-container-low border border-outline-variant/10 mb-10">
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-on-surface-variant text-lg">Rp</span>
              <span className="text-4xl font-extrabold font-headline text-[#00D4FF]">500.000</span>
            </div>
            <button className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary-container font-bold py-4 md:py-5 px-8 rounded-full flex items-center justify-center gap-3 hover:scale-[1.03] active:scale-[0.98] transition-all holographic-glow">
              <span className="material-symbols-outlined">chat</span>
              Beli via WhatsApp
            </button>
            <p className="mt-6 text-center text-xs text-on-surface-variant/60 font-medium leading-relaxed">
              Transaksi aman via Direct Admin atau Marketplace.
            </p>
          </div>

          <div className="space-y-8">
            <div className="border-t border-outline-variant/10 pt-8">
              <h3 className="font-headline text-lg font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">description</span>
                Deskripsi
              </h3>
              <p className="text-on-surface-variant leading-relaxed text-sm">
                Kartu ultra rare dari seri Shining Fates. Charizard VMAX Shiny Vault ini merupakan salah satu kartu yang paling dicari oleh kolektor di seluruh dunia. Kondisi kartu sangat prima (Near Mint), tanpa pemutihan di bagian pinggir, dan memiliki centring yang hampir sempurna. Disimpan dalam double sleeve dan top loader sejak pertama kali unboxing.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-on-surface-variant/50 text-xs font-label uppercase">Kelangkaan</span>
                <span className="text-on-surface font-semibold">Shiny Rare VMAX</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-on-surface-variant/50 text-xs font-label uppercase">Tipe</span>
                <span className="text-on-surface font-semibold">Api (Fire)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="mt-24 md:mt-32">
        <div className="flex justify-between items-end mb-10 md:mb-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold font-headline mb-2">Produk Serupa</h2>
            <p className="text-on-surface-variant text-sm md:text-base">Tambahkan koleksi VMAX lainnya ke deck Anda.</p>
          </div>
          <Link to="/catalog?category=vmax" className="text-primary font-semibold flex items-center gap-1 hover:gap-2 transition-all text-sm md:text-base whitespace-nowrap">
            Lihat Semua <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {relatedMock.map(product => (
            <Link key={product.id} to={`/product/${product.id}`} className="block">
              <CatalogItem {...product} />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
