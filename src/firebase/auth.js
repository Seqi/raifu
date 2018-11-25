import firebase from 'firebase'
import client from '.'

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
		withEmail: (email, pass) => {
			return auth.createUserWithEmailAndPassword(email, pass)
		}
	},
	login: {
		withTwitter: () => {
			return auth.signInWithPopup(providers.twitter)
		},
		withGoogle: () => {
			return auth.signInWithPopup(providers.google)
		},
		withEmail: (email, pass) => {
			return auth.signInWithEmailAndPassword(email, pass)
		}
	},
	logout: () => auth.signOut()
}
