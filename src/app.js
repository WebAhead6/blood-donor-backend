const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const exphbs = require("express-handlebars");
const path = require('path');
const router = require("./controllers/router")
const { loadUserData } = require("./middleware/authValidator");
const helpers = require('./views/helpers/helpers')
const schedule = require('node-schedule');
const { getAllLocationsFromServer } = require('./controllers/locations');


const app = express();

app.use(cors({ credentials: true, origin: ['http://localhost:3000', "https://sad-pare-c4309e.netlify.app"] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(helmet())



app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(loadUserData)
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(router)


app.engine(
	"hbs",
	exphbs({
		extname: "hbs",
		layoutsDir: path.join(__dirname, "views", "layouts"),
		partialsDir: path.join(__dirname, 'views', 'partials'),
		defaultLayout: "main",
		helpers,
	})
);

getAllLocationsFromServer();

schedule.scheduleJob('00 00 * * *', function () {
	getAllLocationsFromServer();

});




module.exports = app;
