const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const User = require('./models/user')
const UserService = require('./services/userApiService')
const userApiRoute = require('./routes/userApiRoute')
const loginUserApiRoute = require('./routes/loginUserApiRoute')
const app = express()
const port = 8081


//Chargement des dépendances de base
let t = dotenv.config()

//On charge la connectionString
let dbConnection = process.env.MONGO_CONNECTION

mongoose.connect(dbConnection, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Connected to database'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
    
//Test user
let user = new User({
    firstName: "John",
    lastName: "Doe",
    email: "fozj",
    password: "password"
});
user.save();

let alluser = UserService.getUsers().then((users) => {alluser = users});
console.log(alluser.length)

//Les supplémentaire

app.use('/users', userApiRoute)
app.use('/login', loginUserApiRoute)


app.get('/', (req, res) => {
  res.send({alluser})
})


app.get('/test', (req, res) => {
    res.redirect('/')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})