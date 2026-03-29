import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function TopNavBar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/catalog?q=${encodeURIComponent(search.trim())}&page=1`);
      setSearch('');
    }
  };

  return (
    <nav className="bg-[#131313]/80 backdrop-blur-xl border-b border-[#E5E2E1]/10 sticky top-0 z-50 flex justify-between items-center px-4 md:px-8 py-4 max-w-full">
      <div className="flex items-center gap-4 md:gap-12">
        <Link to="/" className="text-xl md:text-2xl font-extrabold text-[#9ECAFF] italic font-headline tracking-tight leading-none">
          Ajambeh<br className="sm:hidden" /> Collectibles
        </Link>
        <div className="hidden md:flex gap-8 items-center font-headline tracking-tight font-extrabold text-sm">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              isActive 
                ? "text-[#9ECAFF] border-b-2 border-[#9ECAFF] pb-1 hover:scale-105 transition-transform duration-200" 
                : "text-[#E5E2E1]/70 hover:text-[#E5E2E1] hover:scale-105 transition-transform duration-200"
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/catalog" 
            className={({ isActive }) => 
              isActive 
                ? "text-[#9ECAFF] border-b-2 border-[#9ECAFF] pb-1 hover:scale-105 transition-transform duration-200" 
                : "text-[#E5E2E1]/70 hover:text-[#E5E2E1] hover:scale-105 transition-transform duration-200"
            }
          >
            Katalog
          </NavLink>
        </div>
      </div>
      <div className="flex items-center gap-4 md:gap-6">
        <form onSubmit={handleSearchSubmit} className="hidden lg:flex items-center bg-surface-container-high rounded-full px-4 py-2 border border-outline-variant/15">
          <button type="submit" className="material-symbols-outlined text-on-surface-variant text-sm flex items-center justify-center">search</button>
          <input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none focus:ring-0 text-sm text-on-surface placeholder:text-on-surface-variant/50 w-48 ml-2 p-0" 
            placeholder="Cari kartu..." 
            type="text"
          />
        </form>
        <div className="flex gap-4">
          <button className="text-[#E5E2E1]/70 hover:text-[#9ECAFF] transition-all scale-95 flex items-center justify-center"><span className="material-symbols-outlined">account_circle</span></button>
          <button className="text-[#E5E2E1]/70 hover:text-[#9ECAFF] transition-all scale-95 flex items-center justify-center"><span className="material-symbols-outlined">shopping_cart</span></button>
        </div>
      </div>
    </nav>
  );
}
