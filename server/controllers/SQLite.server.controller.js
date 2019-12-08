const sqlite3 = require('sqlite3').verbose();

exports.getFlowers = (req, res) => {
    const db = new sqlite3.Database(__dirname + '/flowers2019.db');
    db.all('SELECT * FROM FLOWERS', (err, rows) => {
        if (!err) {
            res.send(rows);
        }
        else {
            console.log(err);
        }
    });
}

exports.getSightings = (req, res) => {
    const db = new sqlite3.Database(__dirname + '/flowers2019.db');
    db.all('SELECT * FROM SIGHTINGS', (err, rows) => {
        if (!err) {
            res.send(rows);
        }
        else {
            console.log(err);
        }
    });
}

exports.update = (req, res) => {
    const newName = "'" + req.body.newName + "'";
    const oldName = "'" + req.body.oldName + "'";
    const change = req.body.change;

    if (change === "name") {
        const SQLUpdateName = 'UPDATE FLOWERS SET COMNAME = ' + newName + ' WHERE FLOWERS.COMNAME = ' + oldName;
        const SQLUpdateSightings = 'UPDATE SIGHTINGS SET NAME = ' + newName + ' WHERE SIGHTINGS.NAME = ' + oldName;
        const db = new sqlite3.Database(__dirname + '/flowers2019.db');
        db.all(SQLUpdateName, (err, rows) => {
            if (!err) {
                db.all(SQLUpdateSightings, (err, rows) => {
                    if (!err) {
                        res.send('Name has been changed!');
                    }
                    else {
                        console.log(err);
                    }
                })
            }
            else {
                console.log(err);
            }
        });
    }
    else if (change === "genus") {
        const SQLUpdateName = 'UPDATE FLOWERS SET COMNAME = ' + newName + ' WHERE FLOWERS.COMNAME = ' + oldName;
        const SQLUpdateSightings = 'UPDATE SIGHTINGS SET NAME = ' + newName + ' WHERE SIGHTINGS.NAME = ' + oldName;
        const db = new sqlite3.Database(__dirname + '/flowers2019.db');
        db.all(SQLUpdateName, (err, rows) => {
            if (!err) {
                db.all(SQLUpdateSightings, (err, rows) => {
                    if (!err) {
                        res.send('Name has been changed!');
                    }
                    else {
                        console.log(err);
                    }
                })
            }
            else {
                console.log(err);
            }
        });
    }
    else if (change === "species") {

    }
    else if (change === "person") {

    }
    else if (change === "location") {

    }
    else if (change === "date") {

    }
}
