import React from 'react'
import './SearchBar.css';
import { IoIosSearch } from "react-icons/io";
import { CiFilter } from "react-icons/ci";

export default function SearchBar() {
    return (
        <div className='search-wrapper'>
            <div class="search-container">
                <input type="text" placeholder="Search..." />
                <div className="search-icon">
                    <IoIosSearch color='#2c61f3' size={"25px"} />
                </div>
            </div>
            <div  className='search-style'>
                <CiFilter color='#eef0f6' size={"25px"} />
            </div>

        </div>



    )
}
