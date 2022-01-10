import React, {useState} from 'react'
import axios from "axios"

//Re-usable components
import AlertModal from './AlertModal'

//Redux
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../app/store'
import { removeAlbum, addDescription} from '../features/albumSlice'

type ModalMessage = {
    messages:string[],
    header:string
}

export default function SubmitButton() {

    const [modalMessage, setModalMessage] = useState<ModalMessage>({messages: [], header: "Please, fill the remaining data"})
   
    const dispatch = useDispatch()
    const data = useSelector((state: RootState)=>state.album.value)

    const handleSubmitClick = () =>{

        //Check if all the data is in place
        /*
        if(data.songs.length < 3){
            setLengthOk(false)
        }
        if(data.albumName == ""){
            setNameOk(false)
        }
        if(data.keywords.length<3){
            setKeywordsOk(false)
        }
        if(data.description == ""){
            setDescOk(false)
        }
        */

        //Send data to server
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
            <button className='w-50 btn btn-success web-btn my-4' type='button' data-bs-toggle="modal" data-bs-target="#alertModal" onClick={handleSubmitClick}>Submit</button>
            <AlertModal messages={modalMessage.messages} header={modalMessage.header}/>
        </div>
    )
}
