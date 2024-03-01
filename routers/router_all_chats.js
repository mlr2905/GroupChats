const express = require('express')
const router = express.Router()
const dal_0 = require('../dals/dal_0')
const dal_1 = require('../dals/dal_all_chats')
const dal_2 = require('../dals/dal_2')
const dal_3 = require('../dals/dal_3')
const dal_4 = require('../dals/dal_4')





// '/chat1/api/chat1'
// GET 
router.get('/search', async (request, response) => {
    const query = request.query
    const chat1 = query.chat1
    const chat2 = query.chat2
    const chat3 = query.chat3
    const chat4 = query.chat4
    let body = chat1 ? chat1 : chat2 ? chat2 : chat3 ? chat3 : chat4 ? chat4 : '';
    let type = body !== undefined ? (body === chat1 ? "chat1" : body === chat2 ? "chat2" : body === chat3 ? "chat3" : body === chat4 ? "chat4" : '') : '';

    try {
        const get_all = await dal_1.get_all(type)
        if (get_all) {
            response.status(200).json(get_all)
        }
        else {
            throw response.status(404).json({ "error": `The id ${query} you specified does not exist in the system ` })

        }

    } catch (error) {
        throw response.status(503).json({ "error": `The request failed, try again later ` })
    }
})

// GET by ID
router.get('/id/search', async (request, response) => {
    const query = request.query
    const chat1 = query.chat1
    const chat2 = query.chat2
    const chat3 = query.chat3
    const chat4 = query.chat4
    let id = chat1 ? chat1 : chat2 ? chat2 : chat3 ? chat3 : chat4 ? chat4 : '';
    let type = id !== undefined ? (id === chat1 ? "chat1" : id === chat2 ? "chat2" : id === chat3 ? "chat3" : id === chat4 ? "chat4" : '') : '';

    try {
        const get_by_id = await dal_1.get_by_id(type, id)
        if (get_by_id) {
            response.status(200).json(get_by_id)
        }
        else {
            response.status(404).json({ "error": `cannot find user with id ${query}` })
        }

    } catch (error) {
        throw response.status(503).json({ "error": `The request failed, try again later ` })
    }
})
// POST
router.post('/post/search', async (request, response) => {
    const new_message = request.body
    const query = request.query
    const chat1 = query.chat1
    const chat2 = query.chat2
    const chat3 = query.chat3
    const chat4 = query.chat4
    let id = chat1 ? chat1 : chat2 ? chat2 : chat3 ? chat3 : chat4 ? chat4 : '';
    let type = id !== undefined ? (id === chat1 ? "chat1" : id === chat2 ? "chat2" : id === chat3 ? "chat3" : id === chat4 ? "chat4" : '') : '';

    try {
        const result = await dal_1.new_message(type, new_message)
        if (result) {
            response.status(201).json(result)
        }
        else {
            response.status(404).json({ "error": `cannot find user with id ${query}` })
        }

    } catch (error) {
        throw response.status(503).json({ "error": `The request failed, try again later ` })
    }
})

// put
router.put('/put/search', async (request, response) => {
    const update = request.body
    const chat1 = query.chat1
    const chat2 = query.chat2
    const chat3 = query.chat3
    const chat4 = query.chat4
    let id = chat1 ? chat1 : chat2 ? chat2 : chat3 ? chat3 : chat4 ? chat4 : '';
    let type = id !== undefined ? (id === chat1 ? "chat1" : id === chat2 ? "chat2" : id === chat3 ? "chat3" : id === chat4 ? "chat4" : '') : '';
    const user = await dal_1.get_by_id(type,id)

    try {
        // override only existing fields in the user from the db
        const result = await dal_1.update_message(type,id, { ...user, ...update })
        if (result) {
            response.status(200).json(result)
        }
        else {
            response.status(404).json({ "error": `cannot find user with id ${query}` })
        }

    } catch (error) {
        throw response.status(503).json({ "error": `The request failed, try again later ` })
    }

})

// DELETE
router.delete('/delete/search', async (request, response) => {
    const query = request.query
    const chat1 = query.chat1
    const chat2 = query.chat2
    const chat3 = query.chat3
    const chat4 = query.chat4
    let id = chat1 ? chat1 : chat2 ? chat2 : chat3 ? chat3 : chat4 ? chat4 : '';
    let type = id !== undefined ? (id === chat1 ? "chat1" : id === chat2 ? "chat2" : id === chat3 ? "chat3" : id === chat4 ? "chat4" : '') : '';

    try {
        const result = await dal_1.delete_message(type, id)
        if (result) {
            response.status(200).json(result)
        }
        else {
            response.status(404).json({ "error": `cannot find user with id ${query}` })
        }

    } catch (error) {
        throw response.status(503).json({ "error": `The request failed, try again later ` })
    }
})



module.exports = router