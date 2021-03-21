import PropTypes from 'prop-types'

export interface Resource {
	id: string
	createdAt: string
	updatedAt: string

	getTitle: () => string
	getSubtitle: () => string
}

export const ResourcePropShape = {
	id: PropTypes.string.isRequired,

	createdAt: PropTypes.string.isRequired,
	updatedAt: PropTypes.string.isRequired,

	getTitle: PropTypes.func.isRequired,
	getSubtitle: PropTypes.func.isRequired,
}
