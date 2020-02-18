import React, { useState, useEffect, useCallback, useRef } from 'react'

import { ErrorOverlay, LoadingOverlay } from 'app/shared'
import { ResourceList } from 'app/shared/resources'
import { AddWeaponDialog, AddAttachmentDialog, AddGearDialog, AddClothingDialog } from './dialogs'

import {  } from 'app/data/api'

const defaultState = {armory: null, loading: true, error: false}

let Armory = () => {
	let [{ armory, loading, error }, setArmory] = useState(defaultState)

	let mounted = useRef(true)

	useEffect(() => () => mounted.current = false, [])

	let loadArmory = useCallback(() => {
		setArmory(defaultState)

		armoryService.get()
			.then(result => mounted && setArmory({ armory: result, loading: false }))			
			.catch(e => mounted && setArmory({ error: true, loading: false }))
	}, [])

	useEffect(() => { loadArmory() }, [loadArmory])

	if (loading) {
		return <LoadingOverlay />
	}

	if (error) {
		return <ErrorOverlay message='Could not load armory.' onRetry={ loadArmory } />
	}

	return (
		<React.Fragment>
			<section>
				<div className='section-container'>
					<ResourceList
						items={ armory.weapons }
						resource={ database.weapons }
						resourceType='weapons'
						renderAddDialog={ (isOpen, onClose, onSave) => (
							<AddWeaponDialog isOpen={ isOpen } onClose={ onClose } onSave={ onSave } />
						) } 
					/>
				</div>
			</section>

			<section>
				<div className='section-container'>
					<ResourceList
						items={ armory.attachments }
						resource={ database.attachments }
						resourceType='attachments'
						renderAddDialog={ (isOpen, onClose, onSave) => (
							<AddAttachmentDialog isOpen={ isOpen } onClose={ onClose } onSave={ onSave } />
						) } 
					/>
				</div>
			</section>

			<section>
				<div className='section-container'>
					<ResourceList
						items={ armory.gear }
						resource={ database.gear }
						resourceType='gear'
						renderAddDialog={ (isOpen, onClose, onSave) => (
							<AddGearDialog isOpen={ isOpen } onClose={ onClose } onSave={ onSave } />
						) } 
					/>
				</div>
			</section>

			<section>
				<div className='section-container'>
					<ResourceList
						items={ armory.clothing }
						resource={ database.clothing }
						resourceType='clothing'
						renderAddDialog={ (isOpen, onClose, onSave) => (
							<AddClothingDialog isOpen={ isOpen } onClose={ onClose } onSave={ onSave } />
						) } 
					/>
				</div>
			</section>
		</React.Fragment>
	)
}

export default Armory
