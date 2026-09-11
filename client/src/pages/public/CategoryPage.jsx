import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function CategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (category) {
      // Normalize slug to readable category name if needed
      const formatted = category
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
      navigate(`/businesses?category=${encodeURIComponent(formatted)}`, { replace: true });
    } else {
      navigate('/businesses', { replace: true });
    }
  }, [category, navigate]);

  return null;
}
