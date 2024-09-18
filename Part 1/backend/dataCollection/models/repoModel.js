// dataModel.js
import { connect, Schema, model } from 'mongoose';
import { mongoURI, mongoDatabase, mongoCollection } from '../config/config.js'


connect(`${mongoURI}/${mongoDatabase}?retryWrites=true&w=majority`)
  .then(() => console.log('MongoDB connected successfully'))
  // Purposely not catching error so it will exit if not connected

const repositorieSchema = new Schema({
  repoId: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
  },
  stargazers_count: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  forks: {
    type: Number,
    required: true,
  },
  languages: {
    type: [String],
    required: true,
  },
  forks_count: {
    type: Number,
    required: true,
  },
  topics: {
    type: [String],
    required: true,
  }
}, {collection: mongoCollection, versionKey: false});

export default model('repoCollection', repositorieSchema);