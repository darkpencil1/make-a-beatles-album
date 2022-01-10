import React, {useState} from 'react'

//redux
import { useDispatch } from 'react-redux'
import { addDescription } from '../features/albumSlice'



export default function AlbumDescription() {

    const [description, setDescription] = useState("")
    const dispatch = useDispatch()

    const sendDescription = (desc:string) =>{
        dispatch(addDescription(desc))
    }

    return (
        <div className='col col-xs-12 p-0 mx-2'>
            <div className='description-container bg-light border border-secondary rounded p-2'>
                <label>Write a short description for your album</label>
                <div className="form-floating">
                    <textarea className="form-control description py-1" placeholder="Write a description of the album here" id="floatingTextarea" onChange={(e)=>sendDescription(e.target.value)}></textarea>
                </div>
            </div>
        </div>
     
    )
}
