const express = require('express');
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

require('dotenv').config()

const port = process.env.PORT || 3000;

//DBA Connect
const mongoose = require('mongoose');
mongoose.connect(process.env.URI)
.then( ()=>console.log('DBA Connected'))
.catch(e=> console.log(e))

//Templates engine
app.set('view engine','ejs');
app.set('views',__dirname +'/views');

//Middleware index - Homepage
app.use(express.static(__dirname +'/public'));

//Import routes
app.use('/',require('./router/router')); //Index
app.use('/influencer',require('./router/influencer')); //Influencer

//Middleware 404 - 404 status
app.use( (req,res) =>{
    res.status(404).render('404', {
        title_404:'Page not found :(',
        desc_404: 'Please go back to homepage'
    });
});

//Port listen
app.listen(port, () =>{
    console.log(`Server available in port ${port}`);
});