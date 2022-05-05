import { prisma } from '../Db/PrismaClient'


export class UserController {

    async get() {
        const users = await prisma.user.findMany()
        return users
    }
}