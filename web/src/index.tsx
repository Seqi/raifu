import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { MuiThemeProvider, CssBaseline, Typography } from '@material-ui/core'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import 'core-js/fn/array/flat-map'
import 'whatwg-fetch'

import Theme from './theme'
import AppRouter from 'app/core/Router'

const queryClient = new QueryClient()

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
