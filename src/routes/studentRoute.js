import express from 'express'
import { studentController } from '../controllers/studentController.js'

const Router = express.Router()

Router.route('/')
  .get(studentController.getStudents)
  .post(studentController.createNew)

Router.route('/:id').patch(studentController.update)
Router.route('/:id').delete(studentController.deleteItem)

export const studentRoute = Router