const config = {
	firebase: {
		appId: import.meta.env.VITE_FIREBASE_APP_ID,
		apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
		authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
		databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
		projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
		storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
		messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
		measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
	},
}

export default config
