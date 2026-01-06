// import { prisma } from './lib/prisma'

// async function main() {
//     // Example: Fetch all events
//     const events = await prisma.event.findMany()
//     console.log(events)

//     // You can write other Prisma ORM queries here
// }

// main()
//     .then(async () => {
//         await prisma.$disconnect()
//     })
//     .catch(async (e) => {
//         console.error(e)
//         await prisma.$disconnect()
//         process.exit(1)
//     })

import { prisma } from './lib/prisma'

async function main() {
    const user = await prisma.event.findMany()
    console.log(user)
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