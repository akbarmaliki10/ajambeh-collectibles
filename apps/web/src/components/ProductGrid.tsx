import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

export default function ProductGrid() {
  const products = [
    {
      id: 1,
      imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuB1e8M8aToPUGpMiMhU3GnO1sm3WOLGRyTt1lYGvFXjHpEp4B5xHNtVVj9tZsKQ2s_6wa7H1QVBOsgT_UPXatstW_MVL4sHIvMbGHZoXXWQ-f8SAMc9_fzUTOEv1am_QjP6zeMixXgUJFnZsGe97ggBY5fa481LB5rQTDpw0Ct5MTMxc3J5KEDtIsRaS9kG5Nyr1zhT9ZGADMosXIsjY8XA0hp_JpvPWdP7-E60ovxyT7N0QWSrwRstoMZRf16t08g-QRDMtEEzSSc",
      imageAlt: "Pokemon Card Charizard",
      condition: "Near Mint",
      conditionBgClass: "bg-primary/90",
      conditionTextClass: "text-on-primary-fixed",
      collection: "Celebrations: Classic",
      title: "Charizard Holo",
      price: "Rp 1.450.000",
      stockStatus: "Stok Tersedia",
      stockDotClass: "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"
    },
    {
      id: 2,
      imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlqzWs72Y6sQTTX-O_Ae5qBWm1_roIBH3HMk1NTzs5AxXgWpbGs042k30vGJRCSpdgOIXS_FmyqgN5g7XxKIfW8yAreqYh4jTXYQeYLec-MYAy9WwwsrjZAkvr19-SvmSfgZ2nslZzAxNj09THgkP0P5Vk-WakwofC_iXqOtsCOUZ2peWWI02k2N5-2hkuT5UCsAYTj2PPrZBjCpB7oB_8UiVRV4ZqIy7_AVzFatwE9EoLv4pxIdIMLb_jO6F5GkCM2wo-rgNwDvc",
      imageAlt: "Pokemon Card Mewtwo",
      condition: "PSA 10",
      conditionBgClass: "bg-secondary/90",
      conditionTextClass: "text-on-secondary",
      collection: "Evolving Skies",
      title: "Rayquaza VMAX",
      price: "Rp 4.200.000",
      stockStatus: "Stok Terbatas (1)",
      stockDotClass: "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]"
    },
    {
      id: 3,
      imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0YNJFTHvFeExE-jClE6ttN0E5_jmhgiPFANr31I5f9FnlWgoxK4nghMcvXDGzqV3rrTvehomSBgdPJO_EtELkkwciu680kztFd0y_rigv2hCRvpazvqRpYfa1xDTDrAFpAlhFSIvuLyjQvPEZE-EJ2F8F4GUk_55fvXr5TawO44aIBpZFXHrwcqXDny7GO_NynSprBihstGq_tHBH1FyvcG7zLb89bhiikg9-wZqrB4cocbeKg04TzVyxSm-nJqS51_eM0EPDWYQ",
      imageAlt: "Pokemon Card Pikachu",
      condition: "Near Mint",
      conditionBgClass: "bg-primary/90",
      conditionTextClass: "text-on-primary-fixed",
      collection: "Crown Zenith",
      title: "Pikachu Secret Rare",
      price: "Rp 850.000",
      stockStatus: "Stok Tersedia",
      stockDotClass: "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"
    },
    {
      id: 4,
      imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFHMopEwWcEw_dk6Dgs0n_bkz0ADXQrIgODtw_fzQETQBmdeIqL69ahabxqFNFNDN6prWfSqYRCy2a7DInu-OemLIcRBZgYJMk5J3qvn_T8G24TN6_x-Fa0z1YqNEDXGQ9eUVtCLM89hKEjGmsiLxYt3FFlSN1Yl61fmcOpY-FQvlTDwR3VNkwtPebxcCR9qKOsuWpLHClfGzDSKXaKb8l-scrOytAClyiB6OctV_sEFdXXye9udc5vOBdXpkPH1Pk6FjpnA0yu2s",
      imageAlt: "Pokemon Card Umbreon",
      condition: "CGC 9.5",
      conditionBgClass: "bg-primary/90",
      conditionTextClass: "text-on-primary-fixed",
      collection: "Blue Sky Stream",
      title: "Umbreon VMAX Alt",
      price: "Rp 8.900.000",
      stockStatus: "Habis (Pre-order)",
      stockDotClass: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"
    }
  ];

  return (
    <section className="py-12 md:py-20 px-4 md:px-6 max-w-[1440px] mx-auto" id="catalog">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 md:mb-12">
        <div>
          <span className="text-primary font-bold tracking-widest text-xs uppercase mb-2 block">Premium Selection</span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Koleksi Terbaru</h2>
        </div>
        <a className="text-primary-dim hover:text-primary font-bold text-sm flex items-center gap-2 transition-colors" href="#">
          Lihat Semua
          <span className="material-symbols-outlined">arrow_forward</span>
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map(product => (
          <Link key={product.id} to={`/product/${product.id}`} className="block">
            <ProductCard {...product} />
          </Link>
        ))}
      </div>
    </section>
  );
}
