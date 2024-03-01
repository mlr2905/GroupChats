const knex = require('knex')
const db = require('../connect_db/default');
const { log } = require('winston');
const connectedKnex = db.connect()



async function get_all(type) {
    try {
        const messages = await connectedKnex(`${type}`).select('*');
        return messages;
    } catch (error) {
        console.error('error fun get_all:', error);
        throw error;
    }
}

async function get_by_id(type, id) {
    // db.run('select * from chat1 where id=?')
    try {
        const message = await connectedKnex(`${type}`).select('*').where('id', id).first()
        return message
    } catch (error) {
        console.error('error fun get_by_id:', error);
        throw error;
    }
}

async function new_message(type, new_mes) {
    // db.run('insert into chat1 ....')
    // result[0] will be the new ID given by the SQL
    // Insert into chat1 values(....)
    const result = await connectedKnex(`${type}`).insert(new_mes)
    return { ...new_mes, id: result[0] }
}

async function update_message(type, id, updated_message) {
    // db.run('update chat1 ....')
    console.log('1',updated_message)
    console.log('2',id)
    console.log('3',type)

    try {
        const result = await connectedKnex(`${type}`).where('id', id).update(updated_message)

        return updated_message
    } catch (error) {
        console.error('שגיאה בפונקציה delete_message:', error);
        throw error;
    }

}

async function delete_message(type, id) {
    try {
        const result = await connectedKnex(`${type}`).where('id', id).del();
        return result;
    } catch (error) {
        console.error('שגיאה בפונקציה delete_message:', error);
        throw error;
    }
}

// ---------------Test functions only---------------

async function create_table_if_not_exist(type) {
    const tableExists = await connectedKnex.schema.hasTable('chat1');

 
if (!tableExists) {
    await connectedKnex.schema.createTable(`${type}`, (table) => {
        table.increments('id').primary(); // This creates a SERIAL column
        table.string('user').notNullable();
        table.string('text').notNullable();
        table.time('time', { precision: 0 });
        table.string('type').notNullable();
    });
}

}

async function delete_all(type) {
// db.run('update chat1 ....')
const result = await connectedKnex(`${type}`).del()
await connectedKnex.raw('ALTER SEQUENCE "chat1_id_seq" RESTART WITH 1');
return result
}
module.exports = {
    get_all, get_by_id, new_message, update_message, delete_message,
    delete_all, create_table_if_not_exist
}