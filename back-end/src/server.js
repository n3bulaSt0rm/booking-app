const express = require('express');
const server = express();
const cors = require('cors')
const { connect } = require("./config/database")

server.use(express.json());

server.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173',
    }),
);

server.get('/', (req, res) => {
    res.send('Hello, World!');
});

const PORT = process.env.PORT ;
server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

connect()

