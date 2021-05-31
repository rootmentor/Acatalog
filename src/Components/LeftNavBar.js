import React from 'react'
import LOGO from '../Images/LOGO.ico';
import { Link, useLocation } from 'react-router-dom';
import { Film, Heart, Home, Search, Settings, Tv } from 'react-feather';

export default function LeftNavBar() {
    const location = useLocation();
    return (
        <nav>
            <div className="brandinfo">
                <img title="Acatlog" src={LOGO} alt="" />
            </div>
            <div className="nav-links">
                <Link className="icon" to="/" title="Home"><Home color={location.pathname === '/' ? 'red' : '#a3a3a3'} /></Link>
                <Link className="icon" to="/movies" title="Movies"><Film color={location.pathname === '/movies' ? 'red' : '#a3a3a3'} /></Link>
                <Link className="icon" to="/tvshows" title="Web Series or tv Shows"><Tv color={location.pathname === '/tvshows' ? 'red' : '#a3a3a3'} /></Link>
                <Link className="icon" to="/favorites" title="Favorites"><Heart color={location.pathname === '/favorites' ? 'red' : '#a3a3a3'} /></Link>
                <Link className="icon" to="/search" title="Search"><Search color={location.pathname === '/search' ? 'red' : '#a3a3a3'} /></Link>
            </div>
            <div className="settings">
                <Link className="icon" to="/settings" title="Settings"><Settings color={location.pathname ==='/settings' ? 'red' : '#a3a3a3'} /></Link>
            </div>
        </nav>
    )
}
