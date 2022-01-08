import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Buffer } from 'buffer';

//Redux
import { useDispatch } from 'react-redux';
import { changeSongs } from '../features/songSlice';
import { useSelector } from 'react-redux';
import { RootState } from "../app/store";

//Re-usable components
import SongSelect from './SongSelect';
import { changeArtist } from '../features/artistSlice';
import AlbumTemplate from './AlbumTemplate';
import { addSong} from '../features/albumSlice';
import { removeSelectedSongs } from '../features/songSlice';

//images
import lennon from "../assets/img/lennon-profile.png"
import mccartney from "../assets/img/mccartney-profile.png"
import harrison from "../assets/img/harrison-profile.png"
import starr from "../assets/img/starr-profile.png"
import AlbumDescription from './AlbumDescription';
import Keywords from './Keywords';



const Tracks = () => {

	//Tracks
	const [johnTracks, setJohnTracks] = useState<string[]>([]);
	const [paulTracks, setPaulTracks] = useState<string[]>([]);
	const [georgeTracks, setGeorgeTracks] = useState<string[]>([]);
	const [ringoTracks, setRingoTracks] = useState<string[]>([]);

	//redux
	const dispatch = useDispatch();
	const artistStore = useSelector((state: RootState)=>state.artist.value.artist)

	useEffect(()=>{

		// Api call for retrieving tracks
		axios.get("http://localhost:5000/api/tracks")
		.then((res) => {
			console.log(res.data.data)
			setJohnTracks(res.data.data.john)
			setPaulTracks(res.data.data.paul)
			setGeorgeTracks(res.data.data.george)
			setRingoTracks(res.data.data.ringo)
		})
		.catch((err)=> console.log(err))


	},[])



	
	const sentTracks = (activeTracks:string[]) =>{
		try{
			dispatch(removeSelectedSongs())
			dispatch(changeSongs(activeTracks))

		}catch(err){
			console.log("Tracks not ready yet!")
		}
	}
	

	return(
		<div className='row row-cols-md-2 row-cols-sm-1 row-cols-lg-2 gy-4 justify-content-center bg-light border border-secondary rounded'>
			<div className='col-12'>
				<button className='col-3 profile-img-parent mx-4 my-2 p-0'>
					<img className='profile-img p-1' src={lennon} onClick={()=>sentTracks(johnTracks)}></img>
				</button>
				<button className='col-3 profile-img-parent mx-4 my-2 p-0'>
					<img className='profile-img p-1' src={mccartney} onClick={()=>sentTracks(paulTracks)}></img>
				</button>
				<button className='col-3 profile-img-parent mx-4 my-2 p-0'>
					<img className='profile-img p-1' src={harrison} onClick={()=>sentTracks(georgeTracks)}></img>
				</button>
				<button className='col-3 profile-img-parent mx-4 my-2 p-0'>
					<img className='profile-img p-1' src={starr} onClick={()=>sentTracks(ringoTracks)}></img>  
				</button>
        	 </div>
			<SongSelect />
			<AlbumTemplate/>
			<Keywords/>
			<AlbumDescription/>

		</div>

	)
}


export default Tracks;