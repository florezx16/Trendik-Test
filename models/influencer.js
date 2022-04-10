const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const influencerSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    region:{
        type:Array,
        required:true
    },
    tags:{
        type:Array,
        required:true
    }
})

//Create model
const Influencer = mongoose.model('Influencer',influencerSchema);

//Exports influencer model
module.exports = Influencer;