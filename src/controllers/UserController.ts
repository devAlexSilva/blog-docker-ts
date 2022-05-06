import { Request, Response } from 'express'
import { prisma } from '../Db/PrismaClient'


export class UserController {

    async get(res: Response) {
        const users = await prisma.user.findMany()

        if (users[0] == null) return res.status(200).json({ message: 'users not found' })
        return res.status(200).send(users)
    }

    async create(req: Request, res: Response) {
        const { name, email } = req.body
        
        if(!name || !email) return res.status(400).json({error: 'name and email is required'})

        try {
            const userAlreadyExists = await prisma.user.findFirst({
                where: {
                    email: email
                }
            })

            if(userAlreadyExists) return res.status(400).json({error: 'this email already exists'})
            
            await prisma.user.create({
                data: {
                    name: name,
                    email: email
                }
            })

            return res.status(201).json({ message: 'user successfully created' })
        }
        catch(err){
            return res.status(400).json({error: `failed to create user: ${err}`})
        }
    }
}