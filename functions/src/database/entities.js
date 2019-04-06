const Sequelize = require('sequelize')
const db = require('./database')

module.exports = () => {
	const sequelize = db()

	const armoryTable = {
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

	const gear = sequelize.define(
		'gear',
		{
			title: {
				type: Sequelize.STRING({ length: 64 }),
				allowNull: false
			},
			uid: {
				type: Sequelize.STRING({ length: 16 }),
				allowNull: false
			}
		},
		{
			freezeTableName: true
		}
	)

	const loadout = sequelize.define('loadout', {
		name: {
			type: Sequelize.STRING({ length: 64 }),
			allowNull: false
		},
		uid: {
			type: Sequelize.STRING({ length: 32 }),
			allowNull: false
		}
	})

	const loadoutWeapon = sequelize.define('loadout_weapon', {
		// If we don't force the ID here, the associations remove it
		id: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		loadout_id: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: loadout,
				key: 'id',
				deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
			}
		},
		weapon_id: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: weapon,
				key: 'id',
				deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
			}
		}
	})

	const loadoutWeaponAttachment = sequelize.define('loadout_weapon_attachment', {
		loadout_weapon_id: {
			type: Sequelize.INTEGER,
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
			type: Sequelize.INTEGER,
			primaryKey: true,
			allowNull: false,
			references: {
				model: loadout,
				key: 'id',
				deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
			}
		},
		weapon_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			allowNull: false,
			references: {
				model: weapon,
				key: 'id',
				deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
			}
		},
		attachment_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			allowNull: false,
			references: {
				model: attachment,
				key: 'id',
				deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
			}
		}
	})

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
	loadout.belongsToMany(weapon, {
		through: { model: loadoutWeaponAttachment, unique: false },
		foreignKey: 'loadout_id'
	})
	weapon.belongsToMany(loadout, {
		through: { model: loadoutWeaponAttachment, unique: false },
		foreignKey: 'weapon_id'
	})

	return {
		sequelize,
		weapon,
		attachment,
		gear,
		loadout,
		loadoutWeapon,
		loadoutWeaponAttachment
	}
}
