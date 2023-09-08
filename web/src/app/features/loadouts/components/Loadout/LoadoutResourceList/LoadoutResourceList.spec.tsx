import { ReactElement } from 'react'
import { render, RenderOptions, screen } from '@testing-library/react'
import { MuiThemeProvider } from '@material-ui/core'

import { buildAttachment, buildLoadout } from 'test/builders'
import { Loadout } from '../../../models'
import Theme from 'theme'
import { LoadoutContext, LoadoutContextValue } from '../LoadoutContext'
import LoadoutResourceList from './LoadoutResourceList'

describe('Loadout resource list', () => {
	const renderWithContext = (
		ui: ReactElement,
		context: { loadout: Loadout; editable: boolean },
		options?: RenderOptions
	) => {
		const contextVals: LoadoutContextValue = {
			loadout: context.loadout,
			editable: context.editable,
			addWeapon: vi.fn(),
			deleteWeapon: vi.fn(),
			addClothing: vi.fn(),
			deleteClothing: vi.fn(),
			addGear: vi.fn(),
			deleteGear: vi.fn(),
			addWeaponAttachments: vi.fn(),
			deleteWeaponAttachment: vi.fn(),
		}

		return {
			...render(
				<MuiThemeProvider theme={Theme}>
					<LoadoutContext.Provider value={contextVals}>{ui}</LoadoutContext.Provider>
				</MuiThemeProvider>,
				options
			),
			context: contextVals,
		}
	}

	it('should display add button if items can be added', async () => {
		const loadout = buildLoadout()
		const resources = Array.from(Array(1), () => buildAttachment())
		const addItem = vi.fn()
		const deleteItem = vi.fn()
		const renderAddDialog = vi.fn()

		const firstResource = resources[0]

		renderWithContext(
			<LoadoutResourceList
				items={resources}
				resourceType='attachments'
				canAdd={true}
				addItem={addItem}
				deleteItem={deleteItem}
				renderAddDialog={renderAddDialog}
			/>,
			{ loadout, editable: true }
		)

		// Get the images
		const image = await screen.findByAltText(firstResource.platform)
		expect(image).toBeInTheDocument()
	})
})
