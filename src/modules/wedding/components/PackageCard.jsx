import { Check } from "lucide-react";
import { formatPrice } from "../data/weddingData";

const PackageCard = ({ pkg, onSelect }) => {
  return (
    <div className="h-full rounded-[2rem] border border-pink-100/30 bg-white/40 backdrop-blur-md p-6 sm:p-8 transition-all duration-500 hover:shadow-[0_20px_50px_-12px_rgba(157,49,61,0.15)] hover:-translate-y-2 hover:bg-white hover:border-primary/20 group">
      <h4
        className="text-xl font-semibold"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {pkg.name}
      </h4>
      <p className="text-2xl font-bold text-primary mt-2">
        {formatPrice(pkg.price)}
      </p>
      <p className="text-sm text-muted-foreground mt-2">{pkg.description}</p>

      <ul className="mt-4 space-y-2">
        {pkg.includes.map((item) => (
          <li key={item} className="flex items-center gap-2 text-sm">
            <Check className="w-4 h-4 text-primary" />
            {item}
          </li>
        ))}
      </ul>

      {onSelect && (
        <button
          onClick={onSelect}
          className="mt-6 w-full py-3 rounded-full text-sm font-medium wedding-gradient text-background transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
          Select Package
        </button>
      )}
    </div>
  );
};

export default PackageCard;
