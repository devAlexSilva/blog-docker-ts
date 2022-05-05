import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient();

async function main(){
    const newUser = await prisma.user.create({
        data: {
            name: 'alex',
            email: 'eoqalex@gmail.com',
        }
    })

    return newUser;
}

main()
.then(userCreated => {
    console.log(userCreated);
})
.catch(err => {
    console.log(err);
});