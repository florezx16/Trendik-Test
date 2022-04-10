const express = require('express');
const router = express.Router();

//Call influencer model
const Influencer = require('../models/influencer');

//Middleware index
router.get('/', async(req,res)  =>{
    const params = req.query; //Define body

    //Mapping parameters values
    const name_filter  =(params.name) ?params.name : "";
    const region_param =(params.regions) ?params.regions : "";
    const tags_param   =(params.tags) ?params.tags : "";
    try{
        const influencer_response =  await Influencer.find({
            name: {$regex: ".*" + name_filter + ".*"},
            region:{$regex:region_param},
            tags:{$regex:tags_param}
        }).exec();
        res.render("influencer",{
            influencer_pack:influencer_response
        });
    }catch(e){
        console.log("DBA Error "+e);
    }
});

router.get('/create',(req,res) =>{
    res.render('influencer_create');
})

router.post('/',async(req,res) =>{
    const body = req.body; //Define body
    const region_param = body.region;
    const tags_param = body.tags;

    //Fix Regions values
    const region_list = region_param.toString();
    const regions_fix = region_list.split(',');

    //Fix tags values
    const tags_list = tags_param.toString();
    const tags_fix = tags_list.split(',');

    //Define new body
    const new_body = {
        name:body.name,
        region:regions_fix,
        tags:tags_fix
    }
    try{
        await Influencer.create(new_body);
        res.redirect('/influencer');
    }catch(e){
        console.log(e)
    }
})

router.get('/:id',async(req,res) =>{
    const id = req.params.id;
    try{
        const InfluencerDB = await Influencer.findOne({_id:id});
        res.render('influencer_update',{
            influencer_info:InfluencerDB,
            error:false
        });
    }catch(e){
        console.log(e);
        res.render('influencer_update',{
            error:true,
            msg:"Influencer unavailable"
        });
    }
})

module.exports = router;