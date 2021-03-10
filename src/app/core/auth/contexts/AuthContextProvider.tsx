import { FC } from 'react'
import firebase from 'firebase/app'

import { AuthContext, AuthContextValue } from './AuthContext'
import client from '../../../../firebase'

const auth = client.auth()

const useEmulator = process.env.NODE_ENV === 'development'
if (useEmulator) {
	auth.useEmulator('http://localhost:9099')
}

const authActions: AuthContextValue = {
	get user(): firebase.User | null {
		return auth.currentUser
	},

	get isAuthenticated(): boolean {
		return this.user !== null
	},

	onAuthChanged: (fun: (user: firebase.User | null) => any): firebase.Unsubscribe =>
		auth.onAuthStateChanged(fun),

	signup: {
		withEmail: (email: string, pass: string) =>
			auth.createUserWithEmailAndPassword(email, pass),
	},

	login: {
		withTwitter: () => auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()),
		withGoogle: () => auth.signInWithPopup(new firebase.auth.TwitterAuthProvider()),
		withEmail: (email: string, pass: string) =>
			auth.signInWithEmailAndPassword(email, pass),
	},

	logout: () => auth.signOut(),
}

let AuthContextProvider: FC = ({ children }) => {
	return <AuthContext.Provider value={ authActions }>{children}</AuthContext.Provider>
}

export default AuthContextProvider
