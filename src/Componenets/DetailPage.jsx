import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import MissingPage from "./MissingPage";

const DetailPage = () => {
    const { name } = useParams();
    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [allCountries, setAllCountries] = useState([]);

    useEffect(() => {
        const fetchCountry = async () => {
            try {
                const response = await fetch(`https://restcountries.com/v3.1/alpha/${name}`);
                const data = await response.json();
                setCountry(data[0])
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data', error)
                setLoading(false);
            }
        };

        setTimeout(() => {
            fetchCountry();
        }, 1000);
    }, [name]);

    useEffect(() => {
        const fetchAllCountries = async () => {
            try {
                const response = await fetch('https://restcountries.com/v3.1/all');
                const data = await response.json();
                setAllCountries(data);

            } catch (error) {
                console.error('Error fetching all countries', error);
            }
        }

        fetchAllCountries();
    }, []);

    const getCountryNameByCode = (code) => { 
        const borderCountry = allCountries.find(country => country.cca3 === code);
        return borderCountry ? borderCountry.name.common : code;
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
                                {country.name.common}
                            </h2>
                            <div className="country_details1">
                                <div>
                                    <p className="country_native_name marginBottom">
                                        <strong>Native Name: </strong> 
                                        {Object.values(country.name.nativeName || {}).map(native => native.common).join(', ')}
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
                                        {country.tld}
                                    </p>
                                    <p className='marginBottom'>
                                        <strong>Currencies: </strong>
                                        {Object.values(country.currencies || {}).map(c => c.name).join(', ')}
                                    </p>
                                    <p className='marginBottom'>
                                        <strong>Language:</strong> {Object.values(country.languages || {}).join(', ')}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="country_details2">
                                <p><strong>Border Countries: </strong></p>
                                
                                <span className="border_countries">
                                    {country.borders ? (
                                        country.borders.map((border, index) => (
                                            <Link to={`/country/${border}`} key={index} className="border_country">
                                                {getCountryNameByCode(border)}
                                            </Link>
                                           
                                        ))
                                    ) : (
                                        <span className="no_border_country">No border countries</span>
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