import firebaseClient from 'firebase'
import config from 'config'

let firebase = firebaseClient.initializeApp(config)
let database = firebase.database()

export default firebase
export { database }
