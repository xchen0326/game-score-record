// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const bodyparser = require("body-parser")

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});


// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});


const mongodb = require("mongodb")
const MongoClient = mongodb.MongoClient;
// const uri = "mongodb+srv://a3:abc123qwe@cluster0.yb7yq.mongodb.net/<dbname>?retryWrites=true&w=majority";
const uri = "mongodb+srv://mgdb:fireflycompaign123@cluster0.i9wly.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
let collection = null
client.connect(err => {
  collection = client.db("mgdb").collection("student_rec");
});

app.post('/register', bodyparser.json(), function( req, res ){
  console.log('body:',req.body)
  collection.insertOne( req.body)
      .then( dbresponse=>{
        console.log( dbresponse.insertedId )
        res.json(dbresponse.insertedId)
      })
})

app.post('/delete', bodyparser.json(), function( req, res ){
    console.log('body:',req.body)
    collection.deleteOne({ _id: new mongodb.ObjectId(req.body.uid) }, function (err, results) {
    });
    res.json({ success: req.body.uid })
})


app.get('/populate', function( req, res ){
    collection.find({}).toArray()
        .then(items=>{
            res.end(JSON.stringify(items))
        })
})

