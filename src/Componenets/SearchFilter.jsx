import Search from './Search';
import Filter from './Filter';

const SearchFilter = ({ selectedRegion, setSelectedRegion, 
    setSearchCountry }) => {
    
    return (
        <div className='searchFilter_container'>
            <Search
                setSearchCountry={setSearchCountry}
            />
            <Filter
                selectedRegion={selectedRegion}
                setSelectedRegion={setSelectedRegion}
            />
        </div>
    )
};


export default SearchFilter;