const UserService = {
    getUser( db, id){
        return db.select("*").from("users").where({id}).first();
    }
};

module.exports = UserService;