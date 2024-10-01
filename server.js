import express from 'express'
import { APIs } from './src/routes/index.js'
import { CONNECT_DB } from './src/config/mongodb.js'
import cors from 'cors'

const app = express()

app.use(cors());
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store')
  next()
})

app.use(express.json())

app.use('/', APIs)

app.listen(8080, async () => {
  await CONNECT_DB()
  console.log('ket noi thanh cong');

})