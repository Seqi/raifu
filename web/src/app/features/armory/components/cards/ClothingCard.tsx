import { FC } from 'react'

import { ArmoryCard, ArmoryCardProps } from './ArmoryCard'

type ClothingCardProps = Omit<ArmoryCardProps, 'category'>
const ClothingCard: FC<ClothingCardProps> = (props: ClothingCardProps) => (
	<ArmoryCard {...props} category='clothing' />
)

export default ClothingCard
