const dotenv = require('dotenv')
dotenv.config()
const {MongoClient} = require('mongodb')



MongoClient.connect(process.env.CONNECTIONSTRING, {useUnifiedTopology: true} ,async (err, client)=>{
    module.exports = client;
    const app = require('./backend/server.ts')
    app.listen(process.env.PORT || 5000)
    console.log('Connected succesfully to database.')
    
})