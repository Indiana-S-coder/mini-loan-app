const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoute = require('./routes/userRoute');
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

app.use(cors());
app.use("/api/v1", userRoute);

const corsOptions = {
    origin: '*',
    optionSuccessStatue: 200,
    credentials: true
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true}));
app.set("trust proxy", 1);

app.use(errorMiddleware);

module.exports = app;