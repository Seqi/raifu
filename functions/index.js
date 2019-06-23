let functions = require('firebase-functions')
let firebase = require('firebase-admin')
let bodyParser = require('body-parser')
let cors = require('cors')
let express = require('express')
let app = express()

let weaponRoutes = require('./src/routes/weapon')
let attachmentRoutes = require('./src/routes/attachment')
let gearRoutes = require('./src/routes/gear')
let loadoutRoutes = require('./src/routes/loadout')
let eventRoutes = require('./src/routes/event')
let authMiddleware = require('./src/middleware/firebase-auth-middleware')

app.use(cors())
app.use(bodyParser.json())

app.use('/weapons', authMiddleware(), weaponRoutes)
app.use('/attachments', authMiddleware(), attachmentRoutes)
app.use('/gear', authMiddleware(), gearRoutes)
app.use('/loadouts', loadoutRoutes) // Configure auth at a more granular level
app.use('/events', authMiddleware(), eventRoutes)

app.get('/', (req, res) => {
	res.send('Hello world!')
})

firebase.initializeApp()

module.exports.api = functions.https.onRequest(app)