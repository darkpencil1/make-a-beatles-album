import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

//Redux
import { RootState } from "../app/store";
import { useSelector, useDispatch  } from 'react-redux';
import { addSong } from '../features/albumSlice';


export default function SongSelect() {

    const [searchKey, setSearchKey] = useState("")
    const [songList, setSongList] = useState<string[]>()
    const songs = useSelector((state: RootState)=>state.songs.value)
    const dispatch = useDispatch()

    const handleClick = () =>{
        axios.post("http://localhost:5000/api/albums", songs)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    const handleSongClick = (song:string) => {
        dispatch(addSong(song))
        console.log("dispatched a song to store: ", song)
    }

 
    return (
        <div className='col-5 bg-light song-container container-md w-50 border border-secondary rounded p-2 mx-3'>
            <label className=''>Songs</label>
            <ul className="list-group p-0 align-self-start song-menu">
                <li className='no-hover list-group-item'>
                    <input className="form-control" id="myInput" type="text" placeholder="Search.." onChange={(e)=>{setSearchKey(e.target.value)}}></input>
                </li>

                {songs.map((song: string, index: number)=>{
                    
                    //if(songList)
                    //Limit searches based on input text
                    let word = ""
                    for(var i = 0; i< searchKey.length; i++){
                        word += song.charAt(i)
                    }
                    return(
                        
                        word.toUpperCase() == searchKey.toUpperCase() ? 
                        <li className='list-group-item' key={index}><Link className="song" to="" onClick={()=> handleSongClick(song)}>{song}</Link></li>
                        :
                        <></>
                    )
                })}

            </ul>
        
        </div>
           
    )
}
