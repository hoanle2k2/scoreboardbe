import { studentService } from "../services/studentService.js"

const createNew = async (req, res) => {
  try {
    const newStudent = await studentService.createNew(req.body)
    return res.status(200).json(newStudent)
  } catch (error) {
    throw error
  }
}

const getStudents = async (req, res) => {
  try {
    const resStudents = await studentService.getStudents(req)
    return res.status(200).json(resStudents)
  } catch (error) {
    throw error
  }
}

const update = async (req, res) => {
  const studentId = req.params.id
  try {
    const updateStudent = await studentService.update(studentId, req.body)
    return res.status(200).json(updateStudent)
  } catch (error) {
    throw error
  }
}

const deleteItem = async (req, res) => {
  const studentId = req.params.id
  try {
    const deleteStudent = await studentService.deleteItem(studentId)
    return res.status(200).json(deleteStudent)
  } catch (error) {
    throw error
  }
}

export const studentController = {
  createNew,
  update,
  deleteItem,
  getStudents
}