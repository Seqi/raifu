import { Box, styled } from '@material-ui/core'

let LoadoutSeparator = styled(Box)(({ theme }) => ({
	borderTop: '1px solid',
	borderColor: theme.palette.primary.main,
	padding: theme.spacing(3, 0),

	[theme.breakpoints.down('xs')]: {
		padding: theme.spacing(2, 0)
	}
}))

export default LoadoutSeparator
