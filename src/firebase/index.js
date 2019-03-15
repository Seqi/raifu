import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

import config from 'config/index'

export default firebase.initializeApp(config.firebase)
