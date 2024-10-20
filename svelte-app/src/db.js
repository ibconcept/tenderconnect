// db.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('tender_portal', 'william', 'william', {
    host: 'localhost',
    dialect: 'postgres',
});

// Export the sequelize instance and connection functions
export { sequelize };
