const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../../../config"); 

const LoginService = {
    getUser( db, email){
        return db.select("*").from("users").where({email}).first();
    },
    comparePassword( password, hashedPassword){
        return bcrypt.compare(password, hashedPassword)
    },
    createJwt(subject, payload){
        return jwt.sign( payload, JWT_SECRET, {
            subject,
            algorithm: "HS256"
        });
    }
};

module.exports = LoginService;