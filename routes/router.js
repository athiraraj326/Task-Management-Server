const express = require('express')
const userController = require('../controllers/userController')
const taskController = require('../controllers/taskController')
const jwtMiddleware = require('../middleware/jwtMiddleware')

const router = new express.Router()

// register
router.post('/register',userController.registerController)

// login
router.post('/login',userController.loginController)

// add-task
router.post('/add-task',jwtMiddleware,taskController.addTaskController)

// user-tasks
router.get('/user-tasks',jwtMiddleware,taskController.userTaskController)

// edit tasks
router.put('/:id/edit-task',jwtMiddleware,taskController.editTaskController)

// delete task
router.delete('/:id/delete',jwtMiddleware,taskController.deleteTaskController)

module.exports = router