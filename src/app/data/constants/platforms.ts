export const platforms = {
	weapons: {
		rifles: ['M4', 'UAR', 'VZ.58'],
		smgs: [
			'MP5',
			'MP7',
			'MP9',
			'UMP45',
			'UMP9',
			'Vector',
			'MAC-10',
			'M1938',
			'M3A1 Grease Gun',
			'MP40',
			'PP-19 Bizon',
			'P90',
			'PPSH 41',
			'Scorpion',
			'Scorpion EVO 3',
			'Sterling',
			'Thompson',
			'Vityaz-SN',
		],
		snipers: [
			'ASW338LM',
			'Barret .50',
			'Kar98K',
			'L96',
			'M1873',
			'M1903',
			'M24',
			'M40',
			'MB44',
			'MSR',
			'STRIKER',
			'SVD',
			'VSR',
			'VSS',
		],
		shotguns: [
			'AA-12',
			'Benelli M4',
			'KSG',
			'M1014',
			'M870',
			'SAS-12',
			'SPAS-12',
			'STF-12',
		],
		pistols: [
			'G17',
			'G18',
			'G19',
			'1911',
			'Hi-Capa',
			'M9',
			'CZ 45',
			'CZ P-09',
			'CZ Shadow 2',
			'Desert Eagle',
			'F226',
			'F228',
			'Five-Seven',
			'HK45',
			'Luger',
			'Revolver',
			'M93R',
			'M&P',
			'Makarov',
			'MK23 Socom',
			'P14',
			'P226',
			'PX4',
			'TT-33',
			'USP',
			'XDM',
			'XP18',
		],
		support: ['M249', 'MG42', 'PKP', 'Trident LMG', 'Stoner', 'ZB26'],
		launchers: ['Bazooka', 'GL06', 'GLM', 'M052', 'M79', 'RPG-7'],
	},
	gear: {
		protection: [
			'Glasses',
			'Goggles',
			'Fast Helmet',
			'Full Face Helmet',
			'Half Face Mask',
			'Shemagh',
			'Knee Pads',
			'Elbow Pads',
		],
		carriers: ['Chest Rig', 'Plate Carrier', 'Belt', 'Pouch'],
		grenades: ['TRMR', 'Storm 360', 'Pyro/Strike', 'Claymore'],
		holsters: ['Leg Holster', 'Retention Holster', 'Scabbard', 'Sling'],
		communication: ['Radio', 'Headset'],
		misc: ['GoPro', 'Knife', 'Battery'],
	},
	attachments: {
		sights: ['Red Dot', 'Reflex', 'Holographic', 'Telescopic', 'Iron Sights'],
		barrel: ['Surpressor', 'Flash Hider', 'Tracer Unit'],
		illumination: ['Pistol Torch', 'Flashlight', 'PEQ Box'],
		underbarrel: ['Vertical Foregrip', 'Angled Foregrip', 'Bipod', 'Grenade Launcher'],
		externals: [
			'Stock',
			'Grip',
			'Rail Riser',
			'Rail System',
			'Conversion Kit',
			'Handguard Panel',
		],
	},
	clothing: {
		footwear: ['Boots', 'Shoes'],
		hands: ['Gloves'],
		hats: ['Cap'],
		jackets: ['Hoodie', 'Jacket', 'Smock', 'Sweatshirt'],
		legs: ['Pants', 'Shorts'],
		shirts: ['T-Shirt', 'Ubacs'],
		suits: ['Gorka'],
	},
} as const

type _Platform = typeof platforms

export type Category = keyof typeof platforms
export type PlatformOf<C extends Category> = keyof _Platform[C]
export type ArmoryItems<C extends Category, P extends PlatformOf<C>> = Extract<
	_Platform[C][P],
	readonly string[]
>[number]

export type WeaponPlatform = PlatformOf<'weapons'>
export type AttachmentPlatform = PlatformOf<'attachments'>
export type GearPlatform = PlatformOf<'gear'>
export type ClothingPlatform = PlatformOf<'clothing'>

export type Platform =
	| WeaponPlatform
	| AttachmentPlatform
	| GearPlatform
	| ClothingPlatform

export type Weapon = ArmoryItems<'weapons', WeaponPlatform>
export type Attachment = ArmoryItems<'attachments', AttachmentPlatform>
export type Gear = ArmoryItems<'gear', GearPlatform>
export type Clothing = ArmoryItems<'clothing', ClothingPlatform>

export type ArmoryItem = Weapon | Attachment | Gear | Clothing
