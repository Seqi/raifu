const Sequelize = require('sequelize')

const db = require('./database')
const { applyHook, orderLoadoutItems } = require('./hooks/')

const armoryTableSchema = {
	id: {
		type: Sequelize.STRING({ length: 14 }),
		allowNull: false,
		primaryKey: true,
		defaultValue :''
	},
	platform: {
		type: Sequelize.STRING({ length: 64 }),
		allowNull: false
	},
	model: Sequelize.STRING({ length: 64 }),
	brand: Sequelize.STRING({ length: 64 }),
	nickname: Sequelize.STRING({ length: 64 }),
	type: {
		type: Sequelize.STRING({ length: 16 }),
		allowNull: false
	},
	uid: {
		type: Sequelize.STRING({ length: 32 }),
		allowNull: false
	}
}

class Weapon extends Sequelize.Model { }
Weapon.init(armoryTableSchema, { sequelize: db, modelName: 'weapon' })

class Attachment extends Sequelize.Model { }
Attachment.init(armoryTableSchema, { sequelize: db, modelName: 'attachment' })

class Gear extends Sequelize.Model { }
Gear.init(armoryTableSchema, { sequelize: db, modelName: 'gear', freezeTableName: true })

class Clothing extends Sequelize.Model { }
Clothing.init(armoryTableSchema, { sequelize: db, modelName: 'clothing', freezeTableName: true })

class Loadout extends Sequelize.Model { }
Loadout.init({
	id: {
		type: Sequelize.STRING({ length: 14 }),
		allowNull: false,
		primaryKey: true,
		defaultValue: ''
	},
	name: {
		type: Sequelize.STRING({ length: 64 }),
		allowNull: false
	},
	shared: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
	uid: {
		type: Sequelize.STRING({ length: 32 }),
		allowNull: false
	}
}, {
	sequelize: db,
	modelName: 'loadout',
	hooks: {
		afterCreate: applyHook((loadout) => {
			// Saves doing a pointless join, helps the client see theres no 
			// weapons without any type checking
			loadout.weapons = []
		}),
		afterFind: applyHook(orderLoadoutItems)
	}
})

class LoadoutWeapon extends Sequelize.Model { }
LoadoutWeapon.init({
	// If we don't force the ID here, the associations remove it
	id: {
		type: Sequelize.STRING({ length: 14 }),
		allowNull: false,
		primaryKey: true,
		defaultValue: ''
	},
	loadout_id: {
		type: Sequelize.STRING({ length: 14 }),
		allowNull: false,
		references: {
			model: Loadout,
			key: 'id',
			deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
		}
	},
	weapon_id: {
		type: Sequelize.STRING({ length: 14 }),
		allowNull: false,
		references: {
			model: Weapon,
			key: 'id',
			deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
		}
	}
}, { 
	sequelize: db, 
	modelName: 'loadout_weapon' 
})

class LoadoutGear extends Sequelize.Model { }
LoadoutGear.init({
	id: {
		type: Sequelize.STRING({ length: 14 }),
		allowNull: false,
		primaryKey: true,
		defaultValue: ''
	},
	loadout_id: {
		type: Sequelize.STRING({ length: 14 }),
		allowNull: false,
		references: {
			model: Loadout,
			key: 'id',
			deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
		}
	},
	gear_id: {
		type: Sequelize.STRING({ length: 14 }),
		allowNull: false,
		references: {
			model: Gear,
			key: 'id',
			deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
		}
	}
}, { 
	sequelize: db,
	modelName: 'loadout_gear',
	freezeTableName: true 
})

class LoadoutClothing extends Sequelize.Model { }
LoadoutClothing.init({
	id: {
		type: Sequelize.STRING({ length: 14 }),
		allowNull: false,
		primaryKey: true,
		defaultValue: ''
	},
	loadout_id: {
		type: Sequelize.STRING({ length: 14 }),
		allowNull: false,
		references: {
			model: Loadout,
			key: 'id',
			deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
		}
	},
	clothing_id: {
		type: Sequelize.STRING({ length: 14 }),
		allowNull: false,
		references: {
			model: Clothing,
			key: 'id',
			deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
		}
	}
}, { 
	sequelize: db,
	modelName: 'loadout_clothing',
	freezeTableName: true 
})

