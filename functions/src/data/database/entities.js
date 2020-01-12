const Sequelize = require('sequelize')
const sequelize = require('./database')
const { applyHook, orderLoadoutItems } = require('./hooks/')


const armoryTable = {
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

const Weapon = sequelize.define('weapon', armoryTable)

const Attachment = sequelize.define('attachment', armoryTable)

const Gear = sequelize.define('gear', armoryTable, {
	freezeTableName: true
})

const Clothing = sequelize.define('clothing', armoryTable, {
	freezeTableName: true
})

const Loadout = sequelize.define('loadout', {
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
	hooks: {
		afterCreate: applyHook((loadout) => {
			// Saves doing a pointless join, helps the client see theres no 
			// weapons without any type checking
			loadout.weapons = []
		}),
		afterFind: applyHook(orderLoadoutItems)
	}
})

const LoadoutWeapon = sequelize.define('loadout_weapon', {
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
})

const LoadoutGear = sequelize.define('loadout_gear', {
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
}, { freezeTableName: true })

const LoadoutClothing = sequelize.define('loadout_clothing', {
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
}, { freezeTableName: true })

const LoadoutWeaponAttachment = sequelize.define('loadout_weapon_attachment', {
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
})

const Event = sequelize.define('event', {
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
	hooks: {
		afterFind: applyHook((event) => {
			if (event.users) {
				event.users.forEach(user => orderLoadoutItems(user.loadout))
			}
		})
	}
})

const EventUser = sequelize.define('event_users', {
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
})

// Event user association
Event.hasMany(EventUser, { foreignKey: 'event_id', as: 'users' })

// Loadout event user association
EventUser.belongsTo(Loadout, { foreignKey: 'loadout_id' })

// Loadout Weapon Associations
Loadout.belongsToMany(Weapon, { through: LoadoutWeapon, foreignKey: 'loadout_id' })
Weapon.belongsToMany(Loadout, { through: LoadoutWeapon, foreignKey: 'weapon_id' })
LoadoutWeapon.belongsTo(Loadout, { foreignKey: 'loadout_id' })
LoadoutWeapon.belongsTo(Weapon, { foreignKey: 'weapon_id' })

// Loadout Weapon Attachments Associations
Attachment.belongsToMany(LoadoutWeapon, { through: LoadoutWeaponAttachment, foreignKey: 'attachment_id' })
LoadoutWeapon.belongsToMany(Attachment, { through: LoadoutWeaponAttachment, foreignKey: 'loadout_weapon_id' })

// Hacky bit to make it all play nice with the child collections
Weapon.belongsToMany(Attachment, {
	through: { model: LoadoutWeaponAttachment, unique: false },
	foreignKey: 'weapon_id'
})
Attachment.belongsToMany(Weapon, {
	through: { model: LoadoutWeaponAttachment, unique: false },
	foreignKey: 'attachment_id'
})

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
