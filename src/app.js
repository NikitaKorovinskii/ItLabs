const http = require('http');
const path = require('path');
const fs = require('fs');
const logsDir = 'logs';
const logsPath = path.resolve('./logs');
if (!fs.existsSync(logsPath)) {
    fs.mkdirSync(logsDir, {recursive: true});
}
const file = 'access-log.log';
const logFilePath = path.resolve(logsPath, file);
const port = process.env.PORT || 3000;
if (!port) {
    throw new Error('PORT variable not set!');
}
const createdAt = new Date();
const { Pool } = require('pg');
const connectionString = 'postgresql://postgres:9090@db:5432/itLabs';
const pool = new Pool({
    connectionString: connectionString,
});

const server = http.createServer((req, res) => {
    fs.appendFileSync(logFilePath, `${new Date().toISOString()}:request\n`);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    pool.query('SELECT name FROM id', (err, result) => {
        if (err) {
            console.log('Error in query', err);
            return;
        }
        res.end(`Result: ${result.rows[0].name}`);
    });
  //  res.end(`Hello World, started at ${createdAt.toISOString()}`);
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});