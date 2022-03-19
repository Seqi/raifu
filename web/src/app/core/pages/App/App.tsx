import { useState, FC } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Box, Container, Tabs, Tab, styled } from '@material-ui/core'

import useRouteAnalytics from 'app/shared/hooks/useRouteAnalytics'
import { Navbar } from 'app/core/layout'

let PaddedContainer = styled(Container)(({ theme }) => ({
	[theme.breakpoints.up('lg')]: {
		padding: theme.spacing(0, 5),
	},
}))

const App: FC = () => {
	const location = useLocation()
	useRouteAnalytics()

	let [tabIndex, setTabIndex] = useState<number>(() => {
		let idxMap: { [key: string]: number } = {
			armory: 0,
			loadouts: 1,
			events: 2,
		}

		let currPath = location.pathname.split('/')[2]

		return idxMap[currPath] || 0
	})

	return (
		<PaddedContainer maxWidth={false}>
			<Navbar logoProps={{ maxWidth: '200px' }} />

			<Tabs
				variant='fullWidth'
				centered={true}
				value={tabIndex}
				onChange={(evt, idx) => setTabIndex(idx)}
			>
				<Tab label='Armory' component={Link} to='armory' />
				<Tab label='Loadouts' component={Link} to='loadouts' />
				<Tab label='Events' component={Link} to='events' />
			</Tabs>

			<Box paddingY={{ xs: 3, sm: 6 }}>
				<Outlet />
			</Box>
		</PaddedContainer>
	)
}

export default App
