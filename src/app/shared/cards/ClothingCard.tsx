import { ArmoryCard, ArmoryCardLike } from './ArmoryCard'

const ClothingCard: ArmoryCardLike = (props) => (
	<ArmoryCard { ...props } category='clothing' />
)

ClothingCard.template = ArmoryCard.template

export default ClothingCard
