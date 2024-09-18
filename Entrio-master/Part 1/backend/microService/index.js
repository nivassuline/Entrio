const config = require('./config/config')
const express = require('express');
const app = express();
const repoSearchRoute = require('./routes/repoSearchRoute')
const cors = require('cors')

app.use(cors({origin: config.frontendUrl}))
app.use(express.json());
app.use('/api', repoSearchRoute);


app.listen(config.port, () => {
  console.log(`running on http://localhost:${config.port}`);
});