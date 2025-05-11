import {useState} from 'react';
import { IoSearchSharp } from "react-icons/io5";

const Search = ({ setSearchCountry}) => {
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = () => {
        setSearchCountry(searchValue.trim());
    };

    if (searchValue.length <= 0) {
            setSearchCountry("")
    };
    
    return (
        <div className='search_container'>
            <IoSearchSharp
                className='search_icon'
                onClick={handleSearch}
            />
            <input
                type="text"
                name="search"
                className='searchInput'
                placeholder='Search for a country...'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
        </div>
    )
};

export default Search;