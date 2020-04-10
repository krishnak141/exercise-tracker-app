const express = require('express')
const cors = require('cors')
const mongoose= require('mongoose')

require('dotenv').config()

const app = express() 
app.use(cors())
app.use(express.json())

const port = process.env.PORT || 5000 
const uri=process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
        .then(() => console.log( 'Database Connected successfully' ))
        .catch(err => console.log( err ));

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
     
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))  