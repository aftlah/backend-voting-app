// controllers/candidateController.js
const prisma = require('../config/db');

const getAllCandidates = async (req, res) => {

    try {
        const candidates = await prisma.candidate.findMany();
        res.json(candidates);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving candidates', error });
    }
};

module.exports = {
    getAllCandidates,
};