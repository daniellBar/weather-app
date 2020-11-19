import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { SearchBox } from '../cmps/SearchBox'


export function Header() {
    return <div className="">
        <div className="top">
            <div className="navs">
                <NavLink className="btn" to="/">home</NavLink>
                <NavLink className="btn" to="/favorites/">favorites</NavLink>
            </div>
        </div>
        <div className="bottom">
            <SearchBox />
        </div>

    </div>
}