import React from 'react'
import { ArmoryCard, ArmoryCardContainer } from './ArmoryCard'

const AttachmentCard = (props) => <ArmoryCard category='attachments' {...props} />
AttachmentCard.template = ArmoryCardContainer

export default AttachmentCard
