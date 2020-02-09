const express = require("express");
const RegisterRouter = express.Router();
const RegisterService = require("./RegisterService");

RegisterRouter
    .route("/register")
    .all(express.json())
    .post((req, res)=>{

        const {
            first_name,
            last_name,
            email,
            mobile_number,
            password
        } = req.body;

        const newUser = {
            first_name,
            last_name,
            email,
            mobile_number,
            password
        };

        for( const [key, value] of Object.entries(newUser)){

            if(value === undefined || value === null){
                return res.status(400).json({ error: `Missing ${key} in body request`});
            };

        };

        RegisterService.getUser( req.app.get("db"), newUser.email)
            .then( dbUser => {

                if( dbUser){

                    return res.status(400).json({ error: "You seem to have an account already"});

                };

                RegisterService.hashPassword( newUser.password)
                    .then( hashedPassword => {
                        newUser.password = hashedPassword;

                        RegisterService.createUser( req.app.get("db"), newUser)
                            .then( createdUser => {
                                const subject = newUser.email;
                                const payload = {
                                    user: newUser.email
                                };

                                return res.status(200).json({
                                    token: RegisterService.createJwt( subject, payload)
                                });
                            });
                    });

            });
    });

module.exports = RegisterRouter;