export interface CatalogItemProps {
  id: number;
  imageSrc: string;
  imageAlt: string;
  condition: string;
  conditionColor: string; // TailWind color block class, e.g. text-[#4ADE80] border-[#4ADE80]/30
  categoryTags: string[]; // E.g. ["vmax", "holo", "graded"]
  collection: string;
  title: string;
  price: string;
  gradedData?: string; // e.g. "PSA 10"
}

export default function CatalogItem({
  imageSrc,
  imageAlt,
  condition,
  conditionColor,
  collection,
  title,
  price,
  gradedData
}: CatalogItemProps) {
  return (
    <div className="group relative flex flex-col bg-surface-container-high rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 card-glow">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={imageAlt} src={imageSrc} />
        <div className="absolute inset-0 holographic-overlay opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
        {gradedData && (
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-secondary/20 backdrop-blur text-secondary text-[10px] font-bold uppercase tracking-tighter border border-secondary/30">
            {gradedData}
          </div>
        )}
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full bg-surface-bright/90 backdrop-blur ${conditionColor} text-[10px] font-bold uppercase tracking-tighter border`}>
          {condition}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <span className="text-[10px] text-primary font-bold uppercase tracking-widest mb-1">{collection}</span>
        <h3 className="font-headline text-lg font-bold leading-tight mb-4 group-hover:text-primary transition-colors text-[#F5F8F8]">{title}</h3>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-extrabold text-[#00D4FF]">{price}</span>
          <button className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-on-primary transition-all">
            <span className="material-symbols-outlined">add_shopping_cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}
