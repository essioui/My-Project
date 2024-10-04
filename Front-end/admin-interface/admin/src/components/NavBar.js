import React from "react";
import "../App.css"
import { Link } from 'react-router-dom';
export default function NavBar() {
    return(
        <div>
            <ul className='unorder'>
                <li className='listStyle'>
                    <Link to="/MyForm">MyForm</Link>
                </li>

                <li className='listStyle'>
                    <Link to="/Products">Products</Link>
                </li>

                <li className='listStyle'>
                    <Link to="/Commands">Commands</Link>
                </li>
            </ul>
        </div>
    );
};
