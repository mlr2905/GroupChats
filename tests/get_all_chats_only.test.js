const assert = require('assert')
const dal = require('../dals/dal_get_all_chats_only')

describe('Testing functionallity of the DAL', () => {

    it('get_all', async () => {
        const expected = 5
        const all_tables = await dal.get_all()

        const actual = Object.keys(all_tables).length;
        assert.strictEqual(expected, actual)
    })

    
    it('get_by_id', async () => {
        const expected = 4
        const get_by_id = await dal.get_by_id(3)
        const actual = Object.keys(get_by_id).length;
        assert.strictEqual(expected, actual)
    })

})