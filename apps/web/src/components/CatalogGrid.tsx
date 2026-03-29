import { useSearchParams, Link } from 'react-router-dom';
import CatalogItem from './CatalogItem';

const mockCatalog = [
  {
    id: 1,
    imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuAERO3Pvm_v9RlCgfnsqYsJi90M6oMZFWAogVOni6pDFP8RxznO5umWwz8la5w3EAQrT50l4LU2F8xoRmGljhBrkd8_O9XYQy-95RMWNjUzSk2xqAWuLDgm2NcE91nKufMdROiwrXUKx8YnXHLXPSt7UZzNZ1O9lLT9hhJ2dC-XEL4yuPAOvTYYOJWZCQrxYyMTXqxYvXdYi9A2BFf02aOEeU3U_Nwi3AD47EJyyIdWy4Ijy8-reUzHlD98cmdnXXywlurmX0pRROY",
    imageAlt: "Premium rare holographic pokemon card showing a dragon-like creature with fiery background and shimmering foil effects",
    condition: "Mint",
    conditionColor: "text-tertiary border-tertiary/30 shadow-[0_0_10px_rgba(233,196,0,0.3)]",
    collection: "Brilliant Stars",
    title: "Charizard VMAX SV107",
    price: "IDR 4.250.000",
    categoryTags: ["vmax"]
  },
  {
    id: 2,
    imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuBxdQtfNhwueUwkSlBaVyA1hzk5KcWfOXfjrnROo5wc6JFfIogjVdrDAgrQ7B-yKvajTxQ9pToom_aSddq5vH4tseSblIe-tkHC33zVsvXO_DZEAB0i7GlmjRfW1Ud0OOCgUmv-uz33idrWHE_VSLaqtsVi4FWsTZ6Tlu5Dd1LqzXnrltDVKEQ0vwXMJLorbQK6pXUEMJIu3LYfn3pgtyA1ntqOw8GhLZWVvZTygqgVhd8HTtT732Y5WNfv6GY8p0MrrpUydlzxL7s",
    imageAlt: "Rare Pikachu pokemon card with yellow electric energy effects and high-gloss finish sitting on dark surface",
    condition: "Near Mint",
    conditionColor: "text-[#4ADE80] border-[#4ADE80]/30",
    collection: "Celebrations",
    title: "Pikachu Full Art",
    price: "IDR 850.000",
    categoryTags: ["holo", "full art"]
  },
  {
    id: 3,
    imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuBzxE_SQhhhQTVEofNcifyCyz0htJAWVZlqMnofO10Sek8AcAzo_M76infAbDpmQBqodQrUqRX4jXimleIOcxJFL6vIW3w4enRo4fOe3VedKuRwRJyS-nt1AKix5oAO54iruLsGCfU4LdR4UUflm82vgn4nqHiMyK9hcA-aLDOqkOC_WR8jZ1aCf1WA7Kg5qVwd0N8VUPfCWvDXaWi-iHK1TlrGsg5rkioC9khQqrQ8ZhdOeAoVTIU-rrb_kbdH0QHl3M96SLqe1Jg",
    imageAlt: "A graded pokemon card in a thick plastic protective case with an authentication label at the top",
    condition: "Graded",
    conditionColor: "text-tertiary border-tertiary/30",
    collection: "Silver Tempest",
    title: "Lugia V Alternate Art",
    price: "IDR 12.500.000",
    gradedData: "PSA 10",
    categoryTags: ["graded", "holo"]
  },
  {
    id: 4,
    imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzw9vp5MB_9hxl1FmbO4GrSV5dKjV3bm9vMYw2DxDbJ3shU6VpRS9FJQwlaf5S-aZAULsmMaHdGbSXhqO05mA8FRrd5CLz77RvPfkdl4NsO9IrjyR8V5rXuFzEASZni9ilgzs3MokpCJUaSFz25Yo13VOXqu7hdqlWBUihKzk-1pE6761ztzzjf344U-oAv5gMj59PLryM7gjseLP92X50bVYCbUZsvV5_qKOcXDh0gNlw3Is9nMzr2liGWW4jfW4YLWFyRAk2iNU",
    imageAlt: "Epic Rayquaza pokemon card artwork with green sky and legendary dragon flying through atmosphere",
    condition: "Lightly Played",
    conditionColor: "text-tertiary-fixed border-tertiary-fixed/30",
    collection: "Evolving Skies",
    title: "Rayquaza VMAX Alt Art",
    price: "IDR 6.750.000",
    categoryTags: ["vmax", "alt art"]
  }
];

