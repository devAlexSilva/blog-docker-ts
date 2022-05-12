import { Request, Response } from 'express'
import { prisma } from '../Db/PrismaClient'
import { regex } from '../auxiliaryFunction/Regex'
import { hash } from '../auxiliaryFunction/hashPassword'

export class UserController {

    async get(res: Response) {
        try {
            const users = await prisma.user.findMany({
                select: { 
                    id: true,
                    email: true,
                    profile: true
                 }
            })

            if (users[0] == null) return res.status(200).json({ message: 'users not found' })
            return res.status(200).send(users)
        }
        catch (err) {
            return res.status(500).json({ error: 'failed in search users' })
        }
    }

    async create(req: Request, res: Response) {
        const { email, password } = req.body

        if (!password || !email) return res.status(400)
            .json({ error: 'password and email is required' })
        if (!regex.password(password)) return res.status(400)
            .json({ error: 'the password need (min = 6, max = 20) and at least one symbol' })

        const hashPassword = await hash.password(password)

        try {
            const userAlreadyExists = await prisma.user.findFirst({
                where: {
                    email
                }
            })

            if (userAlreadyExists) return res.status(400).json({ error: 'this email already exists' })

            await prisma.user.create({
                data: {
                    email,
                    password: hashPassword
                }
            })
            return res.status(201).json({ message: 'user successfully created' })
        }
        catch (err) {
            return res.status(500).json({ error: `failed to create user` })
        }
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params

        try {
            await prisma.user.delete({
                where: {
                    id: Number(id)
                }
            })
            return res.status(200).json({ message: 'user has been successfully deleted' })
        }
        catch (err) {
            return res.status(304).json({ error: 'failed to delete user' })
        }
    }
}