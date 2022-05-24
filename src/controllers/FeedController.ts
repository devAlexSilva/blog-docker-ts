import { Request, Response } from 'express'
import { prisma } from '../Db/PrismaClient'


type queries = {
    name?: string,
    id?: string,
    title?: string
    take?: string,
    order?: string
}

export class Feed {

    async getPostsByIdOrTitle(req: Request, res: Response) {
        const query: queries = req.query

        try {
            const posts = await prisma.post.findMany({
                where: {
                    OR: [
                        {
                            title: {
                                contains: query.title,
                                mode: 'insensitive'
                            }
                        },
                        {
                            id: Number(query.id) || undefined
                        }
                    ],
                    AND: {
                        published: true
                    }
                }
            })

            if(!posts[0]) return res.json({message: 'no posts for this filter'})
            return res.send(posts)
        }
        catch (err) {
            return res.sendStatus(400)
        }
    }
}