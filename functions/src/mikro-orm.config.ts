export default {
	type: 'postgresql',
	dbName: process.env.DB_NAME || 'raifu',
	user: process.env.DB_USER || 'admin',
	password: process.env.DB_PASSWORD || 'secret',
	host: process.env.DB_HOST || 'localhost',
	entities: ['**/*.entity.js'],
	entitiesTs: ['**/*.entity.ts'],
	debug: true,
	migrations: {
		path: __dirname + `/entities/_migrations`,
		pattern: /^[\w-]+\d+_?\S*\.ts$/,
	},
}
