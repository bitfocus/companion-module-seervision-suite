import getActions from '../actions'
import Api from '../../api'

jest.mock('../../api')

const ACTIONS_COUNT = 16

const api: Api = new (Api as jest.Mock)()

describe('actions', () => {
	it(`returns ${ACTIONS_COUNT} actions`, () => {
		const actions = getActions(api)
		expect(Object.keys(actions).length).toEqual(ACTIONS_COUNT)
	})
})
