import { Request, Response } from 'express'
import { regex } from '../auxiliaryFunction/Regex'
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

    async createPost(req: Request, res: Response) {
        const _id = req.params.id
        const { title, content }: post = req.body

        if (!title || !content) return res.status(400).json({ error: 'there is empty field' })
        if (!regex.name(title)) return res.status(400).json({ error: 'title contains forbidden characters' })

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

    async getPostsById(req: Request, res: Response) {
        const { postId } = req.params

        try {
            const posts = await prisma.post.findFirst({
                where: {
                    id: Number(postId)
                }
            })

            if (!posts) return res.status(400).json({ message: 'post not found' })
            
            await prisma.post.update({
                where: {
                    id: Number(postId)
                },
                data: {
                    viewCount: {
                        increment: 1
                    }
                }
            })
            
            
            return res.send(posts)
        }
        catch (err) {
            return res.sendStatus(500)
        }
    }

    async updatePosts(req: Request, res: Response) {
        const { postId } = req.params
        const userId = req.params.id
        const { title, content, published }: post = req.body

        if (!regex.name(title)) return res.status(400).json({ error: 'title contains forbidden characters' })

        try {
            const matchUser = await prisma.user.findUnique({
                where: {
                    id: Number(userId)
                }
            })
            if (!matchUser) return res.sendStatus(400)

            const updatedPost = await prisma.post.update({
                where: {
                    id: Number(postId)
                },
                data: {
                    title,
                    content,
                    published
                }
            })
            return res.send(updatedPost)
        }
        catch (err) {
            return res.sendStatus(400)
        }
    }

}