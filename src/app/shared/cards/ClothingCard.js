import React from 'react'
import { ArmoryCard, ArmoryCardContainer } from './ArmoryCard'

const ClothingCard = (props) => <ArmoryCard category='clothing' {...props} />
ClothingCard.template = ArmoryCardContainer

export default ClothingCard
