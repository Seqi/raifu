import './index.css'
import React from 'react'
import { MuiThemeProvider, CssBaseline } from '@material-ui/core/'
import ReactDOM from 'react-dom'
import App from './app/core/App'
import Theme from './Theme'

ReactDOM.render(
	<MuiThemeProvider theme={ Theme }>
		<CssBaseline />
		<App />
	</MuiThemeProvider>,
	document.getElementById('root')
)
