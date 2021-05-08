import { Box, styled } from '@material-ui/core'

let LoadoutSeparator = styled(Box)(({ theme }) => ({
	position: 'relative',
	padding: theme.spacing(8, 0),

	[theme.breakpoints.down('xs')]: {
		padding: theme.spacing(2, 0),
	},
	'&:not(:first-child)': {
		'&::before': {
			content: '""',
			width: '30%',
			position: 'absolute',
			top: 0,
			left: '35%',
			borderTop: `2px solid ${theme.palette.primary.main}`,
		},
	},
}))

export default LoadoutSeparator
