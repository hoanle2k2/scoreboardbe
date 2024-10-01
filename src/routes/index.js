import express from 'express'
import { studentRoute } from './studentRoute.js'

const Router = express.Router()

Router.use('/students', studentRoute)

export const APIs = Router