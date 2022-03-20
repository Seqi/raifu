import React from 'react'
import { useParams } from 'react-router-dom'

import { loadouts } from 'app/data/api'
import { LoadingOverlay, ErrorOverlay } from 'app/shared/state'
import { LoadoutView } from 'app/features/loadouts'

import firebase from '../../../../../firebase'
import { Loadout } from '../../models'
import LoadoutActions from './LoadoutActions'

let analytics = firebase.analytics()

type LoadoutPageProps = {
	params: {
		id: string
	}
}
type LoadoutPageState = {
	loadout?: Loadout
	loading: boolean
	error?: any
}

class LoadoutPage extends React.Component<LoadoutPageProps, LoadoutPageState> {
	private isUnmounted: boolean = false

	constructor(props: LoadoutPageProps) {
		super(props)
		this.state = {
			loading: true,
		}
	}

	componentDidMount() {
		this.loadLoadout()
	}

	loadLoadout() {
		this.setState({ loading: true, error: null }, () => {
			loadouts
				.getById(this.props.params.id)
				.then((loadout) => {
					if (!this.isUnmounted) {
						this.setState({ loadout, loading: false })
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
		this.setState(({ loadout }) => {
			return {
				loadout: { ...loadout!, shared },
			}
		})
	}

	render() {
		let { loading, error, loadout } = this.state

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
					onRetry={() => this.loadLoadout()}
				/>
			)
		}

		return (
			<>
				<LoadoutView loadout={loadout!} editable={true} />

				<LoadoutActions
					loadout={loadout!}
					editLoadout={(loadout) => this.editLoadout(loadout)}
					onSharedChanged={(shared) => this.setShared(shared)}
				/>
			</>
		)
	}
}

// Before moving to functional compnoents
function withParams(Component: React.ComponentType<any>) {
	// eslint-disable-next-line
	return (props: any) => <Component { ...props } params={ useParams() } />
}

export default withParams(LoadoutPage)
