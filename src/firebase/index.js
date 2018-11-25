import firebase from 'firebase'
import config from '../config/index'

export default firebase.initializeApp(config.firebase)
