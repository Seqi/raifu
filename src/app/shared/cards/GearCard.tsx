import { ArmoryCard, ArmoryCardLike } from './ArmoryCard'

const GearCard: ArmoryCardLike = (props) => <ArmoryCard { ...props } category='gear' />
GearCard.template = ArmoryCard.template

export default GearCard
