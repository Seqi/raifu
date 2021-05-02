import { FC } from 'react'

import { ArmoryCard, ArmoryCardProps } from './ArmoryCard'

export type AttachmentCardProps = Omit<ArmoryCardProps, 'category'>
export const AttachmentCard: FC<AttachmentCardProps> = (props: AttachmentCardProps) => (
	<ArmoryCard { ...props } category='attachments' size='small' />
)

export default AttachmentCard
