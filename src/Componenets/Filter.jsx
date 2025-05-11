import React, {useState} from 'react';
import { FaAngleUp } from "react-icons/fa6";
import Dropdown from './Dropdown';

const Filter = ( {selectedRegion, setSelectedRegion} ) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(Open => !Open);

    const handleSelect = (region) => {
        setSelectedRegion(region);
        setIsOpen(false);
    }

  return (
        <div className='filter_container' onClick={toggleDropdown}>
          <p> {selectedRegion} </p>
          <FaAngleUp 
              className={`dropdown_icon ${isOpen ? 'rotate' : ''}`}
          />

          <Dropdown
              isOpen={isOpen}
              handleSelect={handleSelect}
          />
        </div>
  )
}

export default Filter;