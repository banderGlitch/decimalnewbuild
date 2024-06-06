import React from 'react'
import './SearchBar.css';
import { IoIosSearch } from "react-icons/io";
import { CiFilter } from "react-icons/ci";

export default function SearchBar() {
    return (
        <div style={{ display: 'flex', alignItems: 'center',justifyContent:'flex-end', gap:'30px' }}>
            <div class="search-container">
                <input type="text" placeholder="Search..." />
                <div className="search-icon">
                    <IoIosSearch color='#2c61f3' size={"25px"} />
                </div>
            </div>
            <div style={{
                position:'relative',
                right:'5%',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                backgroundColor:'#2f67ff',
                borderRadius: '100%',
                height:'35px',
                width: '95px', 
                padding:'3px',
                cursor:'pointer'
            }}>
                <CiFilter color='#eef0f6' size={"25px"} />
            </div>

        </div>



    )
}
