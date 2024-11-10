const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const voteRoutes = require('./routes/voteRoutes');
const candidateRoutes = require('./routes/candidateRoutes');
const authRoutes = require('./routes/authRoutes'); 
require('dotenv').config();

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/afx-v1/votes', voteRoutes);
app.use('/api/afx-v1/candidates', candidateRoutes);
app.use('/api/afx-v1/auth', authRoutes); 

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
