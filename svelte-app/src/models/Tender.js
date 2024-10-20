import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js'; // Import the sequelize instance correctly

const Tender = sequelize.define('Tender', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
    },
    institution: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    openDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    closeDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    contactPerson: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// Export the Tender model
export default Tender;
