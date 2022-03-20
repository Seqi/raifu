import { useEffect, useState, useContext, FC } from 'react'

import firebase from 'firebase/app'

import { AuthContext } from './AuthContext'
import UserContext from './UserContext'

const UserContextProvider: FC = ({ children }) => {
	let auth = useContext(AuthContext)

	let [user, setUser] = useState(auth?.user || null)

	useEffect(() => {
		if (!auth) {
			throw new Error(
				'Could not retrieve AuthContext. Ensure UserContext is wrapped with an AuthContext.Provider.'
			)
		}

		let authUnsubscribe = auth.onAuthChanged((u: firebase.User | null) => setUser(u))
		return authUnsubscribe
	}, [auth])

	return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export default UserContextProvider
