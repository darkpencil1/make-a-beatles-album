import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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

const Tracks = () => {

	// Set up states for retrieving access token and top tracks
	const [token, setToken] = useState('');
	const [word, setWord] = useState('');
	const [tracks, setTracks] = useState<string[]>([]);
    const [albums, setAlbums] = useState<string[]>([]);

    const [selectedTracks, setSelectedTracks] = useState<string[]>([]);
	//Albums
	const [johnAlbums, setJohnAlbums] = useState<string[]>([]);
	const [paulAlbums, setPaulAlbums] = useState<string[]>([]);
	const [georgeAlbums, setGeorgeAlbums] = useState<string[]>([]);
	const [ringoAlbums, setRingoAlbums] = useState<string[]>([]);
	//Tracks
	const [johnTracks, setJohnTracks] = useState<string[]>([]);
	const [paulTracks, setPaulTracks] = useState<string[]>([]);
	const [georgeTracks, setGeorgeTracks] = useState<string[]>([]);
	const [ringoTracks, setRingoTracks] = useState<string[]>([]);

	const [loading, setLoading] = useState(false);
	const [loadingSongs, setLoadingSongs] = useState(false);

	//redux
	const dispatch = useDispatch();
	const artistStore = useSelector((state: RootState)=>state.artist.value.artist)

	// Artist ID from Spotify
    const george = '7FIoB5PHdrMZVC3q2HE5MS'
	const john = "4x1nvY2FN8jxqAFA0DA02H"
	const paul = '4STHEaNw4mPZ2tzheohgXB'
	const ringo = '6DbJi8AcN5ANdtvJcwBSw8'
	const artists = [george, john, paul, ringo]
	

    
	useEffect(()=>{

		// Api call for retrieving token
		axios('https://accounts.spotify.com/api/token', {
			'method': 'POST',
			'headers': {
					'Content-Type':'application/x-www-form-urlencoded',
					'Authorization': 'Basic ' + btoa('e2f35e74a7424593b88a3ed41ebf40f5' + ':' + 'd6e84de876824e2c9d80990a78809068'),
			},
			'data': 'grant_type=client_credentials'
		}).then(tokenresponse => {
			console.log(tokenresponse.data.access_token);
			setToken(tokenresponse.data.access_token);
			axios(`https://api.spotify.com/v1/artists/${artists}/albums`,{
			'method': 'GET',
			'headers': {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': 'Bearer ' + tokenresponse.data.access_token
			}
			})
			.then(albumresponse=> {
				//Currently you're not emptying the albums or tracks array-> causes overflow of data
				
				const albumHolder:string[] = [];
				
				for(var index=0; index< albumresponse.data.items.length; index++){
					albumHolder.push(albumresponse.data.items[index].id)
					//setAlbums(albums => [...albums, albumresponse.data.items[i].id]);
				}

					setJohnAlbums(albumHolder)
					fillSongs(johnAlbums, john)
					console.log("johnTracks: ", johnTracks)
			
				//setAlbums(albumHolder);
				//requires time to set the albums!
				//console.log("albums:", albums, " tracks:", tracks)
			})
			.catch(error=> console.log(error))
		
		
		}).catch(error=> console.log(error))


	/*
		if(loading){
			console.log("albums updated! albums: ", albums)
			//fillSongs();
			setLoading(false)
		}
		if(loadingSongs){
			console.log("Tracks before being sent to redux store: ", tracks)
			dispatch(changeSongs(tracks))
			setTracks([])
			setLoadingSongs(false)
		}*/


	},[])

	//Promise function does something and when it's ready it executes something with .then
	//axios -> add +1 

	//To get all tracks from Spotify API you need to first get all the albums and then, get tracks from the albums
	const getAlbums = (artist: string, artistName: string) =>{

		//Get albums of spesific artist
		axios(`https://api.spotify.com/v1/artists/${artist}/albums`,{
		'method': 'GET',
		'headers': {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Authorization': 'Bearer ' + token
		}
		})
		.then(albumresponse=> {
			console.log(albumresponse.data.items);
			//Currently you're not emptying the albums or tracks array-> causes overflow of data
			const albumHolder:string[] = [];
			
			for(var i=0; i< albumresponse.data.items.length; i++){
				albumHolder.push(albumresponse.data.items[i].id)
				//setAlbums(albums => [...albums, albumresponse.data.items[i].id]);
			}
			setAlbums(albumHolder);
			//requires time to set the albums!
			console.log("albums:", albums, " tracks:", tracks)
		})
		.catch(error=> console.log(error))
		setLoading(true);
		//fillSongs();
	
	}

	const fillSongs = (albums:string[], artist:string) =>{
		
		var trackHolder:string[] = [];
		console.log("albums.length from fillSongs:", albums.length)

		if(artist==john){
			for(var i = 0; i<albums.length; i++){
				console.log("i from top of for loop: ", i)
				axios(`https://api.spotify.com/v1/albums/${albums[i]}/tracks`,{
						'method': 'GET',
						'headers': {
							'Content-Type': 'application/json',
							'Accept': 'application/json',
							'Authorization': 'Bearer ' + token
						}
					})
					.then(trackresponse=> {
						console.log("tracks from an album: ", trackresponse.data.items);
						//Loop to get name of each track from an album
						for(var a=0; a< trackresponse.data.items.length; a++){
							//trackHolder.push(trackresponse.data.items[i].name)
							console.log("track name from trackres: ", trackresponse.data.items[a].name)
							setJohnTracks(johnTracks => [...johnTracks, trackresponse.data.items[a].name])
						}
						
					})
					.catch(error=> console.log(error))	
			}
			setLoadingSongs(true);
		}else if(artist==george){
			for(var i = 0; i<albums.length; i++){
				console.log("i from top of for loop: ", i)
				axios(`https://api.spotify.com/v1/albums/${albums[i]}/tracks`,{
						'method': 'GET',
						'headers': {
							'Content-Type': 'application/json',
							'Accept': 'application/json',
							'Authorization': 'Bearer ' + token
						}
					})
					.then(trackresponse=> {
						console.log("tracks from an album: ", trackresponse.data.items);
						//Loop to get name of each track from an album
						for(var a=0; a< trackresponse.data.items.length; a++){
							//trackHolder.push(trackresponse.data.items[i].name)
							console.log("track name from trackres: ", trackresponse.data.items[a].name)
							setGeorgeTracks(georgeTracks => [...georgeTracks, trackresponse.data.items[a].name])
						}
						
					})
					.catch(error=> console.log(error))	
			}
			setLoadingSongs(true);
		}else if(artist==paul){
			for(var i = 0; i<albums.length; i++){
				console.log("i from top of for loop: ", i)
				axios(`https://api.spotify.com/v1/albums/${albums[i]}/tracks`,{
						'method': 'GET',
						'headers': {
							'Content-Type': 'application/json',
							'Accept': 'application/json',
							'Authorization': 'Bearer ' + token
						}
					})
					.then(trackresponse=> {
						console.log("tracks from an album: ", trackresponse.data.items);
						//Loop to get name of each track from an album
						for(var a=0; a< trackresponse.data.items.length; a++){
							//trackHolder.push(trackresponse.data.items[i].name)
							console.log("track name from trackres: ", trackresponse.data.items[a].name)
							setPaulTracks(paulTracks => [...paulTracks, trackresponse.data.items[a].name])
						}
						
					})
					.catch(error=> console.log(error))	
			}
			setLoadingSongs(true);
		}else if(artist==ringo){
			for(var i = 0; i<albums.length; i++){
				console.log("i from top of for loop: ", i)
				axios(`https://api.spotify.com/v1/albums/${albums[i]}/tracks`,{
						'method': 'GET',
						'headers': {
							'Content-Type': 'application/json',
							'Accept': 'application/json',
							'Authorization': 'Bearer ' + token
						}
					})
					.then(trackresponse=> {
						console.log("tracks from an album: ", trackresponse.data.items);
						//Loop to get name of each track from an album
						for(var a=0; a< trackresponse.data.items.length; a++){
							//trackHolder.push(trackresponse.data.items[i].name)
							console.log("track name from trackres: ", trackresponse.data.items[a].name)
							setRingoTracks(ringoTracks => [...ringoTracks, trackresponse.data.items[a].name])
						}
						
					})
					.catch(error=> console.log(error))	
			}
			setLoadingSongs(true);
		}
		
		
	}

	
	const songLoop = (setter:Function)=>{
		for(var i = 0; i<albums.length; i++){
			console.log("i from top of for loop: ", i)
			axios(`https://api.spotify.com/v1/albums/${albums[i]}/tracks`,{
					'method': 'GET',
					'headers': {
						'Content-Type': 'application/json',
						'Accept': 'application/json',
						'Authorization': 'Bearer ' + token
					}
				})
				.then(trackresponse=> {
					console.log("tracks from an album: ", trackresponse.data.items);
					//Loop to get name of each track from an album
					for(var a=0; a< trackresponse.data.items.length; a++){
						//trackHolder.push(trackresponse.data.items[i].name)
						console.log("track name from trackres: ", trackresponse.data.items[a].name)
						setter()
						setJohnTracks(johnTracks => [...johnTracks, trackresponse.data.items[a].name])
					}
					
				})
				.catch(error=> console.log(error))	
		}
		setLoadingSongs(true);
	}

	const sentTracks = (tracks:string[]) =>{
		dispatch(removeSelectedSongs())
		dispatch(changeSongs(tracks))
	}
	

	return(
		<div className='row gy-4'>
			<div className='col-12'>
				<button className='col-3 profile-img-parent mx-4 p-0'>
					<img className='profile-img p-1' src={lennon} onClick={()=>sentTracks(johnTracks)}></img>
				</button>
				<button className='col-3 profile-img-parent mx-4 p-0'>
					<img className='profile-img p-1' src={mccartney} onClick={()=>sentTracks(georgeTracks)}></img>
				</button>
				<button className='col-3 profile-img-parent mx-4 p-0'>
					<img className='profile-img p-1' src={harrison} onClick={()=>sentTracks(ringoTracks)}></img>
				</button>
				<button className='col-3 profile-img-parent mx-4 p-0'>
					<img className='profile-img p-1' src={starr} onClick={()=>sentTracks(paulTracks)}></img>  
				</button>
        	 </div>
			<SongSelect />
			<AlbumTemplate/>
		</div>

	)
}


export default Tracks;