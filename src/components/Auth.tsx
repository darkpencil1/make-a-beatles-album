import React, { useEffect, useState} from 'react';
import axios from 'axios';

//Redux
import { useDispatch } from 'react-redux';
import { changeSongs } from '../features/songSlice';
import { removeSelectedSongs} from '../features/songSlice';
import { changeArtist } from '../features/artistSlice';

//Re-usable components
import SongSelect from './SongSelect';
import AlbumTemplate from './AlbumTemplate';
import AlbumDescription from './AlbumDescription';
import Keywords from './Keywords';
import SubmitButton from './SubmitButton';

//images
import lennon from "../assets/img/lennonprofile.png"
import mccartney from "../assets/img/mccartney-profile.png"
import harrison from "../assets/img/harrison-profile.png"
import starr from "../assets/img/starr-profile.png"




const Tracks = () => {

	//Tracks
	const [johnTracks, setJohnTracks] = useState<string[]>([]);
	const [paulTracks, setPaulTracks] = useState<string[]>([]);
	const [georgeTracks, setGeorgeTracks] = useState<string[]>([]);
	const [ringoTracks, setRingoTracks] = useState<string[]>([]);

	//redux
	const dispatch = useDispatch();

	useEffect(()=>{
		let serverUrl = "http://localhost:5000/api/tracks"
		//Assign server url based on development mode
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            serverUrl = "http://localhost:5000/api/tracks"
		
		} else {
           serverUrl = "https://make-a-beatles-album.herokuapp.com/api/tracks"
		}
		// Api call for retrieving tracks
		axios.get(serverUrl)
		.then((res) => {
			console.log("serverUrl:", serverUrl)
			console.log("res:", res, "res.data.data:", res.data.data)
			if(res.data.data != undefined){
				setJohnTracks(res.data.data.john)
				setPaulTracks(res.data.data.paul)
				setGeorgeTracks(res.data.data.george)
				setRingoTracks(res.data.data.ringo)
			}
		})
		.catch((err)=> console.log(err))

	},[])

	const sentTracks = (activeTracks:string[], artist:string) =>{
		try{
			dispatch(removeSelectedSongs())
			dispatch(changeArtist(artist))
			dispatch(changeSongs(activeTracks))

		}catch(err){
			console.log("Tracks not ready yet!")
		}
	}

	return(
		<div className='row gy-4 justify-content-around bg-light border border-secondary rounded m-3'>
			<div className='col-12'>
				<button className='col-3 profile-img-parent mx-4 my-2 p-0'>
					<img className='profile-img p-1' src={lennon} alt='' onClick={()=>sentTracks(johnTracks, "Lennon")}></img>
				</button>
				<button className='col-3 profile-img-parent mx-4 my-2 p-0'>
					<img className='profile-img p-1' src={mccartney} alt='' onClick={()=>sentTracks(paulTracks, "McCartney")}></img>
				</button>
				<button className='col-3 profile-img-parent mx-4 my-2 p-0'>
					<img className='profile-img p-1' src={harrison} alt='' onClick={()=>sentTracks(georgeTracks, "Harrison")}></img>
				</button>
				<button className='col-3 profile-img-parent mx-4 my-2 p-0'>
					<img className='profile-img p-1' src={starr} alt='' onClick={()=>sentTracks(ringoTracks, "Starr")}></img>  
				</button>
        	 </div>

			<SongSelect />
			<AlbumTemplate/>
			<div className="w-100">

			</div>
			<Keywords/>
			<AlbumDescription/>
			<SubmitButton/>

		</div>

	)
}


export default Tracks;