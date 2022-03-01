import PropTypes from 'prop-types'

export interface Resource {
	id: string
	createdAt: string | Date
	updatedAt: string | Date

	getTitle: () => string
	getSubtitle: () => string
}

export const ResourcePropShape = {
	id: PropTypes.string.isRequired,

	createdAt: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
		.isRequired,
	updatedAt: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
		.isRequired,

	getTitle: PropTypes.func.isRequired,
	getSubtitle: PropTypes.func.isRequired,
}
