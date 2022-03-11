import { FC } from 'react'

import { ArmoryCard, ArmoryCardProps } from './ArmoryCard'

export type ClothingCardProps = Omit<ArmoryCardProps, 'category'>
export const ClothingCard: FC<ClothingCardProps> = (props: ClothingCardProps) => (
	<ArmoryCard {...props} category='clothing' />
)

export default ClothingCard
