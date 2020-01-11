let functions = require('firebase-functions')
let firebase = require('firebase-admin')
let bodyParser = require('body-parser')
let cors = require('cors')
let express = require('express')
let app = express()

let armoryRoutes = require('./src/routes/armory')
let weaponRoutes = require('./src/routes/weapon')
let attachmentRoutes = require('./src/routes/attachment')
let gearRoutes = require('./src/routes/gear')
let clothingRoutes = require('./src/routes/clothing')
let loadoutRoutes = require('./src/routes/loadout')
let eventRoutes = require('./src/routes/event')
let authMiddleware = require('./src/middleware/firebase-auth-middleware')

app.use(cors())
app.use(bodyParser.json())

app.use('/armory', authMiddleware(), armoryRoutes)
app.use('/weapons', authMiddleware(), weaponRoutes)
app.use('/attachments', authMiddleware(), attachmentRoutes)
app.use('/gear', authMiddleware(), gearRoutes)
app.use('/clothing', authMiddleware(), clothingRoutes)
app.use('/loadouts', loadoutRoutes) // Configure auth at a more granular level
app.use('/events', authMiddleware(), eventRoutes)

app.get('/', (req, res) => {
	res.send('pong')
})

firebase.initializeApp()

module.exports.api = functions.https.onRequest(app)