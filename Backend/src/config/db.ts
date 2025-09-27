import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbconfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'durazno',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    acquireTimeout: 60000,
    timeout: 60000,
};

export const Connection = mysql.createPool(dbconfig);

// Test database connection
Connection.getConnection()
    .then(connection => {
        console.log('Database connected successfully');
        connection.release();
    })
    .catch(error => {
        console.error('Database connection failed:', error.message);
        process.exit(1);
    });

