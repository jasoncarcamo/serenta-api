const express = require("express");
const AdsRouter = express.Router();
const AdsService = require("./AdsService");
const {requireAuth} = require("../../middleware/jwtAuth");

AdsRouter
    .route("/living-space")
    .all(express.json())
    .all(express.urlencoded({ extended: true}))
    .get((req, res)=>{
        AdsService.getAllAds( req.app.get("db"))
            .then( ads => {

                return res.status(200).json({ ads });
            })
    })
    .post(requireAuth, ( req, res)=>{

        const {
            address,
            city,
            state,
            zip_code,
            mobile_number,
            space_type,
            room_amount,
            bathroom_amount,
            pets,
            price,
            lat,
            lng,
            includes,
            special_comments
        } = req.body;

        const newAd = {
            address,
            city,
            state,
            zip_code,
            mobile_number,
            space_type,
            room_amount,
            bathroom_amount,
            pets,
            price,
            lat,
            lng,
            includes,
            special_comments,
            user_id: req.user.id
        };

        for( const [key, value] of Object.entries(newAd)){
            console.log(key, value)
            if(value === undefined){
                return res.status(400).json({
                    error: `Missing ${key} in body request`
                });
            }
        }

        AdsService.createAd( req.app.get("db"), newAd)
            .then( newAd => {

                return res.status(200).json({ newAd });
            })
    })

AdsRouter
    .route("/living-space/:id")
    .all(express.json())
    .all(express.urlencoded({ extended: true}))
    .all(requireAuth)
    .delete((req, res)=>{
        console.log(req.params.id)
        
        if(!req.params.id){
            return res.status(400).json({
                error: "Missing id in params"
            });
        };

        AdsService.getAd( req.app.get("db"), req.params.id)
            .then( ad => {
                if(!ad){
                    return res.status(400).json({
                        error: "The ad you are trying to delete does not exist"
                    });
                };

                AdsService.deleteAd( req.app.get("db"), req.params.id)
                    .then( adDeleted => {

                        return res.status(200).json({
                            success: "Ad has been deleted"
                        })
                    })
            });
    })

AdsRouter
    .route("/living-space/view/:id")
    .all(express.json())
    .all(express.urlencoded({ extended: true }))
    .patch((req, res)=>{
        
        if(!req.params.id){
            
            return res.status(400).json({
                error: "Missing id in params"
            });
        }

        AdsService.getAd( req.app.get("db"), req.params.id)
            .then( ad => {
                if(!ad){
                    return res.status(400).json({
                        error: "No ad found"
                    });
                };

                const newView = {
                    views: ++ad.views
                }

                console.log(newView);

                AdsService.updateAd( req.app.get("db"), newView, req.params.id)
                    .then( updatedAd => {
                        
                        return res.status(200).json({
                            success: "Your ad has been updated"
                        })
                    })
            })
    })



module.exports = AdsRouter;
