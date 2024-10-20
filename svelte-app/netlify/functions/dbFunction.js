const { Client } = require('pg');

exports.handler = async (event, context) => {
    const client = new Client({
        connectionString: process.env.DB_URI, // Set this in Netlify dashboard
    });

    await client.connect();

    // Example query
    const res = await client.query('SELECT * FROM your_table_name');
    await client.end();

    return {
        statusCode: 200,
        body: JSON.stringify(res.rows),
    };
};

