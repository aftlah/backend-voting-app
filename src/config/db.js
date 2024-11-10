
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

const disconnectPrisma = async () => {
    try {
        await prisma.$disconnect();
        console.log("Prisma Client disconnected");
    } catch (error) {
        console.error("Error disconnecting Prisma Client", error);
    }
};

process.on('SIGINT', disconnectPrisma);
process.on('SIGTERM', disconnectPrisma);

export default prisma;
