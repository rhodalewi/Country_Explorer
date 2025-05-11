import {useState} from 'react';
import Countries from './Countries';
import SearchFilter from './SearchFilter';

const Main = () => {
    const [selectedRegion, setSelectedRegion] = useState('Filter by Region');
    const [searchCountry, setSearchCountry] = useState('');
    
    return (
        <>
            <SearchFilter
                 selectedRegion={selectedRegion}
                 setSelectedRegion={setSelectedRegion}
                 setSearchCountry={setSearchCountry}
            />

            <Countries
                selectedRegion={selectedRegion} searchCountry={searchCountry}
            />
            
        </>
    )
};

export default Main;