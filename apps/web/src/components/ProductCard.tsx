export interface ProductCardProps {
  imageSrc: string;
  imageAlt: string;
  condition: string;
  conditionBgClass: string;
  conditionTextClass: string;
  collection: string;
  title: string;
  price: string;
  stockStatus: string;
  stockDotClass: string;
}

export default function ProductCard({
  imageSrc,
  imageAlt,
  condition,
  conditionBgClass,
  conditionTextClass,
  collection,
  title,
  price,
  stockStatus,
  stockDotClass
}: ProductCardProps) {
  return (
    <div className="group relative bg-surface-container rounded-xl overflow-hidden glass-card transition-all duration-500 hover:-translate-y-2">
      <div className="aspect-[3/4] overflow-hidden relative">
        <img alt={imageAlt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={imageSrc} />
        <div className={`absolute top-4 right-4 ${conditionBgClass} ${conditionTextClass} px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider`}>
          {condition}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent opacity-60"></div>
      </div>
      <div className="p-6">
        <p className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-1">{collection}</p>
        <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors" style={{ color: '#E0F7FA' }}>{title}</h3>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-on-surface-variant font-medium">Price</span>
            <span className="text-lg font-black text-[#00D4FF] font-extrabold">{price}</span>
          </div>
          <button className="h-10 w-10 bg-surface-bright rounded-lg flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary-fixed transition-all">
            <span className="material-symbols-outlined">shopping_cart</span>
          </button>
        </div>
        <div className="mt-4 pt-4 border-t border-outline-variant/10 flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${stockDotClass}`}></div>
          <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">{stockStatus}</span>
        </div>
      </div>
    </div>
  );
}
