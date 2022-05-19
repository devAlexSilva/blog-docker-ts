import { Request, Response } from 'express'
import { prisma } from '../Db/PrismaClient'


type post = {
    id?: string
    title: string
    content: string
    published?: boolean
    createdAt?: string
    updatedAt?: string
    stars?: number
    viewCount?: number
    author?: string
    authorId?: string
}
export class Post {

    async getAllPostsByUser(req: Request, res: Response) {
        const id = req.params.id

        try {
            const posts = await prisma.post.findMany({
                where: {
                    authorId: Number(id)
                }
            })

            if (!posts[0]) return res.json({ message: 'there is no posts' })
            return res.send(posts)
        }
        catch (err) {
            return res.sendStatus(400)
        }
    }

    async createPost(req: Request, res: Response) {
        const _id = req.params.id
        const { title, content }: post = req.body

        try {
            const post = await prisma.user.update({

                where: {
                    id: Number(_id)
                },
                data: {
                    posts: {
                        create: {
                            title,
                            content
                        }
                    }
                },
                select: {
                    profile: true,
                    posts: true
                }

            })

            return res.status(201).send(post)
        }
        catch (err) {
            return res.status(304).json({ error: 'failed to create post' })
        }
    }

}