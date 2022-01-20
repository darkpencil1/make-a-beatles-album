const express = require('express')
const path = require('path')
const app = express()
const client = require("../index.js")
const db = client.db()
const ObjectID = require('mongodb').ObjectId
const axios = require('axios')
var cors = require('cors')

//Spotify IDs for artists
const harrison = '7FIoB5PHdrMZVC3q2HE5MS'
const lennon = "4x1nvY2FN8jxqAFA0DA02H"
const mccartney = '4STHEaNw4mPZ2tzheohgXB'
const starr = '6DbJi8AcN5ANdtvJcwBSw8'
const artists = [lennon, mccartney, harrison, starr]

var albums = {
    john:[""],
    paul:[""], 
    george:[""], 
    ringo:[""]
}

var tracks = {
    john:[""],
    paul:[""], 
    george:[""], 
    ringo:[""]
}

var token;


app.use(cors());
app.use(express.json())


async function getToken(){

   // Api call for retrieving token
    await axios('https://accounts.spotify.com/api/token', {
				'method': 'POST',
				'headers': {
						'Content-Type':'application/x-www-form-urlencoded',
						'Authorization': 'Basic ' + Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'),
				},
				'data': 'grant_type=client_credentials'
			}).then(tokenresponse => {
                token = tokenresponse.data.access_token
                artists.forEach(albumRetriever)
			
			}).catch(error=> console.log(error))
}
async function albumRetriever(artist, index){
    
    var albumList = []
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
				albumList.push(albumresponse.data.items[i].id)
			}
            if(index == 0){
                albums.john = albumList
                
                albums.john.forEach(album =>{
                    retrieveTracks(album, albums.john.indexOf(album), "john")
                })
               
            }else if(index == 1){
                albums.paul = albumList
                albums.paul.forEach(album =>{
                    retrieveTracks(album, albums.paul.indexOf(album), "paul")
                })
            }else if(index == 2){
                albums.george = albumList
                albums.george.forEach(album =>{
                    retrieveTracks(album, albums.george.indexOf(album), "george")
                })
            }else if(index == 3){
                albums.ringo = albumList
                albums.ringo.forEach(album =>{
                    retrieveTracks(album, albums.ringo.indexOf(album), "ringo")
                })
            }
		})
		.catch(error=> console.log(error))

}

async function retrieveTracks(album,index, artistName){
    let trackList = []
    await axios(`https://api.spotify.com/v1/albums/${album}/tracks`,{
            'method': 'GET',
            'headers': {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(trackresponse=> {
            for(var a=0; a< trackresponse.data.items.length; a++){
                trackList.push(trackresponse.data.items[a].name)
                
            }
         
            if(artistName == "john"){
                trackList.forEach(track=>{
                    tracks.john.push(track)
                })
                
            }else if(artistName == "paul"){
                trackList.forEach(track=>{
                    tracks.paul.push(track)
                })
            }else if(artistName == "george"){
                trackList.forEach(track=>{
                    tracks.george.push(track)
                })
            }else if(artistName == "ringo"){
                trackList.forEach(track=>{
                    tracks.ringo.push(track)
                })
            }
        })
        .catch(error=> console.log("error"))	
 
}

getToken();


if(process.env.NODE_ENV === 'production'){
    app.use(express.static('dist'))

    
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../dist", "index.html"))
       
    })
}
  
/*app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../dist", "index.html"))
   
})*/

app.get("/api/albums", async (req, res)=>{
  
    try{
        const albums = await db.collection('albums').find().toArray()
        res.status(200).json({success:true, data: albums})

    }catch(err){
        res.status(400).json({success: false, msg: `Service currently unavailable, err: ${err}`})
    }
})

app.get("/api/tracks", async (req, res)=>{
    try{
        res.status(200).json({success:true, data: tracks})
        
    }catch(err){
        res.status(400).json({success: false, msg: `Service currently unavailable, err: ${err}`})
    }
})

app.post('/api/albums', async (req,res)=>{
    try{      
        const {
            body: {songs, albumName, keywords, description}
        } = req
      
        await db.collection('albums').insertOne({"_id": new ObjectID(), name: albumName, songs: songs, description: description, keywords: keywords})
        res.status(200).json({success:true, msg: "Data posted succesfully to database!"})
    }catch(err){
        res.status(400).json({success: false, msg: `Service currently unavailable, err: ${err}`})
    }
})

module.exports = app
