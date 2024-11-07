const prisma = require('../config/db');

const getAllCandidates = async (req, res) => {

    try {
        const candidates = await prisma.candidate.findMany();
        res.json(candidates);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving candidates', error });
    }
};

const createCandidate = async (req, res) => {
    const { name, party } = req.body;

    try {
        const newCandidate = await prisma.candidate.create({
            data: {
                name,
                party,
            },
        });
        res.status(201).json(newCandidate);
    } catch (error) {
        res.status(500).json({ message: 'Error creating candidate', error });
    }
};

module.exports = {
    getAllCandidates,
};