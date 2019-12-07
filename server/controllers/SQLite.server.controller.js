const sqlite3 = require('sqlite3').verbose();

exports.getData = (req, res) => {
    const db = new sqlite3.Database(__dirname + '/flowers2019.db');
    db.all('SELECT * FROM FLOWERS', (err, rows) => {
        console.log(rows);
        res.send(rows);
    });
}
