export default {
	dbName: 'raifu',
	type: 'postgresql',
	user: 'admin',
	password: 'secret',
	host: 'localhost',
	entities: ['**/*.entity.js'],
	entitiesTs: ['**/*.entity.ts'],
	debug: true,
	migrations: {
		path: __dirname + `/entities/_migrations`,
		pattern: /^[\w-]+\d+_?\S*\.ts$/,
	},
}
