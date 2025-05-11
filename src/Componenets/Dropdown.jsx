import React from 'react';

const Dropdown = ({isOpen, handleSelect }) => {
    const RegionList = [
        'Africa',
        "Americas",
        "Asia",
        "Europe",
        "Oceania",
        "All"
    ];

    return (
        <div className={`dropdown_container ${isOpen ? "open" : ''}`} >
            {RegionList.map((region, index) => (
                <option
                    key={index}
                    value={region}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleSelect(region)
                    }}
                    className='region_option'
                > {region}</option>
            ))}
        </div>
    )
};

export default Dropdown;