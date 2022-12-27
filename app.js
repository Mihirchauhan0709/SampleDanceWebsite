const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const bodyparser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});
const port = 8000;


//Define mongoose schema
var contactSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true,
    },
    mobile_no:{
        type: Number,
        // required: true,
    },
    email:{
        type: String,
        // required: true,
        // lowercase: true,
    },
    address: {
        type: String,
        // required: true,
    },
    gender:{
        type: String,
        // required: true,
    },
})

var Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(() =>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });

    // res.status(200).render('contact.pug');
})


// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});