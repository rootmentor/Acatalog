import React, { useContext } from 'react'
import { DATABASE } from '../App';
import TCARD from '../Components/TittleCard';

export default function Movies() {
    const [data] = useContext(DATABASE);


    return (
        <div className="page-container">
            <br />
            <h2>Movies</h2>
            <div className="grid-container">
                {data.filter(ele => ele.Type === 'movie').map((movie, index) => <TCARD key={index} title={movie} />)}
            </div>
        </div>
    )
}
