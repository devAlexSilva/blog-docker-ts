import express from 'express'
import swaggerUi from 'swagger-ui-express'
import { app } from './server'
import { routes } from '../router/index'


app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/docs', swaggerUi.serve, swaggerUi.setup(undefined, {
    swaggerOptions: {
        url: '../../openapi.json'
    }
}))

app.use(routes)
app.get('/', (req, res) => {
    res.send('documentation with swagger...')
})