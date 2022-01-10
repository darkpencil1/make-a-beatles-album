import React, {useState, useEffect} from 'react'
import axios from 'axios'

type Album = {
    id: string
    albumName: string,
    songs: string[],
    description: string,
    keywords: string[]
}

export default function Albums() {

    const [albums, setAlbums] = useState<Album[]>([])

    useEffect(() => {
        axios.get("http://localhost:5000/api/albums")
      .then((res) => {
        console.log(res.data.data)
        setAlbums(res.data.data)
      })
      .catch((err)=> console.log(err))

    }, [])
    

    return (
        <div className='bg-light' id='albums'>
            <section className="container p-3">
                <div className="row justify-content-center">
                    <div className="col-md-12 mb-4 mb-lg-5">
                        <div className="col-12">
                            <div className="text-center text-lg-center">
                                <h2>Albums</h2>
                                <p className="text-black-50 mb-0">Here's a collection of all the albums made!</p>
                            </div>
                        </div>
                    </div>
                    {
                        albums.map((album:any, index:number)=>{
                            return(
                                <div className="gx-0 gy-4 mb-5 mb-lg-0 row rounded border border-4 container" key={index} >
                                    <div className='col-md-6'>
                                        {/*keyword container */}
                                        <div className='container row cols-md-2 gy-2'>
                                            
                                            {album.keywords.map((keyword:string, i:number)=>{
                                                return(
                                                    <span className='keyword-in-album col-auto mx-2 text-center' key={i}>{keyword}</span>
                                                )
                                            })}
                                        </div>
                                        {/*description container */}
                                        <div className='rounded border m-2 p-2'>
                                            <label><h5>Description</h5></label>
                                            <p>
                                                {album.description}
                                            </p>
                                        </div>
                                    </div>
                                    {/*album container */}
                                    <div className='col-md-6 col-lg-6 col-sm-12 text-right my-1 align-self-start'>
                                        <ol className='list-group m-3'>
                                            <h4 className="list-group-item albumName mb-0 rounded-top">{album.name}</h4>
                                            {
                                                album.songs.map((song:any, i:number)=>{
                                                    return(
                                                        <div className='list-group-item' key={i}>
                                                            <div className='row'>
                                                                <span className='col-auto me-auto'>{song.name}</span>
                                                                <span className='text-right text-muted col-auto'>{song.artist}</span>
                                                            </div>

                                                        </div>
                                                            
                                                    )
                                                    
                                                })
                                            }
                                        </ol>                                            
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
        </div>
    )
}
