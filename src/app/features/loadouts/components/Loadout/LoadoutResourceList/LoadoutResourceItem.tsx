import { FC } from 'react'
import PropTypes from 'prop-types'

import { Box, styled } from '@material-ui/core'

import { ArmoryItem, ArmoryItemImage, ArmoryItemPropShape } from 'app/features/armory'
import { DeletableOverlay } from 'app/shared/actions/delete'
import { Category } from 'app/data/constants/platforms'

const RelativeContainer = styled(Box)({
	display: 'flex',
	alignItems: 'center',

	position: 'relative',
	height: '100%',
})

const ResourceImageTitle = styled(Box)({
	position: 'absolute',
	bottom: '10px',
	right: 0,
	fontSize: '16px',
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
