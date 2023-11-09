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

app.post(`/register`, async (req, res) => {
  const { name, email, password } = req.body
  const hash = bcrypt.hashSync(password, salt)
  try {
    const userDoc = await User.create({ name, email, password: hash })
    res.json(userDoc)
  } catch (e) {
    res.status(400).json(e)
  }
})

let name = ``
app.post(`/login`, async (req, res) => {
  const { email, password } = req.body
  const userDoc = await User.findOne({ email })
  name = userDoc.name
  const checker = bcrypt.compareSync(password, userDoc.password)
  if (checker) {
    //login
    jwt.sign({ username, id: userDoc._id }, secretJwt, {}, (err, token))
    res.json(token)
  } else {
    res.status(400).json(`Wrong Credentials`)
  }
})

app.listen(4000)

//
