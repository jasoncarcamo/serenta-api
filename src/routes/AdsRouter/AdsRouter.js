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

        AdsService.createAd( req.app.get("db"), req.body)
            .then( newAd => {

                return res.status(200).json({ newAd })
            })
    })

module.exports = AdsRouter;
