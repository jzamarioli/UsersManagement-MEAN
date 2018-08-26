const express = require('express');
const router = express.Router();
const controller = require('../controllers/user-controller');
const authService = require('../services/auth-service');

router.get('/',  authService.authorize, controller.getAll);
router.get('/:id', authService.authorize, controller.getById);
router.get('/name/:name', authService.authorize, controller.getByName);
router.get('/username/:username', authService.authorize, controller.getByUsername);
router.get('/role/:role', authService.authorize, controller.getByRole);
// router.post('/', authService.authorize, controller.post);
// router.put('/:id', authService.authorize, controller.put);
// router.delete('/:id', authService.authorize, controller.delete);
router.post('/', controller.post);
router.put('/:id', authService.authorize, controller.put);
router.delete('/:id', authService.authorize, controller.delete);
module.exports = router;