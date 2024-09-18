const { MongoClient } = require('mongodb');
const config = require('../config/config');
const axios = require('axios')
let client;

const connectToDatabase = async () => {
  if (!client) {
    client = new MongoClient(config.mongoURI);
    await client.connect();
  }
  return client;
};


const getRepositoriesFromDb = async (page = null, perPage = null) => {
  try {
    const client = await connectToDatabase();
    const database = client.db(config.mongoDatabase);
    const collection = database.collection(config.mongoCollection);

    let query = collection.find({}, {
      projection: { repoId: 1, name: 1, description: 1, _id: 0 },
    });

    if (page && perPage) {
      const skip = (page - 1) * perPage;
      query = query.skip(skip).limit(perPage);
    }

    const repositories = await query.toArray();
    const totalDocuments = await collection.countDocuments();
    const totalPages = perPage ? Math.ceil(totalDocuments / perPage) : 1;

    return { 
      repositories, 
      totalDocuments, 
      totalPages: perPage ? totalPages : null, 
      currentPage: page || null 
    };
  } catch (error) {
    console.log(error);
  }
};

const getRepoByName = async (repoName, page = null, perPage = null) => {
  try {
    const client = await connectToDatabase();
    const database = client.db(config.mongoDatabase);
    const collection = database.collection(config.mongoCollection);

    let query = collection.find(
      { name: { $regex: `^${repoName}`, $options: 'i' } },
      { projection: { _id: 0 } }
    );

    if (page && perPage) {
      const skip = (page - 1) * perPage;
      query = query.skip(skip).limit(perPage);
    }

    const repositories = await query.toArray();
    const totalDocuments = await collection.countDocuments({ name: { $regex: `^${repoName}`, $options: 'i' } });
    const totalPages = perPage ? Math.ceil(totalDocuments / perPage) : 1;

    return {
      repositories,
      totalDocuments,
      totalPages: perPage ? totalPages : null,
      currentPage: page || null
    };
  } catch (error) {
    console.log(error);
  }
};

const getRepoById = async (repoId) => {
  try {
    const client = await connectToDatabase();
    const database = client.db(config.mongoDatabase);
    const collection = database.collection(config.mongoCollection);

    return await collection.findOne({ repoId: parseInt(repoId, 10) }, { projection: { _id: 0 } });
  } catch (error) {
    console.log(error);
  }
};

const searchRepositoriesFromDataCollection = async (repoName) => {
  try {
    const response = await axios.get(`${config.dataCollectionUrl}/api/collect`, { params: { name: repoName } });
    if (response.status === 200) {
      return {
        repositories: response.data,
        totalDocuments: 1,
        totalPages: 1,
        currentPage: 1
      };
    } else {
      throw new Error(`Unexpected status code: ${response.status}`);
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    } else {
      console.log(error)
      throw new Error('Error searching repositories');
    }
  }
};

module.exports = {
  getRepoById,
  getRepoByName,
  searchRepositoriesFromDataCollection,
  getRepositoriesFromDb,
};