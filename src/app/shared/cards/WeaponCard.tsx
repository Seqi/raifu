import { ArmoryCard, ArmoryCardLike } from './ArmoryCard'

const WeaponCard: ArmoryCardLike = (props) => <ArmoryCard { ...props } category='weapons' />
WeaponCard.template = ArmoryCard.template

export default WeaponCard
