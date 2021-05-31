import React, { useContext } from 'react';
import { DATABASE } from '../App';
import TCARD from '../Components/TittleCard';

export default function TvShows() {
    const [data] = useContext(DATABASE);
    return (
        <div className="page-container">
            <br />
            <h2>Tv Shows</h2>
            <div className="grid-container">
                {data.filter(ele => ele.Type === 'series').map((series, index) => <TCARD key={index} title={series} />)}
            </div>
        </div>
    )
}
