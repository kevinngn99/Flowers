const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const SQLiteRouter = require('../routes/SQLite.server.routes.js');

module.exports.init = () => {
    const app = express();
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    app.use('/api/', SQLiteRouter);

    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../../client/build')));
        app.get('*', function(req, res) {
            res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
        });
    }

    return app
}

