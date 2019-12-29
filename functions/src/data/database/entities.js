const Sequelize = require('sequelize')
const db = require('./database')
const mapEntities = require('./map-entities')
const jsonifyDates = require('./jsonify-dates')

let entities = null

let initEntities = () => {
	const sequelize = db()

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

	const weapon = sequelize.define('weapon', armoryTable)

	const attachment = sequelize.define('attachment', armoryTable)

	const gear = sequelize.define('gear', armoryTable, {
		freezeTableName: true
	})

	const clothing = sequelize.define('clothing', armoryTable, {
		freezeTableName: true
	})

	const loadout = sequelize.define('loadout', {
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
			afterCreate: (loadout) => {
				// Saves doing a pointless join
				loadout.dataValues.weapons = []
				jsonifyDates(loadout)
			}
		}
	})

	const loadoutWeapon = sequelize.define('loadout_weapon', {
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
				model: loadout,
				key: 'id',
				deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
			}
		},
		weapon_id: {
			type: Sequelize.STRING({ length: 14 }),
			allowNull: false,
			references: {
				model: weapon,
				key: 'id',
				deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
			}
		}
	})

	const loadoutGear = sequelize.define('loadout_gear', {
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
				model: loadout,
				key: 'id',
				deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
			}
		},
		gear_id: {
			type: Sequelize.STRING({ length: 14 }),
			allowNull: false,
			references: {
				model: gear,
				key: 'id',
				deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
			}
		}
	}, { freezeTableName: true })

	const loadoutClothing = sequelize.define('loadout_clothing', {
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
				model: loadout,
				key: 'id',
				deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
			}
		},
		clothing_id: {
			type: Sequelize.STRING({ length: 14 }),
			allowNull: false,
			references: {
				model: clothing,
				key: 'id',
				deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
			}
		}
	}, { freezeTableName: true })

	const loadoutWeaponAttachment = sequelize.define('loadout_weapon_attachment', {
		loadout_weapon_id: {
			type: Sequelize.STRING({ length: 14 }),
			primaryKey: true,
			allowNull: false,
			references: {
				model: weapon,
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
				model: loadout,
				key: 'id',
				deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
			}
		},
		weapon_id: {
			type: Sequelize.STRING({ length: 14 }),
			primaryKey: true,
			allowNull: false,
			references: {
				model: weapon,
				key: 'id',
				deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
			}
		},
		attachment_id: {
			type: Sequelize.STRING({ length: 14 }),
			primaryKey: true,
			allowNull: false,
			references: {
				model: attachment,
				key: 'id',
				deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
			}
		}
	})

	const event = sequelize.define('event', {
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
			afterFind: (events) => {
				mapEntities(events, event => {
					if (event.date) {
						event.date = event.date.toISOString()
					}
				})
			},
			afterCreate: (event) => {
				if (event.date) {
					event.date = event.date.toISOString()
				}
				jsonifyDates(event)
			}
		}
	})

	const eventUser = sequelize.define('event_users', {
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
				model: event,
				key: 'id',
				deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
			}
		},
		loadout_id: {
			type: Sequelize.STRING({ length: 14 }),
			references: {
				model: loadout,
				key: 'id',
				deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
			}
		}
	})

	// Event user association
	event.hasMany(eventUser, { foreignKey: 'event_id', as: 'users' })

	// Loadout event user association
	eventUser.belongsTo(loadout, { foreignKey: 'loadout_id' })

	// Loadout Weapon Associations
	loadout.belongsToMany(weapon, { through: loadoutWeapon, foreignKey: 'loadout_id' })
	weapon.belongsToMany(loadout, { through: loadoutWeapon, foreignKey: 'weapon_id' })
	loadoutWeapon.belongsTo(loadout, { foreignKey: 'loadout_id' })
	loadoutWeapon.belongsTo(weapon, { foreignKey: 'weapon_id' })

	// Loadout Weapon Attachments Associations
	attachment.belongsToMany(loadoutWeapon, { through: loadoutWeaponAttachment, foreignKey: 'attachment_id' })
	loadoutWeapon.belongsToMany(attachment, { through: loadoutWeaponAttachment, foreignKey: 'loadout_weapon_id' })

	// Hacky bit to make it all play nice with the child collections
	weapon.belongsToMany(attachment, {
		through: { model: loadoutWeaponAttachment, unique: false },
		foreignKey: 'weapon_id'
	})
	attachment.belongsToMany(weapon, {
		through: { model: loadoutWeaponAttachment, unique: false },
		foreignKey: 'attachment_id'
	})

	// Loadout Gear Associations
	loadout.belongsToMany(gear, { through: loadoutGear, foreignKey: 'loadout_id', as: 'gear'})
	gear.belongsToMany(loadout, { through: loadoutGear, foreignKey: 'gear_id' })

	// Loadout Clothing Associations
	loadout.belongsToMany(clothing, { through: loadoutClothing, foreignKey: 'loadout_id', as: 'clothing'})
	clothing.belongsToMany(loadout, { through: loadoutClothing, foreignKey: 'clothing_id' })

	return {
		weapon,
		attachment,
		gear,
		clothing,
		loadout,
		loadoutWeapon,
		loadoutWeaponAttachment,
		loadoutGear,
		loadoutClothing,
		event,
		eventUser
	}
}

module.exports = () => {
	if (entities == null) {
		entities = initEntities()
	}

	return entities
}
