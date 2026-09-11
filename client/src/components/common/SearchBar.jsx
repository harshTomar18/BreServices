import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, ArrowRight } from 'lucide-react';

export default function SearchBar({ initialSearch = '', initialLocation = '', className = '' }) {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [location, setLocation] = useState(initialLocation);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.set('search', searchTerm.trim());
    if (location.trim()) params.set('location', location.trim());
    navigate(`/businesses?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className={`search-bar-card ${className}`} role="search">
      <div className="search-field">
        <Search size={20} className="search-field-icon" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Business name, service, or keyword..."
          aria-label="Search by business name or keyword"
        />
      </div>

      <div className="search-divider" />

      <div className="search-field">
        <MapPin size={20} className="search-field-icon" />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="City, State, or Area..."
          aria-label="Filter by city or location"
        />
      </div>

      <button type="submit" className="btn btn-primary btn-lg" style={{ flexShrink: 0 }}>
        <span>Find Businesses</span>
        <ArrowRight size={18} />
      </button>
    </form>
  );
}
