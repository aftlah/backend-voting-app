// config/db.js
const { PrismaClient } = require('@prisma/client');

// Inisialisasi Prisma Client
const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'], // Mengaktifkan logging untuk debugging (opsional)
});

// Fungsi untuk menutup koneksi Prisma saat aplikasi ditutup
const disconnectPrisma = async () => {
    try {
        await prisma.$disconnect();
        console.log("Prisma Client disconnected");
    } catch (error) {
        console.error("Error disconnecting Prisma Client", error);
    }
};

// Pastikan Prisma Client menutup koneksi saat aplikasi dihentikan
process.on('SIGINT', disconnectPrisma);
process.on('SIGTERM', disconnectPrisma);

module.exports = prisma;
