import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/functions'

import config from 'config/index'
import { CloudFunction } from './functions'

let app = firebase.initializeApp(config.firebase)

if (process.env.NODE_ENV === 'development') {
	CloudFunction.useLocal = true
}

export default app
