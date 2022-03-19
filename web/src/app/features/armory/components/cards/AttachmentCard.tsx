import { FC } from 'react'

import { ArmoryCard, ArmoryCardProps } from './ArmoryCard'

type AttachmentCardProps = Omit<ArmoryCardProps, 'category'>
const AttachmentCard: FC<AttachmentCardProps> = (props: AttachmentCardProps) => (
	<ArmoryCard {...props} category='attachments' />
)

export default AttachmentCard
