const express = require("express");
const Datastore = require('nedb');

const app = express();
app.listen(3000,() =>console.log("listening at port"));
app.use(express.static('public'));
app.use(express.json({limit :'1Mb'}));

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api',(request,response)=>{
    database.find({},(err,data)=>{
        if(err){
            console.log("error occurred oops !")
        }
        else{
            response.json( data );
        }
    });
 
});

app.post('/api',(request,response )=>{
    console.log(request.body);
    const data = request.body;
    const timestamp= Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    console.log(database);
    response.json({
        status : 'success',
        timestamp:timestamp,
        latitude :data.lat,
        longitude :data.lon,
        mood :data.mood,
        image :data.image,
    });
});