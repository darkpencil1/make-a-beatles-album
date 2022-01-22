import React from 'react'
import Tracks from '../components/Auth'


export default function AlbumMaker() {

    return (
        <section className="container-fluid text-center album-maker border-bottom border-dark border-3 solid p-3" id="albummaker">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-lg-8">
                        <h2 className="mb-4">Make an album</h2>
                        <p>
                            Choose a band member and then pick a song you think would fit to your Beatles album
                        </p>
                    </div>
                </div>
                <Tracks/>
        </section>
    )
}
