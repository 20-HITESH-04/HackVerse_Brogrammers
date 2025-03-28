const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const createPolicyClaimRoutes = require('./policyClaimRoutes');

dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/admin', require('./routes/adminRoutes')); // Add admin routes
app.use('/api/damage-analysis', require('./routes/analysisRoutes')); // Add damage analysis routes
app.use("/api/signature", require("./routes/signatureRoutes"));
app.use('/api/location', createPolicyClaimRoutes(process.env.OPENCAGE_API_KEY));

// Error Handling for Undefined Routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});