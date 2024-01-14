const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoute = require('./routes/userRoute');
const loanRoute = require('./routes/loanRoute');
const bodyParser = require("body-parser");
const errorMiddleware = require('./middleware/error');

require('dotenv').config();

app.use(cookieParser());

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parametricLimit:50000,
})
);

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true,
    optionSuccessStatus: 200,
};


app.use(cors(corsOptions));
app.use("/api/v1", loanRoute);
app.use("/api/v1", userRoute);

app.use(express.urlencoded({ extended: true}));
app.set("trust proxy", 1);

app.use(errorMiddleware);

module.exports = app;