import { useNavigate } from 'react-router-dom';

export default function CategoryFilter() {
  const navigate = useNavigate();

  const handleCategoryClick = (cat: string) => {
    if (cat === 'All') {
      navigate('/catalog');
    } else {
      navigate(`/catalog?category=${cat.toLowerCase()}`);
    }
  };

  return (
    <section className="py-8 md:py-12 px-4 md:px-6 max-w-[1440px] mx-auto overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-4 min-w-max pb-4">
        <button 
          onClick={() => handleCategoryClick('All')}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-on-primary-fixed font-bold text-sm transition-all shadow-lg shadow-primary/20"
        >
          <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
          All
        </button>
        <button 
          onClick={() => handleCategoryClick('Holo')}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-surface-container-high text-on-surface-variant hover:text-on-surface hover:bg-surface-bright transition-all font-semibold text-sm"
        >
          <span className="material-symbols-outlined text-lg">auto_awesome</span>
          Holo
        </button>
        <button 
          onClick={() => handleCategoryClick('VMAX')}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-surface-container-high text-on-surface-variant hover:text-on-surface hover:bg-surface-bright transition-all font-semibold text-sm"
        >
          <span className="material-symbols-outlined text-lg">electric_bolt</span>
          VMAX
        </button>
        <button 
          onClick={() => handleCategoryClick('GX')}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-surface-container-high text-on-surface-variant hover:text-on-surface hover:bg-surface-bright transition-all font-semibold text-sm"
        >
          <span className="material-symbols-outlined text-lg">shield</span>
          GX
        </button>
        <button 
          onClick={() => handleCategoryClick('Graded')}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-surface-container-high text-on-surface-variant hover:text-on-surface hover:bg-surface-bright transition-all font-semibold text-sm"
        >
          <span className="material-symbols-outlined text-lg">verified</span>
          Graded
        </button>
        <button 
          onClick={() => handleCategoryClick('Accessories')}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-surface-container-high text-on-surface-variant hover:text-on-surface hover:bg-surface-bright transition-all font-semibold text-sm"
        >
          <span className="material-symbols-outlined text-lg">category</span>
          Accessories
        </button>
      </div>
    </section>
  );
}
