import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { MuiThemeProvider, CssBaseline, Typography } from '@material-ui/core/'

import 'core-js/fn/array/flat-map'

import Theme from './Theme'
import App from 'app/core/App'

ReactDOM.render(
	<MuiThemeProvider theme={ Theme }>
		<CssBaseline />
		<Typography component='div'>
			<App />
		</Typography>
	</MuiThemeProvider>,
	document.getElementById('root')
)
