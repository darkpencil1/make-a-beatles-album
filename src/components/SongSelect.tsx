import React, { useState } from 'react'

//Redux
import { RootState } from "../app/store";
import { useSelector, useDispatch  } from 'react-redux';
import { addSong } from '../features/albumSlice';


export default function SongSelect() {

    const [searchKey, setSearchKey] = useState("")
    const songs = useSelector((state: RootState)=>state.songs.value)
    const selectedArtist = useSelector((state: RootState)=>state.artist.value)
    const dispatch = useDispatch()

    const handleSongClick = (song:string) => {
        dispatch(addSong({name: song, artist: selectedArtist}))
        console.log("dispatched a song to store: ", song)
    }

 
    return (
        <div className='col-12 col-md-5 bg-light song-container container-md w-50 border border-secondary rounded p-2 mx-3'>
            <label>Songs</label>
            <input className="form-control" id="myInput" type="text" placeholder="Search.." onChange={(e)=>{setSearchKey(e.target.value)}}></input>
            <ul className="list-group p-0 align-self-start song-menu">
                {
                    songs != undefined || songs != [] ? 
                    songs.map((song: string, index: number)=>{
                        //Limit searches based on input text
                        let word = ""
                        for(var i = 0; i< searchKey.length; i++){
                            word += song.charAt(i)
                        }
                        return(
                            //Check if song has already been added
                            songs.indexOf(song) < index ?
                            <></> :
                            word.toUpperCase() == searchKey.toUpperCase() ? 
                            <li className='list-group-item' key={index} onClick={()=> handleSongClick(song)}>{song}</li>
                            :
                            <></>
                        )
                    })
                    :
                    <></>
                }

            </ul>
        </div>
           
    )
}
