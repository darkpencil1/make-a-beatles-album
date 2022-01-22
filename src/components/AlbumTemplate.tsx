import React, { useState } from 'react'
import axios from "axios"

//Redux
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../app/store'
import { removeSong, moveSongDown, moveSongUp, changeAlbumName } from '../features/albumSlice'





export default function AlbumTemplate() {

    const [albumName, setAlbumName] = useState('')
    const [songIndex, setSongIndex] = useState<number>(0)
    const [listClass, setListClass] = useState('list-group-item list-group-item-action')
    const selected = useSelector((state: RootState)=>state.album.value)
    const dispatch = useDispatch()
    
  

    const handleMoveClick = (moveFunction: Function, mover:number) => {
        dispatch(moveFunction(songIndex))
        setSongIndex(songIndex + mover)
    }

    return (
        <div className='col-lg-5 col-sm-10 col-11 albumContainer container-md border border-secondary rounded p-2 mx-3'>
            <label className="form-label">Album name</label>
            <input className="form-control" type='text' placeholder="Your cool name for a Beatles album" onChange={(e)=>{dispatch(changeAlbumName(e.target.value))}}></input>
            <ol className='list-group'>
                {
                    selected.songs.map((song, index)=>{
                       if(index == songIndex){
                           return(
                               <button type="button" className="list-group-item list-group-item-action active" key= {index} onClick={()=>{setSongIndex(index)}}>
                                   <div className='row'>
                                       <span className='col-auto me-auto'>{song.name}</span>
                                       <span className='text-right text-muted col-auto'>{song.artist}</span>
                                   </div>
                               </button>
                              
                              )

                       }else{
                        return(
                            <button type="button" className="list-group-item list-group-item-action" key= {index} onClick={()=>{setSongIndex(index)}}>
                                <div className='row'>
                                    <span className='col-auto me-auto'>{song.name}</span>
                                    <span className='text-right text-muted col-auto'>{song.artist}</span>
                                </div>
                            </button>
                           
                           )
                       }
                        
                     }      
                    )}
            </ol>
            <div className='btn-group ms-auto my-2'>
                <button type="button" className="btn btn-sm btn-outline-secondary p-1" onClick={()=>{handleMoveClick(moveSongUp,-1)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"></path>
                    </svg>
                    <span className="visually-hidden">Button</span>
                </button>
                <button type="button" className="btn btn-sm btn-outline-secondary p-1" onClick={()=>{handleMoveClick(moveSongDown,1)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"></path>
                    </svg>
                    <span className="visually-hidden">Button</span>
                </button>
                <button type="button" className="btn btn-sm btn-danger p-1"  onClick={()=>{dispatch(removeSong(songIndex))}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"></path>
                    <path fillRule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"></path>
                    </svg>
                </button>
            </div>
        </div>
    )
}
