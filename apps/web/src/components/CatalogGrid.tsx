import { useSearchParams, Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { fetchProducts, type Product } from '../lib/api';
import CatalogItem from './CatalogItem';

export default function CatalogGrid() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || '';
  const searchQuery = searchParams.get('q') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const itemsPerPage = 12;

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetchProducts()
      .then(res => setAllProducts(res.data || []))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', newPage.toString());
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [searchParams, setSearchParams]);

  // Client-side filter (category slug match + title/collection search)
  const filteredProducts = allProducts.filter(product => {
    const matchesCategory = !currentCategory || currentCategory === 'semua'
      || product.categories?.some(c => c.slug === currentCategory || c.name.toLowerCase() === currentCategory.toLowerCase());
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q
      || product.name.toLowerCase().includes(q)
      || (product.collection ?? '').toLowerCase().includes(q)
      || product.categories?.some(c => c.name.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const paginatedProducts = filteredProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="font-headline text-3xl md:text-4xl font-extrabold tracking-tight mb-2">Katalog Koleksi</h1>
          {!loading && (
            <p className="text-outline text-sm uppercase tracking-widest">
              Menampilkan {paginatedProducts.length} dari {filteredProducts.length} kartu
              {totalPages > 1 && ` (Halaman ${page})`}
            </p>
          )}
        </div>
        <div className="hidden sm:block h-1 w-32 bg-gradient-to-r from-primary to-transparent rounded-full"></div>
      </div>

      {/* Loading Skeletons */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col bg-surface-container-low rounded-xl overflow-hidden animate-pulse">
              <div className="aspect-[3/4] bg-surface-container-high"></div>
              <div className="p-5 space-y-4">
                <div className="h-2 w-1/3 bg-surface-container-high rounded"></div>
                <div className="h-4 w-full bg-surface-container-high rounded"></div>
                <div className="flex justify-between items-center mt-4">
                  <div className="h-6 w-24 bg-[#00D4FF]/20 rounded"></div>
                  <div className="h-10 w-10 bg-surface-container-high rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="material-symbols-outlined text-5xl text-error mb-4">error</span>
          <h2 className="font-headline text-2xl font-bold mb-2">Gagal memuat produk</h2>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 rounded-full border border-primary text-primary font-bold hover:bg-primary/5 transition-all"
          >
            Coba Lagi
          </button>
        </div>
      )}

      {/* Product Grid */}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {paginatedProducts.map(product => (
              <Link key={product.id} to={`/product/${product.id}`} className="block">
                <CatalogItem product={product} />
              </Link>
            ))}

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="lg:col-span-3 xl:col-span-4 flex flex-col items-center justify-center py-20 px-4 text-center">
                <div className="w-24 h-24 rounded-full bg-surface-container-high flex items-center justify-center mb-6 border border-outline-variant/10">
                  <span className="material-symbols-outlined text-4xl text-outline">search_off</span>
                </div>
                <h2 className="font-headline text-2xl font-bold mb-2">Belum menemukan yang dicari?</h2>
                <p className="text-outline max-w-md mx-auto mb-8">
                  Coba sesuaikan filter atau gunakan kata kunci yang lebih umum untuk menemukan kartu impianmu.
                </p>
                <button
                  onClick={() => setSearchParams(new URLSearchParams())}
                  className="px-8 py-3 rounded-full border border-primary text-primary font-bold hover:bg-primary/5 transition-all"
                >
                  Bersihkan Filter
                </button>
              </div>
            )}
          </div>

          {/* Pagination */}
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
        </>
      )}
    </section>
  );
}
