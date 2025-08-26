import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MissingPage from './MissingPage';
import countriesData from '../data.json';

function Countries({ selectedRegion, searchCountry }) {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
        try {
            setCountries(countriesData);
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
    }, 1000);

  }, []);
    
    const priority = ['Germany', 'Iceland', 'Brazil', 'United States of America']; 
    const arrangeCountries = [
        ...countries.filter(country => priority.includes(country.name)),
        ...countries.filter(country =>!priority.includes(country.name))
    ]

    const filteredCountries = arrangeCountries.filter(country => {
        const filterByRegion = selectedRegion === 'Filter by Region' || selectedRegion === "All" || country.region === selectedRegion;

        const searchByName = searchCountry === "" || country.name.toLowerCase().includes(searchCountry.toLowerCase());

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
                        {!loading && !error && filteredCountries.map((country) => (
                            <Link to={`/country/${encodeURIComponent(country.name)}`} key={country.name} className='country_card'>
                    
                                <div className="country_detail">
                                    <div className='country_flag'>
                                        <img src={country.flags.png} alt={country.flags.alt} />
                                    </div>

                                    <div className="country_info">
                                        <h2 className='country_name'>{country.name}</h2>

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

            
            {
                filteredCountries && filteredCountries.length === 0 && !loading && (
                    <div className="missing_page_container">
                        <MissingPage />
                    </div>
                )
            }
        </main>
    )
};

export default Countries;