import React from 'react'
import { Link } from 'react-router-dom'

export default function HomeHeader() {
    return (
        <header className="masthead">
            <div className="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
                <div className="d-flex justify-content-center">
                    <div className="text-center">
                        <h1 className="mx-auto my-0 text-uppercase page-title">Make a Beatles album</h1>
                        <h2 className="text-white-50 mx-auto mt-2 mb-5">Combine Beatles members' solo projects into an album.</h2>
                        <Link className="btn btn-primary" to="#about">Get Started</Link>
                    </div>
                </div>
            </div>
        </header>
    )
}
