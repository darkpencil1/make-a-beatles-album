import React from 'react'
import axios from "axios"

//Redux
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../app/store'
import { removeAlbum, addDescription} from '../features/albumSlice'



export default function SubmitButton() {

    const dispatch = useDispatch()
    const data = useSelector((state: RootState)=>state.album.value)

    const handleSubmitClick = () =>{
        console.log("data from submit: ", data)
        axios.post('http://localhost:5000/api/albums',{
            songs: data.songs,
            albumName: data.albumName,
            keywords: data.keywords,
            description: data.description,

        })
        .then(res => console.log(res))
        .catch(err => console.log(err))

        dispatch(removeAlbum())

    }

    return (
        <div className='col-12'>
            <button className='w-50 btn btn-success web-btn my-4' type='button' onClick={handleSubmitClick}>Submit</button>
        </div>
    )
}
