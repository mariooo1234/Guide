import express from 'express'

/** @module Logger - Логирование */
import logger from './src/logger/logger.js'

import connection from './src/database/connection.js'

import cors from 'cors'

import UserRouter from './src/routes/UserRouter.js'

const app = express()
const port = 3000

app.use(cors())

app.use(express.json())

app.use('/api', UserRouter)
app.get('/', (req, res) => {
	res.json([])
})
connection().then(() => {
	app.listen(port, () => {
		logger.info(`App: ${port}`)
	})
})
