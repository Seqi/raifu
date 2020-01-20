let functions = require('firebase-functions')
let firebase = require('firebase-admin')
let bodyParser = require('body-parser')
let cors = require('cors')
let express = require('express')
let app = express()

let createArmoryRoute = require('./src/routes/armoryRoute')
let armoryRoutes = require('./src/routes/armory')
let loadoutRoutes = require('./src/routes/loadout')
let eventRoutes = require('./src/routes/event')
let authMiddleware = require('./src/middleware/firebase-auth-middleware')

let { Weapon, Attachment, Gear, Clothing } = require('./src/data/database/entities')

app.use(cors())
app.use(bodyParser.json())

app.use('/armory', authMiddleware(), armoryRoutes)
app.use('/weapons', authMiddleware(), createArmoryRoute(Weapon))
app.use('/attachments', authMiddleware(), createArmoryRoute(Attachment))
app.use('/gear', authMiddleware(), createArmoryRoute(Gear))
app.use('/clothing', authMiddleware(), createArmoryRoute(Clothing))
app.use('/loadouts', loadoutRoutes) // Configure auth at a more granular level
app.use('/events', authMiddleware(), eventRoutes)

app.get('/', (req, res) => {
	res.send('pong')
})

firebase.initializeApp()

module.exports.api = functions.https.onRequest(app)