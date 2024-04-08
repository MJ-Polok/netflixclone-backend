const express = require('express')
const app = express();
const cors = require('cors')
const mongoose = require('mongoose')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const movieRoute = require('./routes/movies')
const listRoute = require('./routes/lists')
const jstUserRoute = require('./routes/jstUser')
const dotenv = require("dotenv")

dotenv.config()

// Old code but i like it!
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Connected mongoDB successful!"))
    .catch((err) => console.log(err))

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/movies', movieRoute)
app.use('/api/lists', listRoute)
app.use('/api/jstuser', jstUserRoute)

app.listen(2580, () => {
    console.log("Backend server is running!");
})