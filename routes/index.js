import AuthController from '../controllers/AuthController';
import FilesController from '../controllers/FilesController';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';

const express = require('express');
// all endpoints of our API
const router = (app) => {
  const route = express.Router();
  app.use('/', route);
  app.use(express.json());

  route.get('/status', (request, response) => AppController.getStatus(request, response));
  route.get('/disconnect', (request, response) => AuthController.getDisconnect(request, response));
  route.get('/users/me', (request, response) => UsersController.getMe(request, response));
  route.post('/files', (request, response) => FilesController.postUpload(request, response));
  route.get('/files/:id', (request, response) => FilesController.getShow(request, response));
  route.get('/files', (request, response) => FilesController.getIndex(request, response));
  route.put('/files/:id/publish', (request, response) => FilesController.putPublish(request, response));
  route.put('/files/:id/unpublish', (request, response) => FilesController.putUnpublish(request, response));
  route.get('/files/:id/data', (request, response) => FilesController.getFile(request, response));
  route.get('/stats', (request, response) => AppController.getStats(request, response));
  route.post('/users', (request, response) => UsersController.postNew(request, response));
  route.get('/connect', (request, response) => AuthController.getConnect(request, response));
 
};
export default router;
