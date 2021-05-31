import React from 'react';
import { Link } from 'react-router-dom';
const path = window.require('path');
const { app } = window.require('@electron/remote');

export default function TittleCard({ title }) {
    const imgpath = 'url("' + path.join(app.getAppPath(), "Datafiles", "posters", `${title._id}.jpg`).replaceAll('\\', '/') + '")';
    // ! Remove url
    return (
        <Link to={`/tittle/${title._id}`} className='tittle-card' style={{ backgroundImage: imgpath }} >
            <div className="tittle-info">
                {/* Name,Year,Pg-Rating,Imdb */}
                <span className="tittle-name">{title.Title}</span>
                <span> {title.Year} ● {title.Rated} </span>
                <span> imdb: {title.imdbRating} </span>
            </div>
        </Link>
    )
}
