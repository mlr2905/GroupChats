const express = require('express')
const router = express.Router()
const dal_0 = require('../dals/dal_0')
const dal_1 = require('../dals/dal_1')
const dal_2 = require('../dals/dal_2')
const dal_3 = require('../dals/dal_3')
const dal_4 = require('../dals/dal_4')





// '/chat1/api/chat1'
// GET 
router.get('/search', async (request, response) => {
    // const user_id = parseInt(request.params.id)
    const query = request.query
    const chat1 = query.chat1
    const chat2 = query.chat2
    const chat3 = query.chat3
    const chat4 = query.chat4
   let body = chat1 ? chat1 : chat2  ? chat2 : chat3  ? chat3 : chat4 ?chat4:'';
   let type = search !== undefined ? (search === chat1 ? "chat1" : search === chat2 ? "chat2" : search === chat3 ? "chat3" : search === chat4 ? "chat4":'') : undefined;
    
    try {
        const get_all = await dal_1get_all(type)
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
router.get('/chat1/:id', async (request, response) => {
    const id = parseInt(request.params.id)
    const result = await dal_1get_by_id(id)
    if (result) {
        response.json(result)
    }
    else {
        response.status(404).json({ "error": `cannot find user with id ${get_by_id}` })
    }
})
// POST
router.post('/chat1/', async (request, response) => {
    const new_message = request.body
    const result = await dal_1new_message(new_message)
    response.status(201).json(result)
})
// PUT
router.put('/chat1/:id', async (request, response) => {
    const id = parseInt(request.params.id)
    let result = await dal_1get_by_id(id)
    if (result) {
        // user exists ==> perform update
        const update = request.body
        result = await dal_1update_message(id, update)
        response.json(updated_user_req)
    }
    else {
        // user does NOT exist ==> perform insert
        const new_user = request.body
        result = await dal_1new_message(new_user)
        response.status(201).json(result)
    }
})

// PATCH
router.patch('/chat1/:id', async (request, response) => {
    const update = request.body
    const id = parseInt(request.params.id)
    const user = await dal_1get_by_id(id)
    // override only existing fields in the user from the db
    const result = await dal_1update_message(id, { ...user, ...update })
    response.json({ result })
})

// DELETE
router.delete('/chat1/:id', async (request, response) => {
    const id = parseInt(request.params.id)
    const result = await dal_1delete_message(id)
    response.status(204).json({ result })

})


module.exports = router