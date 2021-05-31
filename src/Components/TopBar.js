import React from 'react';
import { X,Square,Minus } from 'react-feather';


const { remote } = window.require('electron');

export default function TopBar() {
    function actionCenter(ACTION) {
        const window = remote.getCurrentWindow();
        if (ACTION === "MINIMIZE") window.minimize();
        else if (ACTION === "CLOSE") window.close();
        else if (ACTION === "MAXIMIZE") {
            window.isMaximized() ? window.unmaximize() : window.maximize();
        }
        return
    }

    return (
        <div id="topbar">
            <button onClick={() => actionCenter("MINIMIZE")} ><Minus size="15" /></button>
            <button onClick={() => actionCenter("MAXIMIZE")} ><Square size="15" /></button>
            <button onClick={() => actionCenter("CLOSE")} ><X size="15" /></button>
        </div>
    )
}