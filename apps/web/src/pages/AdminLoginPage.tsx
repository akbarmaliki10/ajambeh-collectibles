import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser, useStackApp } from '@stackframe/react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [nonce, setNonce] = useState<string | null>(null);
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();
  const user = useUser();
  const app = useStackApp();

  // Auto-redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    setLoading(true);

    try {
      const result = await app.sendMagicLinkEmail(email);
      if (result.status === 'error') {
        setError('Gagal mengirim kode OTP. Silakan coba lagi.');
        setLoading(false);
        return;
      }
      setNonce(result.data.nonce);
      setStep('otp');
      setSuccess('Kode OTP telah dikirim ke email Anda.');
    } catch (err: unknown) {
      console.error('Send OTP error:', err);
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(`Gagal mengirim kode OTP: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!nonce) {
      setError('Sesi kedaluwarsa. Silakan kirim ulang kode OTP.');
      setStep('email');
      return;
    }

    setLoading(true);

    try {
      const fullCode = otp + nonce;
      const result = await app.signInWithMagicLink(fullCode);
      if (result.status === 'error') {
        setError('Kode OTP salah atau kedaluwarsa. Silakan coba lagi.');
        setLoading(false);
        return;
      }
      navigate('/admin/dashboard');
    } catch (err: unknown) {
      console.error('OTP verification error:', err);
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(`Kode OTP salah atau kedaluwarsa: ${message}`);
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      const result = await app.sendMagicLinkEmail(email);
      if (result.status === 'error') {
        setError('Gagal mengirim ulang kode OTP.');
        setLoading(false);
        return;
      }
      setNonce(result.data.nonce);
      setOtp('');
      setSuccess('Kode OTP baru telah dikirim ke email Anda.');
    } catch (err: unknown) {
      console.error('Resend OTP error:', err);
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(`Gagal mengirim ulang kode OTP: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setStep('email');
    setOtp('');
    setNonce(null);
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="bg-background text-on-surface flex items-center justify-center min-h-[100dvh] py-12 relative selection:bg-primary/30 selection:text-primary overflow-y-auto lg:overflow-hidden">
      {/* Background Texture */}
      <div className="login-mesh-gradient"></div>

      {/* Subtle Bokeh Glows */}
      <div className="fixed top-1/4 left-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary/5 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-1/4 right-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-secondary/5 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none"></div>

      <main className="w-full max-w-lg px-4 sm:px-6 relative z-10">
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
          
          {/* Error Message */}
          {error && (
            <div className="bg-error-container/20 border border-error/20 text-error rounded-xl px-4 py-3 text-sm font-medium flex items-center gap-2 animate-in fade-in duration-300 mb-6">
              <span className="material-symbols-outlined text-lg flex-shrink-0">error</span>
              <span>{error}</span>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-primary/10 border border-primary/20 text-primary rounded-xl px-4 py-3 text-sm font-medium flex items-center gap-2 animate-in fade-in duration-300 mb-6">
              <span className="material-symbols-outlined text-lg flex-shrink-0">check_circle</span>
              <span>{success}</span>
            </div>
          )}

          {step === 'email' ? (
            /* ============ STEP 1: EMAIL INPUT ============ */
            <form onSubmit={handleSendOtp} className="space-y-8">
              <div className="space-y-3">
                <label 
                  className="block text-[10px] font-black text-primary tracking-[0.2em] uppercase ml-1 font-label" 
                  htmlFor="email"
                >
                  Email Admin
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-outline text-xl group-focus-within:text-primary transition-colors">mail</span>
                  </div>
                  <input 
                    className="w-full bg-surface-container-lowest/50 border border-outline-variant/10 focus:border-primary/50 focus:ring-4 focus:ring-primary/5 text-on-surface rounded-xl py-4 pl-14 pr-5 placeholder:text-outline/30 transition-all duration-300 text-sm font-medium font-body" 
                    id="email" 
                    name="email" 
                    placeholder="admin@ajambeh.com" 
                    required 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    autoFocus
                  />
                </div>
              </div>

              {/* Info Text */}
              <div className="flex items-start gap-2 px-1">
                <span className="material-symbols-outlined text-primary/50 text-sm mt-0.5 flex-shrink-0">info</span>
                <p className="text-[11px] text-on-surface-variant/60 font-body leading-relaxed">
                  Kode OTP akan dikirim ke email Anda untuk verifikasi akses admin.
                </p>
              </div>

              {/* CTA Button */}
              <button 
                className="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary-container font-black py-4 rounded-xl flex items-center justify-center gap-2 active:scale-[0.97] transition-all duration-300 group shadow-[0_12px_24px_-8px_rgba(158,202,255,0.2)] disabled:opacity-70 disabled:cursor-not-allowed" 
                type="submit"
                disabled={loading}
              >
                <span className="text-sm uppercase tracking-widest font-headline">Kirim Kode OTP</span>
                
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
          ) : (
            /* ============ STEP 2: OTP VERIFICATION ============ */
            <form onSubmit={handleVerifyOtp} className="space-y-8">
              {/* Email indicator */}
              <div className="flex items-center justify-between bg-surface-container-lowest/30 rounded-xl px-4 py-3 border border-outline-variant/10">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-lg">mail</span>
                  <span className="text-sm font-medium text-on-surface truncate">{email}</span>
                </div>
                <button 
                  type="button" 
                  onClick={handleBackToEmail}
                  className="text-xs text-primary font-bold hover:text-primary-dim transition-colors flex-shrink-0"
                >
                  Ganti
                </button>
              </div>

              {/* OTP Input */}
              <div className="space-y-3">
                <label 
                  className="block text-[10px] font-black text-primary tracking-[0.2em] uppercase ml-1 font-label" 
                  htmlFor="otp"
                >
                  Kode OTP
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-outline text-xl group-focus-within:text-primary transition-colors">pin</span>
                  </div>
                  <input 
                    className="w-full bg-surface-container-lowest/50 border border-outline-variant/10 focus:border-primary/50 focus:ring-4 focus:ring-primary/5 text-on-surface rounded-xl py-4 pl-14 pr-5 placeholder:text-outline/30 transition-all duration-300 text-2xl font-black tracking-[0.5em] text-center font-headline uppercase" 
                    id="otp" 
                    name="otp" 
                    placeholder="• • • • • •" 
                    required 
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.slice(0, 6))}
                    disabled={loading}
                    autoFocus
                    autoComplete="one-time-code"
                  />
                </div>
              </div>

              {/* Resend Link */}
              <div className="flex items-center justify-center px-1">
                <button 
                  type="button"
                  onClick={handleResendOtp}
                  disabled={loading}
                  className="text-xs font-body text-secondary hover:text-secondary-dim transition-colors font-bold tracking-tight disabled:opacity-50"
                >
                  Tidak menerima kode? Kirim ulang
                </button>
              </div>

              {/* Verify Button */}
              <button 
                className="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary-container font-black py-4 rounded-xl flex items-center justify-center gap-2 active:scale-[0.97] transition-all duration-300 group shadow-[0_12px_24px_-8px_rgba(158,202,255,0.2)] disabled:opacity-70 disabled:cursor-not-allowed" 
                type="submit"
                disabled={loading || otp.length < 6}
              >
                <span className="text-sm uppercase tracking-widest font-headline">Masuk</span>
                
                {!loading ? (
                  <span className="material-symbols-outlined text-sm font-bold group-hover:translate-x-1 transition-transform">lock_open</span>
                ) : (
                  <div className="flex items-center gap-1.5 ml-1">
                    <div className="w-1.5 h-1.5 bg-on-primary-container rounded-full dot-1"></div>
                    <div className="w-1.5 h-1.5 bg-on-primary-container rounded-full dot-2"></div>
                    <div className="w-1.5 h-1.5 bg-on-primary-container rounded-full dot-3"></div>
                  </div>
                )}
              </button>
            </form>
          )}
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
