import prisma from "../src/lib/prisma"

async function main() {

    const users = [{
        email: 'alice@prisma.io',
        name: 'Alice',
        posts: [
            {
                title: 'title01',
                content: 'content01',
                published: true,
            }
        ]
    },
    {
        email: 'bob@prisma.io',
        name: 'Bob',
        posts: [
            {
                title: 'title01',
                content: 'content01',
                published: true,
            },
            {
                title: 'title02',
                content: 'content02',
                published: true,
            },

        ]
    }
    ]

    users.map(async (user) => {
        await prisma.user.upsert({
            where: { email: user.email },
            update: {
                name: user.name,
                posts: {
                    create: user.posts,
                }
            },
            create: {
                email: user.email,
                name: user.name,
                posts: {
                    create: user.posts,
                }
            }
        })
    })

    console.log({ users })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })