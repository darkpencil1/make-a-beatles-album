import React from 'react'
import {HashLink} from 'react-router-hash-link'
import AlbumMaker from './AlbumMaker'
import Albums from './Albums'


//images
import img1 from "../assets/img/lennonmccartney.jpg"

export default function Home() {
    return (
        <div>
            <header className="masthead" style={{backgroundImage: `url(${img1})`}}>
                <div className="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
                    <div className="d-flex justify-content-center">
                        <div className="text-center">
                            <h1 className="mx-auto my-0 text-uppercase my-title">Make a Beatles album</h1>
                            <h2 className="text-white mx-auto mt-2 mb-5">Combine Beatles members' solo projects into an album.</h2>
                            <HashLink className="btn btn-primary" to="#albummaker">Get Started</HashLink>
                        </div>
                    </div>
                </div>
            </header>
            <AlbumMaker/>
            <Albums/>
        </div>
    )
}
