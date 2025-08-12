const express = require("express");
const app = express();

const { PORT } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");
const db = require("./models");
const prepareServer = () => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  // Sync database
  if (process.env.SYNC === "true") {
    db.sequelize.sync({alter :true} );
  }


  app.use("/api", apiRoutes);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

prepareServer();
