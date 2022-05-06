import express, { Response } from 'express'
import { app } from './server'
import { routes } from '../router/index'

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(routes)

app.get('/', (req, res: Response) => {
    res.send('documentation with swagger...')
})