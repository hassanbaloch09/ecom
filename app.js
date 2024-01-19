// kpdigitals_kpDigital
// ecom@Api 
// kpdigitals_flutter

const express = require('express');
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
require('dotenv').config();
const useragent = require('express-useragent')
const routes = require("./routes");
const db = require("./models");
const {applyRoutes} = require("./config/utils");
const indexRouter=require("./routes")

process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : "production";

// const indexRouter = require('./router/index');
const dbsequelize = db.sequelize;

app.use(useragent.express())
app.use(express.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));

app.use(bodyParser.json({
    limit: '50mb',
    extended: true
}));
app.use(cookieParser());
const port = process.env.PORT;

app.use(cors());
app.use(function (err, req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.status(err.status || 500);
    res.send('Invalid API Request ');
});



const sequelize_opts = process.env.DB_INIT === "true" ? {force: true} : {alter: true};
db.sequelize.sync(sequelize_opts).then((data) => {
}).catch(err => {
    console.error(119, err);
}).finally(async () => {
    console.table({
        "Time": new Date().toISOString(),
        "NODE_ENV": process.env.NODE_ENV,
        "Host": process.env.Host||"localhost",
        "PORT": process.env.PORT,
        "DB_HOST": process.env.DB_HOST,
        "DB_PORT": process.env.DB_PORT,
        "DB_NAME": process.env.DB_NAME,
        "DB_USER": process.env.DB_USER,
    });
});

// app.use('/api', indexRouter);

applyRoutes(app, routes);

//index rputer
// app.use('/api', indexRouter);
app.listen(port, () => {
    console.log(`server is running on PORT` + " " + port);
});


