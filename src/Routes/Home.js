import React, { useContext } from 'react';
import { DATABASE } from '../App';
import CARDSLIDER from '../Components/CardSlider';

export default function Home() {
    const [data] = useContext(DATABASE);

    return (
        <div className="page-container">
            <div className="cards-category">
                <h3>Random Picks</h3>
                <CARDSLIDER tittles={[...data].sort((a, b) => Math.random() < .5 ? 1 : -1).slice(0, 6)} />
            </div>
            <div className="cards-category">
                <h3>Top Movies</h3>
                <CARDSLIDER tittles={[...data].filter(ele => ele.Type === 'movie').sort((a, b) => b.imdbRating - a.imdbRating).slice(0, 8)} />
            </div>
            <div className="cards-category">
                <h3>Top Tv Shows</h3>
                <CARDSLIDER tittles={[...data].filter(ele => ele.Type === 'series').sort((a, b) => b.imdbRating - a.imdbRating).slice(0, 8)} />
            </div>
        </div>
    )
}
