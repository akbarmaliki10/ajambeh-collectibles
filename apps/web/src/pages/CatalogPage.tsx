import CatalogFilterBar from '../components/CatalogFilterBar';
import CatalogGrid from '../components/CatalogGrid';

export default function CatalogPage() {
  return (
    <main className="min-h-screen">
      <CatalogFilterBar />
      <CatalogGrid />
    </main>
  );
}
