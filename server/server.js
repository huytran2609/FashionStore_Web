const express = require('express');
require('dotenv').config();
const dbConnect = require('./config/db_connect');
const initRoutes = require('./routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(
    cors({
        // origin: ["https://4best-fashion-store-web-seven.vercel.app/", "https://4best-fashion-store-web.vercel.app/"],
        origin: '*',
        // headers: ["Content-Type"],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    }),
);
// app.options('*', cors())
app.use(cookieParser());
const port = process.env.PORT || 8888;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dbConnect();
initRoutes(app);

app.listen(port, () => {
    console.log('Server running on the port: ' + port);
});
