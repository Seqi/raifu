export default {
	dbName: 'raifu',
	type: 'postgresql',
	user: 'admin',
	password: 'secret',
	host: 'localhost',
	entities: ['**/*.entity.js'],
	entitiesTs: ['**/*.entity.ts'],
	migrations: {
		path: __dirname + `/entities/_migrations`,
	},
}
