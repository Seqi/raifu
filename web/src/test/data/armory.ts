import { buildAttachment, buildClothing, buildGear, buildWeapon } from '../builders'

const weapons = Array.from({ length: 5 }, () => buildWeapon())
const attachments = Array.from({ length: 5 }, () => buildAttachment())
const gear = Array.from({ length: 5 }, () => buildGear())
const clothing = Array.from({ length: 5 }, () => buildClothing())

export function getWeapons() {
	return weapons
}

export function getAttachments() {
	return attachments
}

export function getGear() {
	return gear
}

export function getClothing() {
	return clothing
}

export function getArmory() {
	return {
		weapons: getWeapons(),
		attachments: getAttachments(),
		gear: getGear(),
		clothing: getClothing(),
	}
}
