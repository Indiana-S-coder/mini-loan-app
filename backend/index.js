const app = require("./app.js")

require('dotenv').config();

const Connection = require("./config/db.js");


process.on("uncaughtException", (err) => {
  console.log(`Error ${err.message}`);
  console.log(`Shutting down the server due to unhandled Promise Rejection.`)

  process.exit(1);
})

const port = process.env.PORT||8080;

Connection();

app.get('/', (req, res) => {
  res.send("Hello World");
});

const server = app.listen(port, () => {
  console.log(`Server is working on http://localhost:${port}`);
})


process.on("unhandledRejection", (err) => {
  console.log(`Error ${err.message}`);
  console.log(`Shutting down the server due to unhandled Promise Rejection.`);

  server.close(() => {
    process.exit(1);
  })
});