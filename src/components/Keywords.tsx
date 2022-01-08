import React, {useEffect, useState} from 'react'

//Redux
import { useDispatch } from 'react-redux'
import { updateKeywords } from '../features/albumSlice'

export default function Keywords() {
    const [keywords, setKeywords] = useState<string[]>([])
    const [inputValue, setInputValue] = useState("")
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(updateKeywords(keywords))
    },[keywords])


    const removeKeyword = (index:number) =>{
        const arrCopy:string[] = []
        for(var i= 0; i<keywords.length; i++){
            if(i != index){
                arrCopy.push(keywords[i])
            }
        }
        setKeywords(arrCopy)
        
    }

    return (
        <div className='col-auto bg-light border border-secondary rounded p-2 mx-3'>
            
                <label htmlFor="floatingInputValue">Write keywords describing your album</label>
                <input type="text" className="form-control" id="floatingInputValue" placeholder="Exciting" value={inputValue} onChange={(e)=>{setInputValue(e.target.value)}} onKeyPress={(e)=>{e.key == "Enter" ? setKeywords(keywords => [...keywords, inputValue]) : null}}/>
            
            <div className='container row cols-2 m-2 p-0'>
                {
                keywords.map((keyword:string, index:number)=>{
                    return(
                        <div className='ms-auto btn-group btn-group-sm border border-secondary container keyword col-5 p-0' key={index}>
                            <button type="button" className="btn disabled no-borders">{keyword}</button>
                            <button type="button" className="btn btn-sm  ms-auto btn-circle p-0"  onClick={()=>removeKeyword(index)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>
                                </svg>      
                            </button>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}
