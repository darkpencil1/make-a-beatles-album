import React from 'react'
import axios from "axios"

//Redux
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../app/store'
import { removeAlbum, addDescription} from '../features/albumSlice'

type Props = {
    description:string
}

export default function SubmitButton(props: Props) {

    const dispatch = useDispatch()

    const handleSubmitClick = () =>{
        dispatch(addDescription(props.description))
        const data = useSelector((state: RootState)=>state.album.value)
        console.log("data from submit: ", data)
        axios.post('http://localhost:5000/api/albums', data)
        .then(res => console.log(res))
        .catch(err => console.log(err))

        dispatch(removeAlbum())

    }

    return (
        <button className='col-md-12 btn btn-lg btn-success web-btn my-4' type='button' onClick={handleSubmitClick}>Submit</button>
    )
}
