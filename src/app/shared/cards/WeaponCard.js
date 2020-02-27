import React from 'react'
import { ArmoryCard, ArmoryCardContainer } from './ArmoryCard'

const WeaponCard = props => <ArmoryCard category='weapons' { ...props } />
WeaponCard.template = ArmoryCardContainer

export default WeaponCard
