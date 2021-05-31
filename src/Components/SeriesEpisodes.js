import React, { useEffect, useState } from 'react';
import NSEASON from './NSeason';

const path = window.require('path');
const fs = window.require('fs');

export default function SeriesEpisodes({ folderpath }) {
    const [seasons, setSeasons] = useState([]);

    useEffect(() => {
        const acceptedVideos = ['.mp4', '.mkv', '.avi'];
        fs.readdir(folderpath, (err, seasons) => {
            if (err) return;
            seasons.forEach(season => {
                if (path.parse(season).ext !== "") return;
                fs.readdir(path.join(folderpath, season), (err, episodes) => {
                    let mainepisodes = episodes.filter(epi => acceptedVideos.includes(path.parse(epi).ext));
                    mainepisodes = mainepisodes.map(epi => {
                        return { epipath: path.join(folderpath, season, epi), name: path.parse(epi).name }
                    })
                    setSeasons(prev => [{ name: season, episodes: mainepisodes }, ...prev]);
                })
            })
        })
    }, []);

    return (
        <div className="seasons-container">
            { seasons.map((season,index) => <NSEASON key={index} season={season} /> ) }
        </div>
    )
}
