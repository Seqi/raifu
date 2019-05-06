const armory = require('./src/armory')
const loadout = require('./src/loadout')
const loadoutWeapon = require('./src/loadout-weapon')
const loadoutGear = require('./src/loadout-gear')
const loadoutWeaponAttachments = require('./src/loadout-weapon-attachment')
const events = require('./src/event')

exports.weapons = armory.weapons
exports.attachments = armory.attachments
exports.gear = armory.gear
exports.loadouts = loadout
exports.loadouts.gear = loadoutGear
exports.loadouts.weapons = loadoutWeapon
exports.loadouts.weapons.attachments = loadoutWeaponAttachments
exports.events = events