import 'dotenv/config';

import http from 'http';
import app from './app.js'

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, '0.0.0.0' , () => {
    console.log(`Server started at http://localhost:3000`);
})
