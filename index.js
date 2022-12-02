const express = require('express');
const mongoose = require('mongoose');
const Country = require('./models/countries')
// const router = express.Router();

const app = express();
const port = 3000

app.use(express.json())

mongoose.connect('mongodb+srv://new:newnewnew@sandbox.apxur.mongodb.net/?retryWrites=true&w=majority');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "MongoDB cannot connect:"))


// 1. GET /api/countries
app.get('/api/countries', (req, res) => {
    const query = req.query.sort;

    if(query === "true")
    {Country.find({}, null, {sort:{name:1}},(err, data) => res.send(data));}
    else
    {Country.find({}, (err, data) => res.send(data));}
});

// 2. POST /api/countries
app.post('/api/countries', (req, res)=>{
    Country.create(req.body)
    .then(msg=>res.send(msg));
})

// 3. GET /api/countries/:code
// This route should return a single country, based on the code provided. You should accept both an alpha 2 or an alpha 3 code. 
app.get('/api/countries/:code', (req, res) => {
    Country.findOne({$or: [{alpha2Code:req.params.code},{alpha3Code:req.params.code}]}, (err, data) => res.send(data));
});

// 4. PUT /api/countries/:code
// This route should accept edits to an existing country in the list.
app.put('/api/countries/:code', (req, res) => {
    Country.findOneAndUpdate({$or: [{alpha2Code:req.params.code},{alpha3Code:req.params.code}]}, {$set:{name: "Michel Country"}}, (err, data) => res.send(data));
});

// 5. DELETE /api/countries/:code
// This route should allow you to delete a specific country from the list (eg: remove an object from the array)
app.delete('/api/countries/:code', (req, res) => {
    Country.findOneAndDelete({$or: [{alpha2Code:req.params.code},{alpha3Code:req.params.code}]}, (err, data) => res.send(data));
});

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}/`)
})