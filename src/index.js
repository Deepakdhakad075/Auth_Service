const express = require("express");
const app = express();

const { PORT } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");

const prepareServer = () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/api", apiRoutes);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

prepareServer();
