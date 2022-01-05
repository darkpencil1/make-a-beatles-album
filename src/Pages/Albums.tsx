import React, {useState, useEffect} from 'react'
import axios from 'axios'

//images
import lennon from "../assets/img/lennon.jpg"

type Album = {
    id: string
    name: string,
    songs: string[],
}

type AlbumCollection = {
    albums: Album[],
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
    

    const getRandomColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }  

      console.log("ALBUMS ?: ", albums)
    return (
        <div className='bg-light' id='albums'>
            <section className="container">
                <div className="row m-0 justify-content-center">
                    <div className="col-md-12 mb-4 mb-lg-5">
                        <div className="col-12 my-5">
                            <div className="text-center text-lg-center">
                                <h2>Albums</h2>
                                <p className="text-black-50 mb-0">Here's a collection of all the albums made!</p>
                            </div>
                        </div>
                    </div>
                    {
                        albums.map((album:any, index:number)=>{
                            return(
                                <div className="gx-0 gy-4 mb-5 mb-lg-0 row rounded border border-4" key={index} >
                                    <div className='col-md-6'>
                                        <img src={lennon} className="albumImage m-3 border border-2" ></img>
                                    </div>
                                    <div className='col-md-6 col-lg-6 col-sm-12 text-right'>
                                        <ol className='list-group m-3'>
                                            <h4 className="list-group-item w-100 albumName rounded-top">{album.name}</h4>
                                            {
                                                album.songs.map((song:string[], i:number)=>{
                                                    return(
                                                            <li className="mb-0 list-group-item" key={i}>{song}</li>
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
