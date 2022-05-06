import express, { Application } from 'express'


const app: Application = express()
const port = process.env.PORT || 2727

app.listen(port, () => console.log(`run in: http://localhost:${port}`))

export { app }