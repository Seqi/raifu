import PropTypes from 'prop-types'

export interface Resource {
	id: string
	createdAt: Date
	updatedAt: Date

	getTitle: () => string
	getSubtitle: () => string
}

export const ResourcePropShape = {
	id: PropTypes.string.isRequired,

	createdAt: PropTypes.instanceOf(Date).isRequired,
	updatedAt: PropTypes.instanceOf(Date).isRequired,

	getTitle: PropTypes.func.isRequired,
	getSubtitle: PropTypes.func.isRequired,
}
