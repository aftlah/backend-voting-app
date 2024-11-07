const prisma = require('../config/db');


const vote = async (req, res) => {
    const { optionId, email } = req.body;

    // cek apakah user sudah memberikan suara
    const voter = await prisma.user.findUnique({ where: { email } });
    if (user?.hasVoted) {
        return res.status(400).json({ success: false, message: "You have already voted" });
    }

    const option = await prisma.option.findUnique({ where: { id: optionId } });
    if (!option) {
        return res.status(404).json({ success: false, message: "Option not found" });
    }

    // tambah suara ke opsi yang dipilih
    await prisma.option.update({
        where: { id: optionId },
        data: {
            votes: {
                create: { user: { connect: { email } } },
            },
        },
    });

    // Perbarui status pemilih menjadi 'hasVoted'
    await prisma.user.upsert({
        where: { email },
        update: { hasVoted: true },
        create: { email, hasVoted: true },
    });

    res.json({ success: true, message: "Vote recorded successfully" });
}

//  untuk mendapatkan hasil voting
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

module.exports = {
    vote,
    getResults,
};
