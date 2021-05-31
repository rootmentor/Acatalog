import React, { useEffect, useState } from 'react';
import { FolderPlus, Plus, Trash } from 'react-feather';
import { apikey } from '../useInventory';

const Datastore = window.require('nedb');
const { shell } = window.require('electron');
const { app } = window.require('@electron/remote');
const pathmod = window.require('path');
const fs = window.require('fs');

const db = new Datastore({ filename: `${app.getAppPath()}/Datafiles/.folderslist` });

export default function Settings() {
    const [folders, setFolder] = useState([]);
    const [userapi, setuserapi] = useState(() => apikey === "" ? null : apikey);

    function appendPath(e) {
        e.preventDefault();
        const path = pathmod.resolve(e.target.path.value);
        try {
            const dir = fs.statSync(path);
            if (!dir.isDirectory()) return e.target.path.value = e.target.path.value + " - Is not Folder";
            db.insert({ path }, (err) => {
                if (err) return console.log(err);
                setFolder(prev => [{ path }, ...prev]);
            })
        } catch (error) {
            e.target.path.value = e.target.path.value + " - Folder Doesnt Exsists";
            return
        }
    }

    function deletePath(path, i) {
        db.remove({ path }, (err) => {
            if (err) return console.log(err);
            setFolder(prev => {
                prev.splice(i, 1);
                return [...prev];
            })
        });
    }

    useEffect(() => {
        let isSub = true;
        db.loadDatabase();
        db.find({}, (err, data) => {
            if (isSub) setFolder(data);
        })
        return () => {
            isSub = false
        };
    }, [])

    return (
        <div className="page-container">
            <h1>Settings</h1>
            <div className="api-key-info">
                {userapi ? <span> Your Api Key : {userapi} <span onClick={() => setuserapi(null)} className="get-key">edit key</span> </span> : <Apikey setkey={setuserapi} />}
            </div>
            <div className="folder-list">
                <h3>Choose where to look up for Movies and Tv Shows</h3>
                <form onSubmit={appendPath}>
                    <input required type="text" name="path" />
                    <button type="submit"> <FolderPlus color="red" />  </button>
                </form>
                {folders.map((ele, index) => <FolderFile deletePath={() => deletePath(ele.path, index)} key={index} path={ele.path} />)}
            </div>
        </div>
    )
}


function FolderFile({ path, deletePath }) {
    return (
        <div className="folder-name">
            <div>
                <div className="folder-title">
                    {path.split(pathmod.sep)[path.split(pathmod.sep).length - 1]}
                </div>
                <div className="folder-path">{path}</div>
            </div>
            <div onClick={() => deletePath()} ><Trash size="20" /></div>
        </div>
    )
}

function Apikey({ setkey }) {
    function addApikey(e) {
        e.preventDefault();
        const key = e.target.key.value;
        fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${key}`)
            .then(res => res.json())
            .then(res => {
                if (res.Response === "True") {
                    setkey(key);
                    fs.writeFileSync(`${app.getAppPath()}/Datafiles/.USER_API`, key);
                } else {
                    e.target.key.value += "- Seems to be Invaild or Not Activated";
                }
            })
        // check the key else return;
    }


    return (
        <>
            <h3>You will require an OMDB API KEY for fetching Information about Videos.<span onClick={() => shell.openExternal("https://www.omdbapi.com/apikey.aspx")} className="get-key">Get key here</span> </h3>
            <p></p>
            <form onSubmit={addApikey} >
                <input placeholder="Make sure you give correct api key.😄" required type="text" name="key" />
                <button type="submit"><Plus /></button>
            </form>
        </>
    )
}