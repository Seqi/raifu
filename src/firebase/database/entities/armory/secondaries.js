import useAbstract from '../_abstract'
import { database } from '../..'

export default () => {
	let abstract = useAbstract(database)
	return {
		...abstract.useCrud('armory', 'secondaries')
	}
}
