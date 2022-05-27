import express from 'express'
import swaggerUi from 'swagger-ui-express'
import { app } from './server'
import { routes } from '../router/index'
import apiDocument from '../../openapi.json'

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiDocument))

app.use(routes)
app.get('/', (req, res) => {
    res.send('documentation in /docs')
})