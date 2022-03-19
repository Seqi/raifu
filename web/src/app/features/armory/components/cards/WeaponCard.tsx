import { FC } from 'react'
import { ArmoryCard, ArmoryCardProps } from './ArmoryCard'

type WeaponCardProps = Omit<ArmoryCardProps, 'category'>
const WeaponCard: FC<WeaponCardProps> = (props: WeaponCardProps) => (
	<ArmoryCard {...props} category='weapons' />
)

export default WeaponCard
