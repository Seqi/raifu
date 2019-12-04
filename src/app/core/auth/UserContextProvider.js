import React, { useEffect, useState } from 'react'

import UserContext from './UserContext'
import auth from '../../../firebase/auth'

let UserContextProvider = ({ children }) => {
	let [user, setUser] = useState(auth.user)

	useEffect(() => {
		let authUnsubscribe = auth.onAuthChanged(setUser)
		return authUnsubscribe
	}, [user])

	return (
		<UserContext.Provider value={ user }>
			{ children }
		</UserContext.Provider>
	)
}

export default UserContextProvider