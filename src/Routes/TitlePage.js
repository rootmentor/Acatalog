import React, { useContext, useState } from 'react';
import { useParams } from 'react-router';
import { DATABASE } from '../App';
import { File, Heart, PlayCircle } from 'react-feather';
import SEASONS from '../Components/SeriesEpisodes';

const path = window.require('path');
const { shell } = window.require('electron');
const { app } = window.require('@electron/remote');
const Datastore = window.require('nedb');
const inventory = new Datastore({ filename: `${app.getAppPath()}/Datafiles/.inventory` });


export default function TitlePage() {
    const [data, setData] = useContext(DATABASE);
    const { id } = useParams();
    const [index] = useState(() => {
        return data.findIndex(ele => ele._id === id);
    });

    if (index === -1) return <div className="page-container"></div>
    inventory.loadDatabase();
    const title = data[index];

    function tooglefavorites(flag) {
        console.log("Updating");
        console.log(!flag);
        inventory.update({ _id: title._id }, { $set: { isFav: !flag } }, { multi: true }, (err, d) => {
            if (err) return console.log(err);
            setData(prev => {
                prev[index].isFav = !flag;
                return [...prev];
            })
        });
    }

    const imgpath = path.join(app.getAppPath(), "Datafiles", "posters", `${data[index]._id}.jpg`);
    return (
        <div className="page-container">
            <div className="page-info">
                <img src={imgpath} alt="" />
                <div className="page-info-data">
                    <h1>{title.Title}</h1>
                    <span className="year-rated">{title.Year} | {title.Rated} | {title.Type.toUpperCase()}</span>
                    <p>{title.Plot}</p>
                    <span>Imdb : {title.imdbRating}</span>
                    <span>Director: {title.Director} </span>
                    <span>Starring: {title.Actors} </span>
                    <span> Genre: {title.Genre} </span>

                    <div className="video-options">
                        {title.Type === 'movie' && <span onClick={() => shell.openPath(title.filepath)}><PlayCircle color="red" size="35" />Play Now</span>}
                        <span onClick={() => tooglefavorites(data[index].isFav)}><Heart color="red" fill={data[index].isFav ? "red" : "none"} size="35" />Add to favorites</span>
                        <span onClick={() => shell.showItemInFolder(title.filepath)} ><File color="red" size="35" />Open File Location</span>
                    </div>
                </div>
            </div>
            { title.Type === 'series' && <SEASONS folderpath={title.filepath} />}
        </div>
    )
}
