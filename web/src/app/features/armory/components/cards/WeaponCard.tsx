import { FC } from 'react'
import { ArmoryCard, ArmoryCardProps } from './ArmoryCard'

export type WeaponCardProps = Omit<ArmoryCardProps, 'category'>
export const WeaponCard: FC<WeaponCardProps> = (props: WeaponCardProps) => (
	<ArmoryCard {...props} category='weapons' />
)

export default WeaponCard
