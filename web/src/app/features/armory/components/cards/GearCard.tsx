import { FC } from 'react'

import { ArmoryCard, ArmoryCardProps } from './ArmoryCard'

type GearCardProps = Omit<ArmoryCardProps, 'category'>
const GearCard: FC<GearCardProps> = (props: GearCardProps) => (
	<ArmoryCard {...props} category='gear' />
)

export default GearCard
