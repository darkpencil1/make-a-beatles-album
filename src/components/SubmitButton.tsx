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

type ModalMessages = {
    
}

export default function SubmitButton() {

    const [modalMessage, setModalMessage] = useState<ModalMessage>({messages: [], header: "Please, fill the remaining data"})
   
    const dispatch = useDispatch()
    const data = useSelector((state: RootState)=>state.album.value)

    const handleSubmitClick = () =>{

        let serverUrl = "http://localhost:5000/api/albums"
        setModalMessage({messages: [], header: modalMessage.header})
        var messagesArray:string[] = []
        let submit = true

        //Assign server url based on development mode
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            serverUrl = "http://localhost:5000/api/albums"
		
		} else {
           serverUrl = "https://make-a-beatles-album.herokuapp.com/api/albums"
		}
        //Check if all the data is in place
        
        if(data.songs.length < 3){
            messagesArray.push("Please enter at least 3 songs.")
            submit = false
        }
        if(data.albumName == ""){
            messagesArray.push("Please enter an album name.")
            submit = false
        }
        if(data.keywords.length<3){
            messagesArray.push("Please enter at least 3 keywords.")
            submit = false
        }
        if(data.description == ""){
            messagesArray.push("Please enter a description.")
            submit = false
        }
        setModalMessage({messages: messagesArray, header: modalMessage.header})

        if(submit){
            console.log("Submitting.")
            //Send data to server
            axios.post(serverUrl,{
                songs: data.songs,
                albumName: data.albumName,
                keywords: data.keywords,
                description: data.description,
    
            })
            .then(res => console.log("res:", res))
            .catch(err => console.log(err))
    
            dispatch(removeAlbum())
            
        }

        
        
    }

    return (
        <div className='col-12'>
            <button className='btn btn-success web-btn my-4' type='button' data-bs-toggle="modal" data-bs-target="#alertModal" onClick={handleSubmitClick}>Submit</button>
            <AlertModal messages={modalMessage.messages} header={modalMessage.header}/>
        </div>
    )
}
