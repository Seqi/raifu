import { FC } from 'react'

import { ArmoryCard, ArmoryCardProps } from './ArmoryCard'

export type GearCardProps = Omit<ArmoryCardProps, 'category'>
export const GearCard: FC<GearCardProps> = (props: GearCardProps) => (
	<ArmoryCard {...props} category='gear' />
)

export default GearCard
