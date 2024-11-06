// controllers/voteController.js
const prisma = require('../config/db');

// Fungsi untuk mencatat suara
const vote = async (req, res) => {
    const { optionId, email } = req.body;

    // Periksa apakah pemilih sudah memberikan suara
    const voter = await prisma.voter.findUnique({ where: { email } });
    if (voter?.hasVoted) {
        return res.status(400).json({ success: false, message: "You have already voted" });
    }

    const option = await prisma.option.findUnique({ where: { id: optionId } });
    if (!option) {
        return res.status(404).json({ success: false, message: "Option not found" });
    }

    // Tambahkan suara ke opsi yang dipilih
    await prisma.option.update({
        where: { id: optionId },
        data: {
            votes: {
                create: { voter: { connect: { email } } },
            },
        },
    });

    // Perbarui status pemilih menjadi 'hasVoted'
    await prisma.voter.upsert({
        where: { email },
        update: { hasVoted: true },
        create: { email, hasVoted: true },
    });

    res.json({ success: true, message: "Vote recorded successfully" });
}

// Fungsi untuk mendapatkan hasil voting
const getResults = async (req, res) => {
    const results = await prisma.option.findMany({
        include: {
            votes: true,
        },
    });

    const voteCount = results.map(option => ({
        optionId: option.id,
        voteCount: option.votes.length,
    }));

    res.json(voteCount);
}

// Ekspor fungsi sebagai objek
module.exports = {
    vote,
    getResults,
};
