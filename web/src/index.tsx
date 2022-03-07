import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { MuiThemeProvider, CssBaseline, Typography } from '@material-ui/core'

import 'core-js/fn/array/flat-map'
import 'whatwg-fetch'

import Theme from './theme'
import AppRouter from 'app/core/Router'

ReactDOM.render(
	<React.StrictMode>
		<MuiThemeProvider theme={ Theme }>
			<CssBaseline />
			<Typography component='div'>
				<AppRouter />
			</Typography>
		</MuiThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
)
