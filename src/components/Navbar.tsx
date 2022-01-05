import React from 'react'
import { Route, Routes} from 'react-router'
import {NavLink ,Link} from 'react-router-dom'
import { NavHashLink } from 'react-router-hash-link'

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
            <div className="container px-4 px-lg-5">
                <NavHashLink className="navbar-brand nav-title" to="#">Make a Beatles album</NavHashLink>
                <button className="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i className="fas fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ms-auto=">
                        <li className="nav-item"><NavHashLink className="nav-link pull-right" to="#albummaker">Maker</NavHashLink></li>
                        <li className="nav-item"><NavHashLink className="nav-link pull-right" to="#albums">Albums</NavHashLink></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
