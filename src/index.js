import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { MuiThemeProvider, CssBaseline, Typography } from '@material-ui/core/'

import 'core-js/fn/array/flat-map'
import 'whatwg-fetch'

import Theme from './Theme'
import Site from 'app/core/Site'

ReactDOM.render(
	<MuiThemeProvider theme={ Theme }>
		<CssBaseline />
		<Typography component='div'>
			<Site />
		</Typography>
	</MuiThemeProvider>,
	document.getElementById('root')
)
