const knex = require('knex')
const db = require('../connect_db/default')
const connectedKnex = db.connect()


async function delete_all() {
    // db.run('update chat1 ....')
    const a = await connectedKnex('chat1').del()
    await connectedKnex.raw('ALTER SEQUENCE "chat1_id_seq" RESTART WITH 1');
    const b = await connectedKnex('chat2').del()
    await connectedKnex.raw('ALTER SEQUENCE "chat2_id_seq" RESTART WITH 1');
    const c = await connectedKnex('chat3').del()
    await connectedKnex.raw('ALTER SEQUENCE "chat3_id_seq" RESTART WITH 1');
    const d = await connectedKnex('chat4').del()
    await connectedKnex.raw('ALTER SEQUENCE "chat4_id_seq" RESTART WITH 1');
    const e = await connectedKnex('connected').del()
    await connectedKnex.raw('ALTER SEQUENCE "connected_id_seq" RESTART WITH 1');
}

async function get_all() {
    // db.run('select * from chat1')
    const a = await connectedKnex('chat1').select('*')
    const b = await connectedKnex('chat2').select('*')
    const c = await connectedKnex('chat3').select('*')
    const d = await connectedKnex('chat4').select('*')
    const e = await connectedKnex('connected').select('*')
    const arr = { 0: a, 1: b, 2: c, 3: d, 4: e }
    return arr
}

async function get_by_id(id) {
    // db.run('select * from chat1 where id=?')
    const a = await connectedKnex('chat1').select('*').where('id', id).first()
    const b = await connectedKnex('chat2').select('*').where('id', id).first()
    const c = await connectedKnex('chat3').select('*').where('id', id).first()
    const d = await connectedKnex('chat4').select('*').where('id', id).first()
    const e = await connectedKnex('connected').select('*').where('id', id).first()
    const arr = { 0: a, 1: b, 2: c, 3: d, 4: e }
    return arr
}


async function get_emojis() {
    // Use raw SQL to avoid backslash escaping
    const emojis = await connectedKnex.raw('SELECT id, slug, cast(character AS text) AS character FROM emojis;')
  
    // emojis might be an array of objects or other structure
    return emojis.map(emoji => ({
      ...emoji, // Spread existing properties
      character: decodeURIComponent(emoji.character) // Decode unicode character
    }));
  }
  

module.exports = {
    get_all, get_by_id, delete_all,get_emojis
}