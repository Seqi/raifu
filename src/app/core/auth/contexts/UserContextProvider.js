import React, { useEffect, useState, useContext } from 'react'

import AuthContext from './AuthContext'
import UserContext from './UserContext'

let UserContextProvider = ({ children }) => {
	let auth = useContext(AuthContext)
	if (!auth) {
		throw new Error('Could not retrieve AuthContext. Ensure UserContext is wrapped with an AuthContext.Provider.')
	}

	let [user, setUser] = useState()

	useEffect(() => {
		let authUnsubscribe = auth.onAuthChanged(u => setUser(u))
		return () => authUnsubscribe 
	}, [auth, user])

	return (
		<UserContext.Provider value={ user }>
			{ children }
		</UserContext.Provider>
	)
}

export default UserContextProvider