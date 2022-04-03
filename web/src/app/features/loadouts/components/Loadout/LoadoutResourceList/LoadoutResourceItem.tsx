import { FC } from 'react'
import PropTypes from 'prop-types'

import { Box, styled, Theme, useMediaQuery } from '@material-ui/core'

import { ArmoryItem, ArmoryItemImage, ArmoryItemPropShape } from 'app/features/armory'
import { DeletableOverlay } from 'app/shared/actions/delete'
import { Category } from 'app/data/constants/platforms'

const RelativeContainer = styled(Box)({
	height: '100%',
	position: 'relative',
	display: 'flex',
	flexDirection: 'column',
})

const ResourceImageTitle = styled(Box)({
	textAlign: 'right',
	width: '100%',
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
	const sm = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

	return (
		<RelativeContainer>
			<DeletableOverlay
				canDelete={canDelete}
				onDelete={() => onDelete(item)}
				dialogTitle={item.getTitle()}
				small={sm}
			>
				<ArmoryItemImage
					resource={item}
					resourceType={resourceType}
					rotate={resourceType === 'attachments'}
					style={{ height: 'auto', flex: 1 }}
				/>

				<ResourceImageTitle className='item-text'>{item.getTitle()}</ResourceImageTitle>
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
