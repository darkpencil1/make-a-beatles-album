import React from 'react'
import { Link } from 'react-router-dom'
import SongSelect from './SongSelect'
import { useDispatch } from 'react-redux'
import {changeArtist} from '../features/artistSlice'
import AlbumTemplate from './AlbumTemplate'




export default function AlbumForm() {

    const dispatch = useDispatch()

    return (
        <div>

            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    Band member
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><Link className="dropdown-item" to="#" onClick={()=>{dispatch(changeArtist("John"))}}>John</Link></li>
                    <li><Link className="dropdown-item" to="#" onClick={()=>{dispatch(changeArtist("George"))}}>George</Link></li>
                    <li><Link className="dropdown-item" to="#" onClick={()=>{dispatch(changeArtist("Ringo"))}}>Ringo</Link></li>
                    <li><Link className="dropdown-item" to="#" onClick={()=>{dispatch(changeArtist("Paul"))}}>Paul</Link></li>
                </ul>
            </div>
            <SongSelect />
            <AlbumTemplate />
        </div>
    )
}
