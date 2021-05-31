import { useState, useEffect } from 'react';

const Datastore = window.require('nedb');
const { app } = window.require('@electron/remote');
const pathmod = window.require('path');
const fs = window.require('fs');

const inventory = new Datastore({ filename: `${app.getAppPath()}/Datafiles/.inventory` });
const db = new Datastore({ filename: `${app.getAppPath()}/Datafiles/.folderslist` });
export const apikey = fs.readFileSync(`${app.getAppPath()}/Datafiles/.USER_API`, 'utf-8');

export default function useInventory() {
    const [data, setData] = useState([]);
    const acceptExt = ['', '.mp4', '.mkv', '.avi'];

    // File format => <tittlename>
    function fetchdetails(tname, filepath, isSub) {
        let ryear = tname.match(/\(\d{4}\)$/g);
        ryear = ryear ? ryear[0].trim().match(/\d+/g)[0] : "";
        tname = tname.replace(/\(\d{4}\)$/g, "").trim();
        fetch(`http://www.omdbapi.com/?&apikey=${apikey}&t=${tname}&y=${ryear}`)
            .then(res => res.json())
            .then(res => {
                if (!res || res?.Response === 'False') return;
                var { Title, Year, Type, Rated, Runtime, Genre, Director, Actors, Plot, Language, Poster, imdbRating } = res;
                Poster = Poster.replace('SX3', 'SX6');
                imdbRating = Number(imdbRating);
                Year = Number(Year);

                fetch(Poster).then(response => response.arrayBuffer()).then(response => {
                    // Appedn Files
                    if (isSub) {
                        inventory.insert({ Title, Year, Type, Rated, Runtime, Genre, Director, Actors, Plot, Language, imdbRating, filepath, isFav: false },
                            (err, newDoc) => {
                                if (err) return;
                                fs.writeFileSync(pathmod.join(app.getAppPath(), "Datafiles", "posters", `${newDoc._id}.jpg`), new Uint8Array(response));
                                setData(prev => [...prev, newDoc]);
                            })
                    }
                });
            })
            .catch(err => {
                console.log(err);
            })
    }


    function fileOfDir(filepath, isSub) {
        const item = pathmod.parse(filepath);
        if (!acceptExt.includes(item.ext)) return;
        inventory.findOne({ filepath }, (err, res) => {
            if (err) return console.log(err);
            if (isSub && res) {
                const filetime = fs.statSync(filepath);
                res.mtime = filetime.mtimeMs;
                setData(prev => [res, ...prev]);
            }
            else fetchdetails(item.name.trim(), filepath, isSub);
        })
    }

    useEffect(() => {
        let isSub = true;
        db.loadDatabase();
        inventory.loadDatabase();
        db.find({}, (err, response) => {
            if (err || response.length === 0 || apikey === "") return window.location.hash = "/settings";
            response.forEach(ele => {
                fs.readdir(ele.path, (err, res) => {
                    res.forEach(r => fileOfDir(pathmod.join(ele.path, r), isSub));
                })
            })
            console.log('Loading Complete');
        })
        return () => isSub = false;
    }, []);

    return [data, setData];
}
