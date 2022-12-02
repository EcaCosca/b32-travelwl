const express = require('express');
const mongoose = require('mongoose');
const Country = require('./models/countries')

const app = express();
const port = 3000

app.use(express.json())

mongoose.connect('mongodb+srv://new:newnewnew@sandbox.apxur.mongodb.net/?retryWrites=true&w=majority');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "MongoDB cannot connect:"))

// 1. GET /api/countries
app.get('/api/countries', (req, res) => {
    Country.find({}, (err, data) => res.send(data));
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
// This route should accept edits to an existing country in the list (eg: edit an object inside the countries array).

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}/`)
})