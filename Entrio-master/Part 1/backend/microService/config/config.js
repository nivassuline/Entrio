require('dotenv').config(); 

module.exports = {
    mongoURI: process.env.MONGO_URI,
    mongoDatabase: process.env.MONGO_DATABASE,
    mongoCollection: process.env.MONGO_COLLECTION,
    dataCollectionUrl: process.env.DATA_COLLECTION_URL,
    frontendUrl: process.env.FRONTEND_URL,
    port: process.env.PORT || 4000
};