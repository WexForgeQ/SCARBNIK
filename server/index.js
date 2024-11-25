const express = require('express');
const cors = require('cors');
const app = express()
const fs = require('fs');
const https = require('https');
const {sequelize} = require('./models/models')
const { DataTypes } = require('sequelize');

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));

app.use(express.json());

const SSL_KEY_PATH = './credentials/server.key'
const SSL_CERT_PATH = './credentials/server.crt'

const PORT = 5000;

const options = {
    key: fs.readFileSync(SSL_KEY_PATH),
    cert: fs.readFileSync(SSL_CERT_PATH)
}

const startserver = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        const httpsServer = https.createServer(options, app)
        httpsServer.listen(PORT, (err) => {
            if(err) {
              console.log(err);
            }
            const serverAddress = httpsServer.address();
            console.log('HTTPS Server is running on port', PORT);
          });
    }
    catch (e) {
        console.log(e);
    }
};

startserver()