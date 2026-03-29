import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // mock loading
    setTimeout(() => {
      setLoading(false);
      navigate('/admin/dashboard');
    }, 1500);
  };

  return (
    <div className="bg-background text-on-surface flex items-center justify-center min-h-[100dvh] py-12 relative selection:bg-primary/30 selection:text-primary overflow-y-auto lg:overflow-hidden">
      {/* Background Texture */}
      <div className="login-mesh-gradient"></div>

      {/* Subtle Bokeh Glows */}
      <div className="fixed top-1/4 left-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary/5 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-1/4 right-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-secondary/5 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none"></div>

      <main className="w-full max-w-lg px-4 sm:px-6 relative z-10 w-full">
        {/* Brand Anchor */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black italic tracking-tighter text-primary mb-3 logo-glow font-headline">
            Ajambeh Collectibles
          </h1>
          <p className="text-on-surface-variant font-label text-xs uppercase tracking-[0.3em] opacity-80">
            THE NEON ARCHIVE ACCESS
          </p>
        </div>

        {/* Login Container */}
        <div className="login-glass-card rounded-[2rem] p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.7)]">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Username Field */}
            <div className="space-y-3">
              <label 
                className="block text-[10px] font-black text-primary tracking-[0.2em] uppercase ml-1 font-label" 
                htmlFor="username"
              >
                Username
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline text-xl group-focus-within:text-primary transition-colors">person</span>
                </div>
                <input 
                  className="w-full bg-surface-container-lowest/50 border border-outline-variant/10 focus:border-primary/50 focus:ring-4 focus:ring-primary/5 text-on-surface rounded-xl py-4 pl-14 pr-5 placeholder:text-outline/30 transition-all duration-300 text-sm font-medium font-body" 
                  id="username" 
                  name="username" 
                  placeholder="Enter admin ID" 
                  required 
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-3">
              <label 
                className="block text-[10px] font-black text-primary tracking-[0.2em] uppercase ml-1 font-label" 
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline text-xl group-focus-within:text-primary transition-colors">lock</span>
                </div>
                <input 
                  className="w-full bg-surface-container-lowest/50 border border-outline-variant/10 focus:border-primary/50 focus:ring-4 focus:ring-primary/5 text-on-surface rounded-xl py-4 pl-14 pr-5 placeholder:text-outline/30 transition-all duration-300 text-sm font-medium tracking-widest font-body" 
                  id="password" 
                  name="password" 
                  placeholder="••••••••" 
                  required 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Utility Links */}
            <div className="flex items-center justify-between px-1">
              <label className="flex items-center cursor-pointer group">
                <input 
                  className="w-5 h-5 rounded bg-surface-container-highest border-outline-variant/20 text-primary focus:ring-primary/20 focus:ring-offset-0 transition-all cursor-pointer" 
                  type="checkbox"
                  disabled={loading}
                />
                <span className="ml-3 text-xs font-semibold text-on-surface-variant group-hover:text-on-surface transition-colors font-body">Remember device</span>
              </label>
              <a className="text-xs font-body text-secondary hover:text-secondary-dim transition-colors font-bold tracking-tight" href="#">Reset Access?</a>
            </div>

            {/* CTA Button with Loading State */}
            <button 
              className="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary-container font-black py-4 rounded-xl flex items-center justify-center gap-2 active:scale-[0.97] transition-all duration-300 group shadow-[0_12px_24px_-8px_rgba(158,202,255,0.2)]" 
              type="submit"
              disabled={loading}
            >
              <span className="text-sm uppercase tracking-widest font-headline">Masuk</span>
              
              {!loading ? (
                <span className="material-symbols-outlined text-sm font-bold group-hover:translate-x-1 transition-transform">arrow_forward</span>
              ) : (
                <div className="flex items-center gap-1.5 ml-1">
                  <div className="w-1.5 h-1.5 bg-on-primary-container rounded-full dot-1"></div>
                  <div className="w-1.5 h-1.5 bg-on-primary-container rounded-full dot-2"></div>
                  <div className="w-1.5 h-1.5 bg-on-primary-container rounded-full dot-3"></div>
                </div>
              )}
            </button>
          </form>
        </div>

        {/* Footer Meta */}
        <div className="mt-12 text-center space-y-6">
          <p className="text-outline/40 text-[10px] font-bold tracking-widest uppercase font-label">
            Protected by Encrypted Vault Protocols v4.2.0
          </p>
          <div className="flex justify-center gap-8 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="material-symbols-outlined text-xl hover:text-primary transition-colors cursor-help">verified_user</span>
            <span className="material-symbols-outlined text-xl hover:text-secondary transition-colors cursor-help">language</span>
            <span className="material-symbols-outlined text-xl hover:text-tertiary transition-colors cursor-help">support_agent</span>
          </div>
        </div>
      </main>

      {/* Visual Aesthetic Elements: Holographic Grain Overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] mix-blend-overlay">
        <img 
          className="w-full h-full object-cover" 
          alt="fine monochrome static grain texture" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkeaBQoelzNw3_rLNDcgZSxTggg-pRsKT7JtOiaZpNU7yTy3xc0NY8c41r_Xhs34rtfLYuzh1TDLqBbV5PRpCVHvEecRQkgYnuwnScmrSKAzC4RVwxhMhPn_y6U1s3SwMyTob1FySYSswrf9Q9HVtmyNzJvT8K_258bOMIZDhdRnV_ROhnFRFdms_vAe8dWBMH6JYUkKMV4dk6gkPoQkDBKRNGlMVYLVZYu54YEe0rP3H6Cvyf9535whfbqi8MqdAomdWuUVA_tfE"
        />
      </div>
    </div>
  );
}
