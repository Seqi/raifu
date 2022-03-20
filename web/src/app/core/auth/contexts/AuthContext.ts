import React from 'react'

import firebase from 'firebase/app'

export type AuthContextValue = {
	user: firebase.User | null
	isAuthenticated: boolean
	onAuthChanged: (fun: (user: firebase.User | null) => any) => firebase.Unsubscribe
	signup: SignupActions
	login: LoginActions
	logout: () => Promise<void>
}

export type SignupActions = {
	withEmail: (email: string, pass: string) => Promise<firebase.auth.UserCredential>
}

export type LoginActions = {
	withTwitter: () => Promise<firebase.auth.UserCredential>
	withGoogle: () => Promise<firebase.auth.UserCredential>
	withEmail: (email: string, pass: string) => Promise<firebase.auth.UserCredential>
}

export const AuthContext = React.createContext<AuthContextValue | null>(null)
