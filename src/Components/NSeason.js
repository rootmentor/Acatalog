import React, { useState } from 'react';
import { ArrowDownCircle, PlayCircle } from 'react-feather';

const { shell } = window.require('electron');

export default function NSeason({ season }) {
    const [show, setShow] = useState(false);

    return (
        <div className="season-card" >
            <div className="drop-down-list-seasons">
                <h3>{season.name}</h3>
                <ArrowDownCircle rotate="90" onClick={() => setShow(prev => !prev)} />
            </div>
            <div className="episodes-list" style={{ maxHeight: show ? '200vh' : 0 }} >
                {season.episodes.map((epi,index) => (
                    <div key={index} className="episode" onClick={() => shell.openPath(epi.epipath)} >
                        <PlayCircle color="red" />
                        <span>{epi.name}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
