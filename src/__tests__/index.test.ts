// eslint-disable-next-line @typescript-eslint/no-var-requires
const SeervisionInstance = require('../index')
import getActions from '../elements/actions'
import Api from '../api'

jest.mock('../api')
jest.mock(
	'../../../../instance_skel',
	() =>
		class MockInstanceSkeleton {
			config

			constructor(system: any, id: string, config) {
				this.config = config
			}
		},
	{ virtual: true }
)

const api: Api = new (Api as jest.Mock)()

describe('SeervisionInstance', () => {
	let unknownActionHandler: null | jest.SpyInstance = null

	afterEach(() => {
		unknownActionHandler?.mockRestore()
	})

	it('handles every available action', () => {
		const instance = new SeervisionInstance(jest.fn(), '', { host: '' })
		unknownActionHandler = jest.spyOn(instance, 'handleUnknownAction')
		const actions = getActions(api)
		Object.keys(actions).forEach((action) => {
			instance.action({ action, options: {}, id: '' })
			expect(unknownActionHandler).not.toHaveBeenCalled()
		})
	})
})
