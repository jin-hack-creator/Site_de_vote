const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const participantRoutes = require('./src/routes/participant.routes');
const paymentRoutes = require('./src/routes/payment.routes');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/participants', participantRoutes);
app.use('/api/payment', paymentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
