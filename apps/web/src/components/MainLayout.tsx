import { Outlet, Link } from 'react-router-dom';
import TopNavBar from './TopNavBar';
import Footer from './Footer';

export default function MainLayout() {
  return (
    <>
      <TopNavBar />
      
      {/* Outlet renders the child routes dynamically */}
      <Outlet />
      
      <Footer />

      {/* Floating Action Button (FAB) for mobile navigation */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-surface-container-high/80 backdrop-blur-xl px-6 py-3 rounded-full border border-outline-variant/20 flex items-center gap-6 sm:gap-8 shadow-2xl w-max">
        <Link to="/" className="text-primary hover:scale-110 transition-transform">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
        </Link>
        <Link to="/catalog" className="text-on-surface-variant hover:text-primary hover:scale-110 transition-transform">
          <span className="material-symbols-outlined">grid_view</span>
        </Link>
        <button className="text-on-surface-variant hover:text-primary hover:scale-110 transition-transform">
          <span className="material-symbols-outlined">shopping_cart</span>
        </button>
        <button className="text-on-surface-variant hover:text-primary hover:scale-110 transition-transform">
          <span className="material-symbols-outlined">person</span>
        </button>
      </div>
    </>
  );
}