class LoadoutWeaponAttachment extends Sequelize.Model { }
LoadoutWeaponAttachment.init({
	loadout_weapon_id: {
		type: Sequelize.STRING({ length: 14 }),
		primaryKey: true,
		allowNull: false,
		references: {
			model: Weapon,
			key: 'id',
			deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
		}
	},
	// Hacky way to get joins to work
	loadout_id: {
		type: Sequelize.STRING({ length: 14 }),
		primaryKey: true,
		allowNull: false,
		references: {
			model: Loadout,
			key: 'id',
			deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
		}
	},
	weapon_id: {
		type: Sequelize.STRING({ length: 14 }),
		primaryKey: true,
		allowNull: false,
		references: {
			model: Weapon,
			key: 'id',
			deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
		}
	},
	attachment_id: {
		type: Sequelize.STRING({ length: 14 }),
		primaryKey: true,
		allowNull: false,
		references: {
			model: Attachment,
			key: 'id',
			deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
		}
	}
}, {
	sequelize: db,
	modelName: 'loadout_weapon_attachment'
})

class Event extends Sequelize.Model { }
Event.init({
	id: {
		type: Sequelize.STRING({ length: 14 }),
		allowNull: false,
		primaryKey: true,
		defaultValue: ''
	},
	name: {
		type: Sequelize.STRING({ length: 256 }),
		allowNull: false
	},
	location: {
		type: Sequelize.STRING({ length: 256 }),
		allowNull: false
	},
	date: {
		type: 'TIMESTAMP'
	},		
	organiser_uid: {
		type: Sequelize.STRING({ length: 32 }),
		allowNull: false
	},
	public: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	}
}, {
	sequelize: db,
	modelName: 'event',
	hooks: {
		afterFind: applyHook((event) => {
			if (event.users) {
				event.users.forEach(user => orderLoadoutItems(user.loadout))
			}
		})
	}
})

class EventUser extends Sequelize.Model { }
EventUser.init({
	id: {
		type: Sequelize.STRING({ length: 14 }),
		allowNull: false,
		primaryKey: true,
		defaultValue: ''
	},
	uid: {
		type: Sequelize.STRING({ length: 32 }),
		allowNull: false
	},
	event_id: {
		type: Sequelize.STRING({ length: 14 }),
		references: {
			model: Event,
			key: 'id',
			deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
		}
	},
	loadout_id: {
		type: Sequelize.STRING({ length: 14 }),
		references: {
			model: Loadout,
			key: 'id',
			deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
		}
	}
}, { 
	sequelize: db,
	modelName: 'event_user'
})

// Event User association
Event.hasMany(EventUser, { foreignKey: 'event_id', as: 'users' })

// Loadout Event user association
EventUser.belongsTo(Loadout, { foreignKey: 'loadout_id' })

// Loadout Weapon Associations
Loadout.belongsToMany(Weapon, { through: LoadoutWeapon, foreignKey: 'loadout_id' })
Weapon.belongsToMany(Loadout, { through: LoadoutWeapon, foreignKey: 'weapon_id' })

// Loadout Weapon Attachments Associations
Weapon.belongsToMany(Attachment, { through: { model: LoadoutWeaponAttachment, unique: false }, foreignKey: 'weapon_id' })
Attachment.belongsToMany(Weapon, { through: { model: LoadoutWeaponAttachment, unique: false }, foreignKey: 'attachment_id' })

// This is necessary for the hasPermission query which joins LoadoutWeapon to Loadout and Weapon
LoadoutWeapon.belongsTo(Weapon, { foreignKey: 'weapon_id' })
LoadoutWeapon.belongsTo(Loadout, { foreignKey: 'loadout_id' })

// Loadout Gear Associations
Loadout.belongsToMany(Gear, { through: LoadoutGear, foreignKey: 'loadout_id', as: 'gear'})
Gear.belongsToMany(Loadout, { through: LoadoutGear, foreignKey: 'gear_id' })

// Loadout Clothing Associations
Loadout.belongsToMany(Clothing, { through: LoadoutClothing, foreignKey: 'loadout_id', as: 'clothing'})
Clothing.belongsToMany(Loadout, { through: LoadoutClothing, foreignKey: 'clothing_id' })

module.exports = {
	Weapon,
	Attachment,
	Gear,
	Clothing,
	Loadout,
	LoadoutWeapon,
	LoadoutWeaponAttachment,
	LoadoutGear,
	LoadoutClothing,
	Event,
	EventUser
}
