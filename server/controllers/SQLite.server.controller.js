const sqlite3 = require('sqlite3').verbose();

exports.getFlowers = (req, res) => {
    const db = new sqlite3.Database(__dirname + '/flowers2019.db');
    db.all('SELECT * FROM FLOWERS', (err, rows) => {
        res.send(rows);
    });
}

exports.getSightings = (req, res) => {
    const db = new sqlite3.Database(__dirname + '/flowers2019.db');
    db.all('SELECT * FROM SIGHTINGS', (err, rows) => {
        //console.log(rows);
        res.send(rows);
    });
}
