import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { MuiThemeProvider, CssBaseline, Typography } from '@material-ui/core'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import 'core-js/fn/array/flat-map'
import 'whatwg-fetch'

import Theme from './theme'
import app from './firebase'
import AppRouter from 'app/core/Router'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			refetchOnWindowFocus: false,
			queryFn: async ({ queryKey }) => {
				const region = 'us-central1'
				const projectId = (app.options as any).projectId

				const baseCloudUrl = `https://${region}-${projectId}.cloudfunctions.net/api`
				const baseLocalUrl = `http://localhost:5001/${projectId}/${region}/api`

				const baseUrl =
					import.meta.env.MODE === 'development' ? baseLocalUrl : baseCloudUrl

				const headers = new Headers({
					'Content-Type': 'application/json',
				})

				const currentUser = app.auth().currentUser
				if (currentUser) {
					let token = await currentUser.getIdToken()
					headers.set('Authorization', `Bearer ${token}`)
				}

				const response = await fetch(`${baseUrl}/${queryKey[0]}`, {
					headers,
				})

				if (response.ok) {
					return response.json()
				}

				const error = await response.text()
				throw new Error(error || response.statusText)
			},
		},
	},
})

ReactDOM.render(
	<React.StrictMode>
		<MuiThemeProvider theme={Theme}>
			<QueryClientProvider client={queryClient}>
				<CssBaseline />
				<Typography component='div'>
					<AppRouter />
				</Typography>

				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</MuiThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
)
