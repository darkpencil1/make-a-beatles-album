import React, {useState} from 'react'
import SubmitButton from './SubmitButton'

export default function AlbumDescription() {

    const [description, setDescription] = useState("")

    return (
        <div className='col-8 col-md-8 p-0'>
            <div className='description-container bg-light border border-secondary rounded p-2'>
                <label>Write a short description for your album</label>
                <div className="form-floating">
                    <textarea className="form-control" placeholder="Write a description of the album here" id="floatingTextarea" onChange={(e)=>setDescription(e.target.value)}></textarea>
                    <label htmlFor="floatingTextarea">Description</label>
                </div>
            </div>
            <SubmitButton description={description}/>
        </div>
     
    )
}
