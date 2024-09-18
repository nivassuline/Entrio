import dotenv from 'dotenv';

dotenv.config();

export const mongoURI = process.env.MONGO_URI;
export const mongoDatabase = process.env.MONGO_DATABASE;
export const mongoCollection = process.env.MONGO_COLLECTION;
export const githubAuthKey = process.env.GITHUB_AUTH_KEY;
export const port = process.env.PORT || 3000;