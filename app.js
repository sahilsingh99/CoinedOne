const express     = require('express'),
    morgan      = require('morgan'),
    mongoose    = require('mongoose'),
    env         = require('dotenv'),
    cors        = require('cors');

var app = express();
env.config();
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

var port = process.env.PORT || 3000;

// db connection
const URI = process.env.URI;
mongoose.connect(URI, {useNewUrlParser : true, useCreateIndex : true, useUnifiedTopology : true})
    .then(data => {
        console.log("DB connected");
    })
    .catch(err => {
        console.log("error", err);
    })


// import routes
const authRoute = require('./routes/authRoutes');
const scheduleRoute = require('./routes/scheduleRoutes');
const appRoute = require('./routes/appRoutes');

app.get('/', (req, res, next) => {
    res.status(200).json({
        message : "API is working fine."
    })
})

app.use('/api/auth', authRoute);
app.use('/api/schedule', scheduleRoute);
app.use('/api/app', appRoute);

// error for invalid route
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

// error handler
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})


app.listen(port, (req, res) => {
    console.log("server started");
})