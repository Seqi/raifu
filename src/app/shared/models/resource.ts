import PropTypes from 'prop-types'

export interface Resource {
	id: string
	createdAt?: string | null
	updatedAt?: string | null

	getTitle: () => string
	getSubtitle: () => string
}

export const ResourcePropShape = {
	id: PropTypes.string.isRequired,

	createdAt: PropTypes.string,
	updatedAt: PropTypes.string,

	getTitle: PropTypes.func.isRequired,
	getSubtitle: PropTypes.func.isRequired,
}
