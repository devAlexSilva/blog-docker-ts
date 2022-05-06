import { Request, Response } from 'express'
import { prisma } from '../Db/PrismaClient'


export class UserController {

    private validateCharacters = {
        regexName: function (name: string) {
            const regex = /^[~^´ç`a-zA-Z0-9]{1,30}$/
            return regex.test(name)
        },

        regexPassword: function (password:string){
            const regexPassword = /^(?=.*[@!#$%^&*()/\\])[@!#$%^&*()/\\a-zA-Z0-9]{6,20}$/
            return regexPassword.test(password)
        }
    }

    async get(res: Response) {
        try {
            const users = await prisma.user.findMany()

            if (users[0] == null) return res.status(200).json({ message: 'users not found' })
            return res.status(200).send(users)
        }
        catch (err) {
            return res.status(400).json({ error: err })
        }
    }

    async create(req: Request, res: Response) {
        const { name, email } = req.body

        if (!name || !email) return res.status(400).json({ error: 'name and email is required' })
        if(!this.validateCharacters.regexName(name)) return res.status(400).json({error: 'the name has forbidden characters'})

        try {
            const userAlreadyExists = await prisma.user.findFirst({
                where: {
                    email: email
                }
            })

            if (userAlreadyExists) return res.status(400).json({ error: 'this email already exists' })

            await prisma.user.create({
                data: {
                    name: name,
                    email: email
                }
            })
            return res.status(201).json({ message: 'user successfully created' })
        }
        catch (err) {
            return res.status(400).json({ error: `failed to create user: ${err}` })
        }
    }

    async update(req: Request, res: Response) {
        const { id } = req.params
        const { name } = req.body

        const regexName = this.validateCharacters.regexName(name)
        //const regexName = /^[~^´ç`a-zA-Z0-9]{1,30}$/;
        if (!regexName) return res.status(400).json({ error: 'the name has forbidden characters' });

        try {
            await prisma.user.update({
                where: {
                    id: Number(id)
                },
                data: {
                    name: name
                }
            })

            return res.status(200).json({ message: 'name has been changed' })
        }
        catch (err) {
            return res.status(304).json({ error: 'not modified' });
        }
    }
}