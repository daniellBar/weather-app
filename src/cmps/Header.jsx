import React from "react";
import { NavLink } from "react-router-dom";
import { SearchBox } from '../cmps/SearchBox'


export function Header(props) {
    const isHomepage=props.isHomepage
    return <div className="main-header">
        <div className="top">
            <div className="navs">
                <NavLink className="btn" to="/">home</NavLink>
                <NavLink className="btn" to="/favorites/">favorites</NavLink>
            </div>
        </div>
        <div className="bottom">
            <SearchBox isHomepage={isHomepage}/>
        </div>

    </div>
}