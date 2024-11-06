// controllers/voterController.js
const prisma = require('../config/db');

const authenticate = async (req, res) => {
    const { email, secretCode } = req.body;
    const emailPattern = /^(\d{10})@student\.budiluhur\.ac\.id$/;
    const match = emailPattern.exec(email);

    // let checkExistEmail = await prisma.voter.findUnique({ where: { email } });
    let checkHasVoted = await prisma.voter.findUnique({ where: { email } });

    if (checkHasVoted?.hasVoted) {
        return res.status(400).json({ success: false, message: "Kamu sudah pernah memilih" });
    }
    
    if (match?.[1]?.length === 10 && secretCode === "123") {
        await prisma.voter.upsert({
            where: { email },
            update: {},
            create: { email, hasVoted: false },
        });

        return res.json({ success: true, message: "Authentication successful" });
    } else {
        return res.status(401).json({ success: false, message: "Invalid email or secret code" });
    }
};

module.exports = {
    authenticate,
};