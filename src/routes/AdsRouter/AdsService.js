const AdsService = {
    getAllAds(db){
        return db.select("*").from("living_space");
    },
    getUsersAds( db, user_id){
        return db.select("*").from("living_space").where({user_id});
    },
    getAd( db, id){
        return db.select("*").friom("living_space").where({ id }).first();
    },
    createAd( db, ad){
        return db.insert(ad).into("living_space").returning("*").then( ([newAd]) => newAd);
    },
    deleteAd( db, id){
        return db.delete().from("living_space").where({id});
    }
};

module.exports = AdsService;