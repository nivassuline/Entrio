import { port } from './config/config.js'
import express, { json } from 'express';
import dataRoute from './routes/repoCollectionRoute.js'

const app = express();;

app.use(json());
app.use('/api', dataRoute);


app.listen(port, () => {
  console.log(`running on http://localhost:${port}`);
});