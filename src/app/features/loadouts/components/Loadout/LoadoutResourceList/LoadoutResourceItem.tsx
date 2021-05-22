import { FC } from 'react'
import PropTypes from 'prop-types'

import { Box, styled } from '@material-ui/core'

import { ArmoryItem, ArmoryItemImage, ArmoryItemPropShape } from 'app/features/armory'
import { DeletableOverlay } from 'app/shared/actions/delete'
import { Category } from 'app/data/constants/platforms'

const RelativeContainer = styled(Box)({
	height: '100%',
	position: 'relative',
})

const ResourceImageTitle = styled(Box)({
	textAlign: 'right',
	fontSize: '1rem',
})

type LoadoutResourceItemProps<R extends ArmoryItem = ArmoryItem> = {
	resourceType: Category // TODO: Restrict by removing weapons,
	item: R
	canDelete?: boolean
	onDelete?: (item: R) => any
}

const LoadoutResourceItem: FC<LoadoutResourceItemProps> = <R extends ArmoryItem>({
	resourceType,
	item,
	canDelete = false,
	onDelete = (item: R) => {},
}: LoadoutResourceItemProps<R>) => {
	return (
		<RelativeContainer>
			<DeletableOverlay
				canDelete={ canDelete }
				onDelete={ () => onDelete(item) }
				dialogTitle={ item.getTitle() }
			>
				<ArmoryItemImage
					resource={ item }
					resourceType={ resourceType }
					rotate={ resourceType === 'attachments' }
					style={ { height: 'auto', maxHeight: '100%' } }
				/>

				<ResourceImageTitle>{item.getTitle()}</ResourceImageTitle>
			</DeletableOverlay>
		</RelativeContainer>
	)
}

LoadoutResourceItem.propTypes = {
	resourceType: PropTypes.oneOf(['attachments', 'gear', 'clothing'] as const).isRequired,
	item: PropTypes.shape(ArmoryItemPropShape).isRequired,
	canDelete: PropTypes.bool,
	onDelete: PropTypes.func,
}

LoadoutResourceItem.defaultProps = {
	canDelete: false,
	onDelete: (itemId) => {},
}

export default LoadoutResourceItem
