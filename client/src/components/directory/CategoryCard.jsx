import { Link } from 'react-router-dom';
import {
  Laptop,
  Utensils,
  Stethoscope,
  GraduationCap,
  Building2,
  DollarSign,
  ShoppingBag,
  Sparkles,
  Folder,
  ArrowRight
} from 'lucide-react';

const iconMap = {
  Laptop,
  Utensils,
  Stethoscope,
  GraduationCap,
  Building2,
  DollarSign,
  ShoppingBag,
  Sparkles,
  Folder
};

export default function CategoryCard({ category, count = 0 }) {
  const IconComponent = iconMap[category.icon] || Folder;

  return (
    <Link
      to={`/businesses?category=${encodeURIComponent(category.name)}`}
      className="category-card"
    >
      <div className="category-icon-box">
        <IconComponent size={22} />
      </div>
      <h3 className="category-name">{category.name}</h3>
      <p className="category-desc">{category.description}</p>
      <div className="category-count">
        <span>{count} {count === 1 ? 'Listing' : 'Listings'}</span>
        <ArrowRight size={14} />
      </div>
    </Link>
  );
}
