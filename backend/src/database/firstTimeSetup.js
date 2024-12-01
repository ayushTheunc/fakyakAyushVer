const mysql = require('mysql2/promise');
const path = require('path');

const { CREATE_DATABASE, CREATE_TABLES } = require('./queries');
const  MOCK_DATA  = require('./mockData');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

async function insertMockData(connection){
    try{
        for (const [table, query] of Object.entries(MOCK_DATA)) {
            console.log(`Inserting mock ${table}...`);
            await connection.query(query);
            console.log(`Mock ${table} inserted successfully`);
        }
    }catch(error){
        console.error('Error inserting mock data:', error);
        throw error;  
    }
}

async function setupDatabase() {
    let connection;
    try {
        // First connection to create database
        console.log('Connecting to MySQL...');
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        });

        // Create database
        console.log('Creating database...');
        console.log('Executing:', CREATE_DATABASE);
        await connection.query(CREATE_DATABASE);

        // Use the database
        console.log('Switching to database...');
        await connection.query(`USE ${process.env.DB_NAME}`);

        // Create tables in order
        console.log('Creating tables...');
        for (const [tableName, query] of Object.entries(CREATE_TABLES)) {
            console.log(`Creating ${tableName} table...`);
            console.log('Executing:', query);
            await connection.query(query);
            console.log(`${tableName} table created successfully`);
        }

        // Insert mock data
        console.log('Inserting mock data...');
        await insertMockData(connection);

        console.log('Database setup completed successfully');
    } catch (error) {
        console.error('Error during database setup:', error);
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

if (require.main === module) {
    setupDatabase();
}

module.exports = setupDatabase;

