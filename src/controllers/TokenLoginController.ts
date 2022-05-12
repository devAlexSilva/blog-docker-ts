import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { prisma } from '../Db/PrismaClient'

const secret = process.env.JWT_SECRET || 'fixProblem"undefined"'
type body = {
    email: string,
    password: string
}

export class Token {
    req: Request
    res: Response

    constructor(req: Request, res: Response) {
        this.req = req
        this.res = res
    }

    private async verifyBody(body: body) {
        if (body.email == null || body.password == null) return this.res
            .status(400).json({ error: 'email and password is required' })

        try {
            const hashedPassword = await prisma.user.findUnique({
                where: {
                    email: body.email
                },
                select: {
                    password: true,
                    id: true
                }
            })
            if (!hashedPassword) return this.res.status(400).json({ error: 'this email isn\'t in use' })

            const matchId = hashedPassword?.id
            const matchPassword = hashedPassword?.password || 'ever will be a string'
            const passwordIsCorrect = await bcrypt.compare(body.password, matchPassword)

            if (!passwordIsCorrect) return this.res.status(400).json({ error: 'password is wrong' })
            return { passwordIsCorrect, matchId }
        }

        catch (err) {
            return this.res.status(500).json({ error: 'there was an error on server' })
        }
    }

    async create() {
        const { passwordIsCorrect, matchId } = await this.verifyBody(this.req.body)

        if (!passwordIsCorrect) return 0

        const _token = jwt.sign({ id: matchId }, secret, { expiresIn: '1h' })
        return this.res.status(200).json({ token: _token })
    }
}