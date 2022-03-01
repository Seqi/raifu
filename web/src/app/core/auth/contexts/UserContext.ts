import firebase from 'firebase/app'
import React from 'react'

export default React.createContext<firebase.User | null>(null)
