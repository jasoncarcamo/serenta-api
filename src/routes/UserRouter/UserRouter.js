const express = require("express");
const UserRouter = express.Router();
const {requireAuth} = require("../../middleware/jwtAuth");
const UserService = require("./UserService");

UserRouter
    .route("/user")
    .all(requireAuth)
    .all(express.json())
    .all(express.urlencoded({ extended: true}))
    .get((req, res)=>{
        UserService.getUser( req.app.get("db"), req.user.id)
            .then( user => {
                console.log(user)

                return res.status(200).json({
                    user: {
                        id: user.id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        mobile_number: user.mobile_number
                    }
                });
            })
    })

module.exports = UserRouter;