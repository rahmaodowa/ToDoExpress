const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://rodowa:Soccer123@cluster0.nat1q.mongodb.net/List?retryWrites=true&w=majority";
const dbName = "List";

app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('ToDos').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {ToDos: result})
  })
})

app.post('/ToDos', (req, res) => {
  db.collection('ToDos').insertOne({todo: req.body.name}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})


app.delete('/ToDos', (req, res) => {
  db.collection('ToDos').findOneAndDelete({todo: req.body.name}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
