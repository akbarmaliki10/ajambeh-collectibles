const whatsappNumber = (import.meta.env.VITE_WHATSAPP_NUMBER || '').replace(/\D/g, '');
const publicAppUrl = (import.meta.env.VITE_PUBLIC_APP_URL || '').trim().replace(/\/+$/, '');

const defaultMessage = import.meta.env.VITE_WHATSAPP_DEFAULT_MESSAGE || 'Halo, saya tertarik dengan koleksi Ajambeh Collectibles.';

function isLocalHost(hostname: string): boolean {
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]';
}

export function getAppBaseUrl(): string {
  if (typeof window !== 'undefined' && isLocalHost(window.location.hostname)) {
    return window.location.origin;
  }

  if (publicAppUrl) {
    return publicAppUrl;
  }

  if (typeof window !== 'undefined') {
    return window.location.origin;
  }

  return '';
}

export function createPublicUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const baseUrl = getAppBaseUrl();

  if (!baseUrl) {
    return normalizedPath;
  }

  return `${baseUrl}${normalizedPath}`;
}

export function createWhatsAppUrl(message?: string): string {
  if (!whatsappNumber) {
    return '#';
  }

  const text = encodeURIComponent(message || defaultMessage);
  return `https://wa.me/${whatsappNumber}?text=${text}`;
}

export { defaultMessage as whatsappDefaultMessage };