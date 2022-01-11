import React from 'react'

type Props= {
    messages:string[]
    header:string
}

export default function AlertModal(props:Props) {
    var tabIndex:number = 1
    return (
        <div className="modal fade" id="alertModal" tabIndex={tabIndex} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Info</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <ul>
                       
                        {   props.messages.length == 0 ?
                            <li>
                                Your album has been submitted. Thank you!
                            </li>
                            :
                            props.messages.map((message:string, index:number)=>{
                                return(
                                    props.messages.indexOf(message) < index 
                                ?
                                
                                    <>
                                    
                                    </>
                                
                                :
                                
                                    <li key={index}>
                                        {message}
                                    </li>
                                
                            )
                        })
                    }

                    </ul>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>
    )
}
