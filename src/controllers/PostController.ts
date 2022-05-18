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

    async getAllPostByUser(req: Request, res: Response) {
        const id = req.params.id

        try{
            const posts = await prisma.post.findMany({
                where: { 
                    authorId: Number(id) 
                 }
            })

            return res.send(posts)
        }
        catch(err) {
            return res.sendStatus(400)
        }
    }

}