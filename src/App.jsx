import { useState } from 'react';
import useFetch from './hooks/useFetch';
import CountryCard from './components/CountryCard.jsx';
import SearchBar from './components/SearchBar.jsx';
import './App.css';

// The REST Countries API — returns only the fields we need
const API =
  'https://restcountries.com/v3.1/all?fields=name,capital,population,region,flags,languages';

// All regions available as filter options
const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

function App() {
  // Fetch all country data via our custom hook
  const { data: countries, loading, error } = useFetch(API);

  // Controlled state for the search input
  const [searchTerm, setSearchTerm] = useState('');

  // Currently selected region filter
  const [selectedRegion, setSelectedRegion] = useState('All');

  // Show a loading message while data is being fetched
  if (loading) return <p>Loading countries...</p>;

  // Show an error message if something went wrong
  if (error) return <p>Error: {error}</p>;

  // Filter countries by search term and selected region, then sort A–Z
  const filteredCountries = (countries || [])
    .filter((country) => {
      const matchesSearch = country.name.common
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesRegion =
        selectedRegion === 'All' || country.region === selectedRegion;

      return matchesSearch && matchesRegion;
    })
    .sort((a, b) => a.name.common.localeCompare(b.name.common));

  return (
    <div className="app">

      {/* ── Header ── */}
      <header className="app-header">
        <h1>Country Explorer</h1>
        <span className="header-badge">🌍 {(countries || []).length} countries</span>
        <p>Discover flags, capitals, and populations from every nation</p>
      </header>

      {/* ── Search bar ── */}
      <SearchBar onSearch={setSearchTerm} searchTerm={searchTerm} />

      {/* ── Region filter buttons ── */}
      <div className="region-buttons">
        {regions.map((region) => (
          <button
            key={region}
            className={selectedRegion === region ? 'active' : ''}
            onClick={() => setSelectedRegion(region)}
          >
            {region}
          </button>
        ))}
      </div>

      {/* ── Results count ── */}
      <p className="results-count">
        Showing {filteredCountries.length} of {(countries || []).length} countries
      </p>

      {/* ── Country grid ── */}
      <div className="country-grid">
        {filteredCountries.map((country) => (
          <CountryCard key={country.name.common} country={country} />
        ))}
      </div>

    </div>
  );
}

export default App;
