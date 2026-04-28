function CountryCard({ country }) {
  // Show the first capital city, or "N/A" if none exists
  const capital = country.capital ? country.capital[0] : 'N/A';

  // Format population with commas: e.g. 1234567 → "1,234,567"
  const population = country.population.toLocaleString();

  // Show up to the first 2 languages joined by a comma, or "N/A" if no languages
  const languages = country.languages
    ? Object.values(country.languages).slice(0, 2).join(', ')
    : 'N/A';

  return (
    <div className="country-card">
      <img
        className="country-flag"
        src={country.flags.svg}
        alt={'Flag of ' + country.name.common}
      />

      <div className="country-info">
        <h2>{country.name.common}</h2>
        <p><strong>Capital:</strong> {capital}</p>
        <p><strong>Population:</strong> {population}</p>
        <p><strong>Languages:</strong> {languages}</p>
      </div>
    </div>
  );
}

export default CountryCard;
