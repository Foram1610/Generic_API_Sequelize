const express = require('express')
const app = express()
require('dotenv').config()
require('./config/config.json')
const cors = require('cors');
const { sequelize } = require('./models')
const routes = require('./routes')
const morgan = require('morgan')
const ErrorHandler = require('./middlewares/errorHandler.middleware')

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})

app.use(routes)
app.use(ErrorHandler)

const PORT = process.env.PORT || 8080
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}!!`)
    await sequelize.authenticate()
        .then(
            () => { console.log("Database connected!!")},
            error => { console.log("Database connection error", error) }
        )
        .catch(err => { console.log('database connection error', err), res.redirect('/error') });
})