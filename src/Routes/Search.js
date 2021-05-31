import React, { useContext, useEffect, useState } from 'react';
import { DATABASE } from '../App';
import TCARD from '../Components/TittleCard';

export default function Search() {
    const [data] = useContext(DATABASE);
    const [search, setSearch] = useState('');
    const [res, setRes] = useState([]);

    useEffect(() => {
        if (search === "") return setRes([]);
        setRes(() => {
            return [...data.filter(ele => {
                try {
                    if (ele.Title.toLowerCase().includes(search)) return true;
                    if (ele.Year.toString() === search) return true;
                    if (ele.Director.toLowerCase().includes(search)) return true;
                    if (ele.Actors.toLowerCase().includes(search)) return true;
                    if (ele.Genre.toLowerCase().includes(search)) return true;
                    return false;
                } catch (error) {
                    return false;
                }
            })]
        })
    }, [search]);

    return (
        <div className="page-container">
            <input placeholder="Start your Search" type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="search-bar" />
            <div className="grid-container">
                {res.map(item => <TCARD key={item._id} title={item} />)}
            </div>
        </div>
    )
}
