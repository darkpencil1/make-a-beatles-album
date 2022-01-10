import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import AlbumForm from '../components/AlbumForm'
import Tracks from '../components/Auth'

//Redux
import { RootState } from '../app/store'
import { useSelector } from 'react-redux'

//images 
import img1 from "../assets/img/ipad.png"
import john from "../assets/img/lennon.jpg"
import paul from "../assets/img/mccartney.jpg"
import george from "../assets/img/harrison.jpg"
import ringo from "../assets/img/starr.jpg"

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
