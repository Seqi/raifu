import React from 'react'
import { ArmoryCard, ArmoryCardContainer } from './ArmoryCard'

const GearCard = (props) => <ArmoryCard category='gear' { ...props } />
GearCard.template = ArmoryCardContainer

export default GearCard
