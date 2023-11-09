const express = require(`express`)
const cors = require(`cors`)
const { default: mongoose } = require('mongoose')
const User = require('./models/User')
const bcrypt = require(`bcryptjs`)
const jwt = require('jsonwebtoken')

const salt = bcrypt.genSaltSync(10)
const secretJwt = `fsgsyuewy643873vncxm0q34kjd048,znahfuaoghdfj3400232`

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(
  `mongodb+srv://ecomm:11111234Aa@cluster0.cuu14a6.mongodb.net/?retryWrites=true&w=majority`
)



app.listen(4000)

//
