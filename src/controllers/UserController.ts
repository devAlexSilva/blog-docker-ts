import { Request, Response } from 'express'
import { prisma } from '../Db/PrismaClient'
import { regex } from '../auxiliaryFunction/Regex'
import { hash } from '../auxiliaryFunction/hashPassword'


export class UserController {

    async getById(req: Request, res: Response) {
        const { id: _id } = req.params
        try {
            const user = await prisma.user.findFirst({
                where: {
                    id: Number(_id)
                },
                select: {
                    id: true,
                    email: true,
                    profile: true
                }
            })
            return res.send(user)
        }
        catch (err) {
            return res.status(500).json({ error: 'there was a error on server' })
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
                where: { email }
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
            return res.status(500).json({ error: 'failed to create user' })
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
            return res.status(400).json({ error: 'failed to delete user' })
        }
    }
}