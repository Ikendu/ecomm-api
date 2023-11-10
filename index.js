const express = require(`express`)
const cors = require(`cors`)
const { default: mongoose } = require('mongoose')
const User = require('./models/User')
const bcrypt = require(`bcryptjs`)
const jwt = require('jsonwebtoken')
const cookieParser = require(`cookie-parser`)
const multer = require('multer')
const uploadMd = multer({ dest: `uploads/` })
const fs = require(`fs`)

const salt = bcrypt.genSaltSync(10)
const secretJwt = `fsgsyuewy643873vncxm0q34kjd048,znahfuaoghdfj3400232`

const app = express()

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }))
app.use(express.json())
app.use(cookieParser())

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

app.post(`/login`, async (req, res) => {
  const { name, password } = req.body
  const userDoc = await User.findOne({ name })
  const checker = bcrypt.compareSync(password, userDoc?.password)
  if (checker) {
    //login
    // let token = await jwt.sign({ email, id: userDoc._id }, secretJwt)
    // res.json(token)
    jwt.sign({ name, id: userDoc._id, email: userDoc.email }, secretJwt, {}, (err, token) => {
      if (err) throw err
      else {
        res.cookie(`token`, token).json({
          id: userDoc._id,
          name,
        })
      }
    })
  } else {
    res.status(400).json(`Wrong Credentials`)
  }
})

//to use cookie(name) on the Navbar
app.get(`/profile`, (req, res) => {
  const { token } = req.cookies
  jwt.verify(token, secretJwt, {}, (err, info) => {
    if (err) throw err
    else res.json(info)
  })
})

app.post(`/logout`, (req, res) => {
  res.cookie(`token`, ``).json(`ok`)
})

app.post(`/post`, uploadMd.single(`file`), (req, res) => {
  const { originalname, path } = req.file
  const div = originalname.split(`.`)
  const extension = div[div.length - 1].toLowerCase()
  const newPath = path + `.` + extension
  fs.renameSync(path, newPath)
  res.json({ extension })
})

app.listen(4000)

//
