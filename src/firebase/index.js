import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/functions'

import config from 'config/index'

let app = firebase.initializeApp(config.firebase)

if (process.env.NODE_ENV === 'development') {
	app.functions()
		.useFunctionsEmulator('http://localhost:5000')
}

export default app
