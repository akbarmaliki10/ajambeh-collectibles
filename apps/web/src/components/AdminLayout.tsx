import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    navigate('/admin/login');
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Determine active sidebar item based on current path
  const isDashboardActive = location.pathname === '/admin/dashboard';
  const isProdukActive = location.pathname.startsWith('/admin/product');

  const activeClass = "flex items-center gap-3 px-6 py-3 bg-[#9ECAFF]/10 text-[#9ECAFF] rounded-r-full border-l-4 border-[#9ECAFF] font-['Inter'] text-sm font-semibold translate-x-1 transition-all";
  const inactiveClass = "flex items-center gap-3 px-6 py-3 text-[#E5E2E1]/60 hover:bg-[#2A2A2A] hover:text-[#E5E2E1] font-['Inter'] text-sm font-semibold transition-colors";

  return (
    <div className="bg-background text-on-surface min-h-screen selection:bg-primary selection:text-on-primary-container font-body flex">
      {/* Mobile AppBar (Only visible on small devices) */}
      <div className="md:hidden fixed top-0 w-full h-16 bg-[#1C1B1B] border-b border-outline-variant/10 z-40 flex items-center justify-between px-4">
        <h1 className="text-lg font-bold text-[#FFB4AA] font-headline">Ajambeh Panel</h1>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="p-2 text-on-surface hover:text-primary transition-colors focus:outline-none"
        >
          <span className="material-symbols-outlined text-2xl">
            {isMobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Backdrop for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`w-64 fixed left-0 top-0 bg-[#1C1B1B] flex flex-col h-screen py-6 shadow-2xl shadow-black/50 z-50 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="px-6 mb-10">
          <h1 className="text-lg font-bold text-[#FFB4AA] font-headline">Ajambeh Panel</h1>
          <p className="text-xs text-on-surface-variant font-medium opacity-70">Collectibles Manager</p>
        </div>
        
        <nav className="flex-1 space-y-2 px-0">
          <Link 
            to="/admin/dashboard"
            onClick={closeMobileMenu}
            className={isDashboardActive ? activeClass : inactiveClass}
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span>Dashboard</span>
          </Link>
          <Link 
            to="/admin/products"
            onClick={closeMobileMenu}
            className={isProdukActive ? activeClass : inactiveClass}
          >
            <span className="material-symbols-outlined">inventory_2</span>
            <span>Produk</span>
          </Link>
        </nav>
        
        <div className="mt-auto px-0 border-t border-outline-variant/10 pt-4">
          <a 
            href="#" 
            className="flex items-center gap-3 px-6 py-3 text-[#E5E2E1]/60 hover:bg-[#2A2A2A] hover:text-[#E5E2E1] font-['Inter'] text-sm font-semibold transition-colors opacity-50 cursor-not-allowed"
            onClick={(e) => e.preventDefault()}
          >
            <span className="material-symbols-outlined">settings</span>
            <span>Settings</span>
          </a>
          <button 
            onClick={handleLogout}
            className="w-full mt-4 px-6 flex items-center gap-3 py-3 text-secondary font-bold font-['Inter'] text-sm hover:bg-secondary/10 transition-colors"
          >
            <span className="material-symbols-outlined">logout</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 md:ml-64 mt-16 md:mt-0 flex flex-col min-h-screen w-full transition-all duration-300">
        <div className="flex-1 w-full max-w-[100vw]">
          <Outlet />
        </div>

        {/* Footer */}
        <footer className="bg-[#131313] w-full py-12 border-t border-[#E5E2E1]/5 flex flex-col items-center gap-6">
          <div className="flex gap-8">
            <a className="text-[#E5E2E1]/40 hover:text-[#FFB4AA] transition-colors font-['Inter'] text-xs uppercase tracking-widest" href="#">WhatsApp</a>
            <a className="text-[#E5E2E1]/40 hover:text-[#FFB4AA] transition-colors font-['Inter'] text-xs uppercase tracking-widest" href="#">Instagram</a>
          </div>
          <p className="text-[#E5E2E1]/40 font-['Inter'] text-xs uppercase tracking-widest text-center px-8">
            © 2024 Ajambeh Collectibles. All Rights Reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
