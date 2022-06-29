const express = require("express");
const logger = require("./logger");

const app = express();
const PORT = 8080;

app.get("/", (_, res) => {
  res.json({
    message: "Morgan setup",
  });
});


logger.log('error', 'Something went wrong')
logger.log('debug', 'For debug')

app.listen(PORT, () => {
  logger.log("info", `Server is running on port ${PORT}.`);
});
