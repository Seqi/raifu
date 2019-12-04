import firebase from 'firebase/app'
import client from '..'

let auth = client.auth()

let providers = {
	email: new firebase.auth.EmailAuthProvider(),
	google: new firebase.auth.GoogleAuthProvider(),
	twitter: new firebase.auth.TwitterAuthProvider()
}

export default {
	get user() {
		return auth.currentUser
	},
	get isAuthenticated() {
		return this.user !== null
	},
	onAuthChanged: (fun) => auth.onAuthStateChanged(fun),
	signup: {
		withEmail: (email, pass) => auth.createUserWithEmailAndPassword(email, pass)
	},
	login: {
		withTwitter: () => auth.signInWithPopup(providers.twitter),
		withGoogle: () =>  auth.signInWithPopup(providers.google),
		withEmail: (email, pass) => auth.signInWithEmailAndPassword(email, pass)
	},
	logout: () => auth.signOut()
}
