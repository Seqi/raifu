import React from 'react'

import { Chip, Tooltip, Box } from '@material-ui/core'
import { RouteChildrenProps } from 'react-router-dom'

import { loadouts } from 'app/data/api'
import { LoadingOverlay, ErrorOverlay } from 'app/shared/state'
import { LoadoutView } from 'app/features/loadouts'

import LoadoutActions from './LoadoutActions'
import firebase from '../../../../../firebase'
import { Loadout } from '../../models'
import { SidewaysTitle } from 'app/shared/text/SidewaysTitle'

let analytics = firebase.analytics()

type LoadoutPageProps = RouteChildrenProps<{ id: string }>
type LoadoutPageState = {
	loadout?: Loadout
	shared: boolean
	loading: boolean
	error?: any
}

class LoadoutPage extends React.Component<LoadoutPageProps, LoadoutPageState> {
	private isUnmounted: boolean = false

	constructor(props: LoadoutPageProps) {
		super(props)
		this.state = {
			shared: false,
			loading: true,
		}
	}

	componentDidMount() {
		this.loadLoadout()
	}

	loadLoadout() {
		this.setState({ loading: true, error: null }, () => {
			loadouts
				.getById(this.props.match!.params.id)
				.then((loadout) => {
					if (!this.isUnmounted) {
						this.setState({ loadout, shared: loadout.shared, loading: false })
					}
				})
				.catch((err) => {
					if (!this.isUnmounted) {
						this.setState({ error: err, loading: false })
					}
				})
		})
	}

	editLoadout(updatedLoadout: Loadout): Promise<void> {
		let { loadout } = this.state

		return loadouts
			.edit(loadout!.id, { ...updatedLoadout })
			.then(() =>
				this.setState(({ loadout }) => {
					// TODO: Check this is right
					let newLoadout = {
						...loadout,
						...updatedLoadout,
					}

					return { loadout: newLoadout }
				})
			)
			.then(() => analytics.logEvent('loadout_updated'))
	}

	setShared(shared: boolean) {
		shared ? analytics.logEvent('loadout_shared') : analytics.logEvent('loadout_unshared')
		this.setState({ shared })
	}

	render() {
		let { loading, error, loadout, shared } = this.state

		if (loading) {
			return <LoadingOverlay />
		}

		if (error) {
			if (error.status === 404) {
				return <ErrorOverlay message='Loadout not found.' icon='fa fa-crosshairs' />
			}

			return (
				<ErrorOverlay
					message='Could not load loadout.'
					onRetry={ () => this.loadLoadout() }
				/>
			)
		}

		return (
			<Box display='flex'>
				<SidewaysTitle title={ loadout!.name } />
				{shared && (
					<Box component='span' paddingLeft={ 1 }>
						<Tooltip placement='right' title='Loadout has been shared!'>
							<Chip label='Shared' size='small' color='primary' />
						</Tooltip>
					</Box>
				)}
				<div>
					<LoadoutView loadout={ loadout! } editable={ true } />
				</div>

				<LoadoutActions
					loadout={ loadout! }
					editLoadout={ (loadout) => this.editLoadout(loadout) }
					onSharedChanged={ (shared) => this.setShared(shared) }
				/>
			</Box>
		)
	}
}

export default LoadoutPage
