import { styled, Typography } from '@material-ui/core'

export const LoadoutWeaponTitle = styled(Typography)(({ theme }) => ({
	fontSize: '2rem',
	marginBottom: theme.spacing(2),

	[theme.breakpoints.down('md')]: {
		fontSize: '1.8rem',
	},
	[theme.breakpoints.down('sm')]: {
		fontSize: '1.5rem',
	},
	[theme.breakpoints.down('xs')]: {
		marginBottom: theme.spacing(1),
	},
}))
