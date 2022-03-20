import React from 'react'

import firebase from 'firebase/app'

export default React.createContext<firebase.User | null>(null)
