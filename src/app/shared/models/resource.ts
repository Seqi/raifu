export interface Resource {
	id: string
	createdAt: Date
	updatedAt: Date

	getTitle: () => string
	getSubtitle: () => string
}
