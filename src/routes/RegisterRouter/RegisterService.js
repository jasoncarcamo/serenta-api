const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../../config");

const RegisterService = {
    getUser( db, email){
        return db.select("*").from("users").where({ email }).first();
    },
    createUser( db, user){
        return db.insert(user).from("users").returning("*").then( ([ newUser ]) => newUser);
    },
    createJwt( subject, payload){
        return jwt.sign( payload, JWT_SECRET, {
            subject,
            algorithm: "HS256"
        });
    },
    hashPassword(password){
        return bcrypt.hash( password, 12);
    }
};

module.exports = RegisterService;