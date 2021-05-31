import React, { useContext } from 'react';
import { DATABASE } from '../App';
import TCARD from '../Components/TittleCard';

export default function Favorites() {
    const [data] = useContext(DATABASE);
    return (
        <div className="page-container">
            <br />
            <h2>Favorites</h2>
            <div className="grid-container">
                {data.filter(ele => ele.isFav).map((favs, index) => <TCARD key={index} title={favs} />)}
            </div>
        </div>
    )
}
