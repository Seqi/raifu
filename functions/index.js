let functions = require('firebase-functions')
let firebase = require('firebase-admin')
let bodyParser = require('body-parser')
let express = require('express')
let app = express()

let weaponRoutes = require('./src/routes/weapon')
let attachmentRoutes = require('./src/routes/attachment')
let gearRoutes = require('./src/routes/gear')
let loadoutRoutes = require('./src/routes/loadout')
let eventRoutes = require('./src/routes/event')
let authMiddleware = require('./src/middleware/firebase-auth-middleware')

app.use(bodyParser.json())

app.use('/weapons', authMiddleware, weaponRoutes)
app.use('/attachments', authMiddleware, attachmentRoutes)
app.use('/gear', authMiddleware, gearRoutes)
app.use('/loadouts', authMiddleware, loadoutRoutes)
app.use('/events', authMiddleware, eventRoutes)

app.get('/', (req, res) => {
	res.send('Hello world!')
})

firebase.initializeApp()

module.exports.api = functions.https.onRequest(app)