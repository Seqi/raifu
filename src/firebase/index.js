import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/functions'
import 'firebase/analytics'

import config from 'config/index'

let app = firebase.initializeApp(config.firebase)

export default app
