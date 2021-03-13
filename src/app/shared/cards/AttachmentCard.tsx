import { ArmoryCard, ArmoryCardLike } from './ArmoryCard'

const AttachmentCard: ArmoryCardLike = (props) => (
	<ArmoryCard { ...props } category='attachments' />
)

AttachmentCard.template = ArmoryCard.template

export default AttachmentCard
