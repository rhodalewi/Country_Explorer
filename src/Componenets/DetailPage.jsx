import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import MissingPage from "./MissingPage";
import countriesData from '../data.json';

const DetailPage = () => {
    const { name } = useParams();
    const decodeURL = decodeURIComponent(name);
    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [allCountries, setAllCountries] = useState([]);

    useEffect(() => {
        const fetchCountry = async () => {
            try {
                setCountry(countriesData.find(country => country.name === decodeURL));
                setLoading(false);

            } catch (error) {
                console.error('Error fetching data', error)
                setLoading(false);
            }
        };

        setTimeout(() => {
            fetchCountry();
        }, 1000);
    }, [decodeURL]);

    useEffect(() => {
        const fetchAllCountries = async () => {
            try {fetchAllCountries
                setAllCountries(countriesData);

            } catch (error) {
                console.error('Error fetching all countries', error);
            }
        }

        fetchAllCountries();
    }, []);

    const getCountryNameByCode = (code) => { 
        const borderCountry = allCountries.find(country => country.alpha3Code === code);
        return borderCountry ? borderCountry.name : code;
    }
    

    return (
        <main className="detail_page">
            <div className="loading_error">
                {loading && <p className="loading">Loading...</p>}
            </div>

            {country && 
                <div className="detail_container">
                    <Link to='/' className="back_link">
                        <FaArrowLeftLong />
                        Back
                    </Link>

                    <div className='country_information'>
                        <div className="detail_flag">
                            <img src={country.flags.svg} alt={country.flags.alt}  />
                        </div>

                        <div className="country_information1">
                            <h2 className='country_name marginBottom'>
                                {country.name}
                            </h2>
                            <div className="country_details1">
                                <div>
                                    <p className="country_native_name marginBottom">
                                        <strong>Native Name: </strong> 
                                        {country.nativeName}
                                    </p>
                
                                    <p className='country_population marginBottom'>
                                        <strong>Population:</strong> {country.population.toLocaleString()}
                                    </p>
                                    
                                    <p className='country_region marginBottom'>
                                        <strong>Region:</strong> {country.region}
                                    </p>

                                    <p className='country_region marginBottom'>
                                        <strong>Sub Region:</strong> {country.subregion}
                                    </p>
                                    
                                    <p className='country_capital marginBottom'>
                                        <strong>Capital:</strong> {country.capital}
                                    </p>
                                </div>
                                <div>
                                    <p className='marginBottom'>
                                        <strong>Top Level Domain: </strong>
                                        {(country.topLevelDomain || []).join(', ')}
                                    </p>
                                    <p className='marginBottom'>
                                        <strong>Currencies: </strong>
                                        {country.currencies
                                            ? Array.isArray(country.currencies)
                                                ? country.currencies.map(c => c.name).join(', ')
                                                : Object.values(country.currencies).map(c => c.name).join(', ')
                                            : 'N/A'}
                                    </p>

                                    <p className='marginBottom'>
                                        <strong>Languages:</strong> {
                                            Array.isArray(country.languages)
                                                ? country.languages.map(lang => lang.name).join(', ')
                                                : country.languages
                                                    ? Object.values(country.languages).map(lang => lang.name).join(', ')
                                                    : 'N/A'
                                        }
                                    </p>
                                </div>
                            </div>
                            
                            <div className="country_details2">
                                <p><strong>Border Countries: </strong></p>
                                
                                <span className="border_countries">
                                    {country.borders ? (
                                        country.borders.map((border, index) => (
                                            <Link
                                                to={`/country/${getCountryNameByCode(border)}`}
                                                key={index}
                                                className="border_country"
                                            >
                                                {(border)}
                                            </Link>
                                           
                                        ))
                                    ) : (
                                        <span className="no_border_country" >No border countries</span>
                                    )}
                                </span>
                              
                            </div>
                            
                        </div>
                    </div>
                </div>
            }

            {
                !country && !loading && (
                    <div className="missing_page_container">
                        <MissingPage />
                    </div>
                )
            }
        </main>
       
    )
}

export default DetailPage;