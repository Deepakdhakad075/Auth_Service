const express = require('express');
const app = express();

const {PORT} = require('./config/serverConfig');


const prepareServer = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}   

prepareServer();
