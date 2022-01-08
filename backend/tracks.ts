/*const axios = require('axios')

const harrison = '7FIoB5PHdrMZVC3q2HE5MS'
const lennon = "4x1nvY2FN8jxqAFA0DA02H"
const mccartney = '4STHEaNw4mPZ2tzheohgXB'
const starr = '6DbJi8AcN5ANdtvJcwBSw8'
const artists = [lennon, mccartney, harrison, starr]

type Album = {
    album: string[]
}

type AlbumCollection={
    john:string[],
    paul: string[],
    george: string[],
    ringo: string[]
}

type TrackCollection={
    john:string[],
    paul: string[],
    george: string[],
    ringo: string[]
    
}
var albumCollection:AlbumCollection = {john:[""], paul:[""], george:[""], ringo:[""]}
var trackCollection:TrackCollection = {john:[""], paul:[""], george:[""], ringo:[""]}
let token = getToken();

function getToken(){
    axios('https://accounts.spotify.com/api/token', {
				'method': 'POST',
				'headers': {
						'Content-Type':'application/x-www-form-urlencoded',
						'Authorization': 'Basic ' + btoa('e2f35e74a7424593b88a3ed41ebf40f5' + ':' + 'd6e84de876824e2c9d80990a78809068'),
				},
				'data': 'grant_type=client_credentials'
			}).then(tokenresponse => {
				//console.log(tokenresponse.data.access_token);
				return tokenresponse.data.access_token
				
			}).catch(error=> console.log(error))
}
async function albumRetriever(artist:string, index:number){
    var albums:string[] = []

    axios(`https://api.spotify.com/v1/artists/${artist}/albums`,{
		'method': 'GET',
		'headers': {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Authorization': 'Bearer ' + token
		}
		})
		.then(albumresponse=> {
			
			for(var i=0; i< albumresponse.data.items.length; i++){
				albums.push(albumresponse.data.items[i].id)
			}
            
		})
		.catch(error=> console.log(error))

        if(index == 0){
            albumCollection.john = albums
        }else if(index == 1){
            albumCollection.paul = albums
        }else if(index == 2){
            albumCollection.george = albums
        }else if(index == 3){
            albumCollection.ringo = albums
        }

    getTracks(albums)
}
async function getAlbums(){
    let albums:string[] = []

    artists.forEach(albumRetriever)
    for(var i = 0; i<4; i++){
        if(i==0){
            albumCollection.john.forEach(retrieveTracks)
        }else if(i==1){
            albumCollection.john.forEach(retrieveTracks)
        }else if(i==2){
            albumCollection.john.forEach(retrieveTracks)
        }else if(i==3){
            albumCollection.john.forEach(retrieveTracks)
        }
    }
    
}
function getTracks(albums:string[]){
    
    var tracks:string[] = []
    albums.forEach(retrieveTracks)
   
    return tracks
}

function retrieveTracks(album:string,index:number){

    let tracks:string[] = []

    axios(`https://api.spotify.com/v1/albums/${album}/tracks`,{
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
                tracks.push(trackresponse.data.items[a].name)
                console.log("track name from trackres: ", trackresponse.data.items[a].name)
            }
        })
        .catch(error=> console.log(error))	
    
        if(index == 0){
            tracks.forEach(track=>{
                trackCollection.john.push(track)
            })
        }else if(index == 1){
            tracks.forEach(track=>{
                trackCollection.paul.push(track)
            })
        }else if(index == 2){
            tracks.forEach(track=>{
                trackCollection.george.push(track)
            })
        }else if(index == 3){
            tracks.forEach(track=>{
                trackCollection.ringo.push(track)
            })
        }
}

getAlbums();

module.exports = {trackCollection}*/
