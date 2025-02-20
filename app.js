const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const User = require('./models/user')
const UserService = require('./services/userApiService')
const userApiRoute = require('./routes/userApiRoute')
const loginUserApiRoute = require('./routes/loginUserApiRoute')
const Task = require('./models/task')
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
    firstName: "TOTO",
    lastName: "Doe",
    email: "fozj",
    password: "password"
});
let tasks = [];
let task = new Task({name: "Task 1", description: "Description 1",user: user});
tasks.push(task);
task = new Task({name: "Task 2", description: "Description 2",user: user});
tasks.push(task);
user.tasks = tasks;
user.save();
tasks.forEach(task => {
    task.save();
});
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