export default function CatalogGrid() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || 'semua';
  const searchQuery = searchParams.get('q') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const itemsPerPage = 3; // Kept small to demo pagination

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', newPage.toString());
    setSearchParams(newParams);
  };

  const filteredProducts = mockCatalog.filter(product => {
    const matchesCategory = !currentCategory || currentCategory === 'semua' || product.categoryTags.includes(currentCategory.toLowerCase());
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || product.collection.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = filteredProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="font-headline text-3xl md:text-4xl font-extrabold tracking-tight mb-2">Katalog Koleksi</h1>
          <p className="text-outline text-sm uppercase tracking-widest">
            Menampilkan {paginatedProducts.length} dari {filteredProducts.length} kartu {totalPages > 1 && `(Halaman ${page})`}
          </p>
        </div>
        <div className="hidden sm:block h-1 w-32 bg-gradient-to-r from-primary to-transparent rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {paginatedProducts.map(product => (
          <Link key={product.id} to={`/product/${product.id}`} className="block">
            <CatalogItem {...product} />
          </Link>
        ))}
        
        {/* Skeleton Loaders */}
        {(currentCategory === 'semua' && page === 1 && !searchQuery) && (
           <>
              <div className="flex flex-col bg-surface-container-low rounded-xl overflow-hidden opacity-40">
                <div className="aspect-[3/4] bg-surface-container-high animate-pulse"></div>
                <div className="p-5 space-y-4">
                  <div className="h-2 w-1/3 bg-surface-container-high animate-pulse rounded"></div>
                  <div className="h-4 w-full animate-pulse rounded bg-[#F5F8F8]/20"></div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="h-6 w-24 animate-pulse rounded bg-[#00D4FF]/30"></div>
                    <div className="h-10 w-10 bg-surface-container-high animate-pulse rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col bg-surface-container-low rounded-xl overflow-hidden opacity-40 hidden xl:flex">
                <div className="aspect-[3/4] bg-surface-container-high animate-pulse"></div>
                <div className="p-5 space-y-4">
                  <div className="h-2 w-1/3 bg-surface-container-high animate-pulse rounded"></div>
                  <div className="h-4 w-full animate-pulse rounded bg-[#F5F8F8]/20"></div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="h-6 w-24 animate-pulse rounded bg-[#00D4FF]/30"></div>
                    <div className="h-10 w-10 bg-surface-container-high animate-pulse rounded-full"></div>
                  </div>
                </div>
              </div>
           </>
        )}
        
        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="lg:col-span-3 xl:col-span-4 flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="w-24 h-24 rounded-full bg-surface-container-high flex items-center justify-center mb-6 border border-outline-variant/10">
              <span className="material-symbols-outlined text-4xl text-outline">search_off</span>
            </div>
            <h2 className="font-headline text-2xl font-bold mb-2">Belum menemukan yang dicari?</h2>
            <p className="text-outline max-w-md mx-auto mb-8">Coba sesuaikan filter atau gunakan kata kunci yang lebih umum untuk menemukan kartu impianmu.</p>
            <button 
              onClick={() => {
                const newParams = new URLSearchParams();
                setSearchParams(newParams);
              }}
              className="px-8 py-3 rounded-full border border-primary text-primary font-bold hover:bg-primary/5 transition-all"
            >
              Bersihkan Filter
            </button>
          </div>
        )}
      </div>

      {/* Pagination Logic */}
      {totalPages > 1 && (
        <div className="mt-20 flex flex-col items-center gap-6">
          <div className="flex gap-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
              <button 
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  page === pageNum
                    ? 'bg-primary text-on-primary font-bold'
                    : 'bg-surface-container-high text-on-surface hover:bg-surface-bright'
                }`}
              >
                {pageNum}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
