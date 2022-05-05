import express from 'express'
import { app } from './server'
import { routes } from '../router/index'

app.use(express.json())
app.use(routes)

app.get('/', (req, res) => {
    res.send('documentation with swagger...')
})