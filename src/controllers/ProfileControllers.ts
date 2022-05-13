import { Request, Response } from 'express'
import { prisma } from '../Db/PrismaClient'
import { regex } from '../auxiliaryFunction/Regex'

type profile = {
    name: string,
    bio: string
}

export class Profile {

    async create(req: Request, res: Response) {
        const _userId = req.params.id
        const { name, bio }: profile = req.body
        
        if(!regex.name(name)) return res.status(400).json({error: 'name contains forbidden characters'})

        try {
            await prisma.user.update({
                where: {
                    id: Number(_userId)
                },
                data: {
                    profile: {
                        create: {
                            name,
                            bio
                        }
                    }
                }
            })
            return res.status(201).json({ message: 'profile successfully created' })
        }
        catch (err) {
            if(!_userId) return res.status(401).json({error: 'token invalid'})
            return res.status(405).json({error: 'method not allowed'})
        }
    }

}