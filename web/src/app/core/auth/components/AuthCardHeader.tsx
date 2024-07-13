import { CardHeader } from '@mui/material'
import { withStyles } from '@mui/styles'

const AuthCardHeader = withStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.primary.main,
		textAlign: 'center',
	},
	title: {
		fontSize: '1.1rem !important',
		fontWeight: 700,
	},
}))(CardHeader)

export default AuthCardHeader
