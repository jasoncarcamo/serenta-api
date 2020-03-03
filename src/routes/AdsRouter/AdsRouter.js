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
        console.log(req.user.id)
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

module.exports = AdsRouter;
