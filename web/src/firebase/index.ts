import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/functions'
import 'firebase/analytics'

import config from 'config/index'

const app = firebase.initializeApp(config.firebase)

export default app
