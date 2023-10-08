import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { MuiThemeProvider, CssBaseline, Typography } from '@material-ui/core'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import 'core-js/fn/array/flat-map'
import 'whatwg-fetch'

import Theme from './theme'
import app from './firebase'
import AppRouter from 'app/core/Router'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			queryFn: ({ queryKey }) => {
				const region = 'us-central1'
				const projectId = (app.options as any).projectId

				const baseCloudUrl = `https://${region}-${projectId}.cloudfunctions.net/api`
				const baseLocalUrl = `http://localhost:5001/${projectId}/${region}/api`

				const baseUrl =
					import.meta.env.MODE === 'development' ? baseLocalUrl : baseCloudUrl

				console.log('query key', queryKey)
				return fetch(`${baseUrl}/${queryKey[0]}`)
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
			</QueryClientProvider>
		</MuiThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
)
