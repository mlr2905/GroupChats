
const logger = require('./logger/my_logger')
const path = require('path')
const express = require('express')
const cors = require('cors');

const body_parser = require('body-parser')
const get_all_chats = require('./routers/router_get_all_chats_only')
const all_chats = require('./routers/router_all_chats')
const online_users = require('./routers/router_online_users')


logger.info('==== System start =======')

const app = express()
const port = 3000

app.use(cors());
app.use(body_parser.json())
app.use(express.static(path.join('.', '/static/')))
app.listen(3000, () => {
    logger.info('==== Server started =======')
    console.log('Express server is running ....');
});
app.use(cors());
app.use('/api/chats', get_all_chats)
app.use('/api/', all_chats)
app.use('/api/connected', online_users)



logger.info('==== System stop =======')