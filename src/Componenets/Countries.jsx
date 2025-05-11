import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MissingPage from './MissingPage';

function Countries({ selectedRegion, searchCountry }) {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
        try {
            const response = await fetch('https://restcountries.com/v3.1/all');
         
            if (!response.ok) throw new Error('Error fetching countries');
         
            const result = await response.json();
            setCountries(result);
            setLoading(false);

        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    }


    setTimeout(() => {
        (async () => {
            await fetchCountries();
            const countryCards = document.querySelector('.countries_container');
            countryCards.classList.add('animation');
        })();
    }, 2000);

  }, []);
    
    const sortedCountries = [...countries].sort((a, b) => a.name.common.localeCompare(b.name.common));

    const filteredCountries = sortedCountries.filter(country => {
        const filterByRegion = selectedRegion === 'Filter by Region' || selectedRegion === "All" || country.region === selectedRegion;

        const searchByName = searchCountry === "" || country.name.common.toLowerCase().includes(searchCountry.toLowerCase());



        return filterByRegion && searchByName;
    });
    
    return (
        <main className='main_content'>
          <div className='loading_error'>
            {loading && <p className='loading'>Loading...</p>}
            {error && <p className='errorMessage' style={{ color: "red" }}>{error}</p>}
          </div>
        
            {filteredCountries && 
                <>
                    <div className='countries_container'>
                        {!loading && !error && filteredCountries.map((country, index) => (
                            <Link to={`/country/${country.name.common}`} key={index} className='country_card'>
                    
                                <div className="country_detail">
                                    <div className='country_flag'>
                                        <img src={country.flags.png} alt={country.flags.alt} />
                                    </div>

                                    <div className="country_info">
                                        <h2 className='country_name'>{country.name.common}</h2>

                                        <p className='country_population'><strong>Population:</strong> {country.population.toLocaleString()}</p>

                                        <p className='country_region'><strong>Region:</strong> {country.region}</p>

                                        <p className='country_capital'><strong>Capital:</strong> { country.capital }</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </>
            }

            {filteredCountries.length === 0 && !loading &&
                <>
                  < MissingPage />
                </>
            }
        </main>
    )
};

export default Countries;