import express from 'express';
import { Sequelize } from 'sequelize';
import Tender from './models/Tender.js'; // Ensure to use the .js extension

const app = express();
const sequelize = new Sequelize('tender_portal', 'william', 'william', {
    host: 'localhost',
    dialect: 'postgres',
});

// Connect to the database
async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

// Sync the models with the database
async function syncDB() {
    try {
        await sequelize.sync(); // This will create the tables if they do not exist
        console.log('All models synced to the database.');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
}

app.use(express.json());

// Route to get all tenders
app.get('/api/tenders', async (req, res) => {
    try {
        const tenders = await Tender.findAll();
        res.json(tenders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Other routes...

const PORT = process.env.PORT || 3000;

// Start the server after connecting and syncing the database
connectDB()
    .then(syncDB)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error during database operations:', error);
    });
