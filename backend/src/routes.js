const express = require('express');

const DevController = require('./controllers/DevController');
const LikeController = require('./controllers/LikeController');
const DislikeController = require('./controllers/DislikeController');

const routes = express.Router();

routes.get('/', DevController.index);
routes.post('/', DevController.store);

routes.post('/:devId/likes', LikeController.store);
routes.post('/:devId/dislikes', DislikeController.store);

module.exports = routes;
