import express = require('express')
const path = require('path')
const app = express()
const client = require("../index.js")
const db = client.db()
const ObjectID = require('mongodb').ObjectId
var cors = require('cors')



app.use(cors());
app.use(express.json())

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
app.post('/api/albums', async (req,res)=>{
    try{      
        console.log("name:", req.body[0].name, "songs", req.body[0].songs)
        await db.collection('albums').insertOne({"_id": new ObjectID(), name: req.body[0].name, songs: req.body[0].songs})
        res.status(200).json({success:true, msg: req.body.name})
    }catch(err){
        res.status(400).json({success: false, msg: `Service currently unavailable, err: ${err}`})
    }
})
app.post('/api', async (req, res)=>{
    try{
        const {
            
            body: {name}
        } = req
        
        await db.collection('customers').insertOne({"_id": new ObjectID(), ...req.body})
        res.status(200).json({success:true, msg: 'Data sent to database succesfully.'})
    }catch(err){
        res.status(400).json({success: false, msg: `Service currently unavailable, err: ${err}`})
    }
})


module.exports = app
