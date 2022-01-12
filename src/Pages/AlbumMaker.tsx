import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import AlbumForm from '../components/AlbumForm'
import Tracks from '../components/Auth'

//Redux
import { RootState } from '../app/store'
import { useSelector } from 'react-redux'

//images 
import john from "./img/lennon.jpg"
import paul from "./img/mccartney.jpg"
import george from "./img/harrison.jpg"
import ringo from "./img/starr.jpg"

export default function AlbumMaker() {

    const [img, setImg] = useState(john)
    const artist = useSelector((state: RootState)=>state.artist.value.artist)

    useEffect(() => {
        console.log("artist in albummaker:",artist)
        artist === "John" ?
        setImg(john)
        :
        artist === "Paul" ?
        setImg(paul)
        :
        artist === "George" ?
        setImg(george)
        :
        artist === "Ringo" ? 
        setImg(ringo)
        :
        setImg(john)
        console.log("bgartist img is:,", img)
    }, [artist])
    return (
        <section className="container-fluid text-center album-maker border-bottom border-dark border-3 solid p-3" id="albummaker">
            <div className="px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-lg-8">
                        <h2 className="mb-4">Make an album</h2>
                        <p>
                            Choose a band member and then pick a song you think would fit to your Beatles album
                        </p>
                    </div>
                </div>
                <Tracks/>
                
            </div>
        </section>
    )
}
