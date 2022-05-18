import { Request, Response } from 'express'
import { prisma } from '../Db/PrismaClient'
import { regex } from '../auxiliaryFunction/Regex'

type profile = {
    name: string,
    bio?: string
}

export class Profile {

    async createProfile(req: Request, res: Response) {
        const _userId = req.params.id
        const { name, bio }: profile = req.body

        if (!regex.name(name)) return res.status(400).json({ error: 'name contains forbidden characters' })

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
            if (!_userId) return res.status(401).json({ error: 'token invalid' })
            return res.status(405).json({ error: 'already exists a profile for this user' })
        }
    }

    async getAllProfiles(req: Request, res: Response) {
        const profiles = await prisma.profile.findMany()
        if (!profiles) return res.json({ message: 'no registered profile' })
        return res.send(profiles)
    }

    async getOneProfile(req: Request, res: Response) {
        const id = req.params.id

        try {
            const profile = await prisma.profile.findFirst({
                where: {
                    userId: Number(id)
                }
            })
            if (!profile) return res.json({ message: 'this user yet has no profile' })
            return res.send(profile)
        }
        catch (err) {
            return res.sendStatus(500)
        }
    }

    async updateProfile(req: Request, res: Response) {
        const id = req.params.id
        const { name, bio }: profile = req.body

        if (!bio || !name) return res.status(400).json({ error: 'there is empty field' })
        if (!regex.name(name)) return res.status(400).json({ error: 'name contains forbidden characters' })

        try {
            const profile = await prisma.profile.update({
                where: {
                    userId: Number(id)
                },
                data: {
                    name,
                    bio
                }
            })

            return res.send(profile)
        }
        catch (err) {
            return res.status(304).json({ error: 'update failed' })
        }
    }

}