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

exports.flowersUpdate = (req, res) => {
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
        const SQLUpdateGenus = 'UPDATE FLOWERS SET GENUS = ' + newName + ' WHERE FLOWERS.GENUS = ' + oldName;
        const db = new sqlite3.Database(__dirname + '/flowers2019.db');
        db.all(SQLUpdateGenus, (err, rows) => {
            if (!err) {
                res.send('Genus has been changed!');
            }
            else {
                console.log(err);
            }
        });
    }
    else if (change === "species") {
        const SQLUpdateSpecies = 'UPDATE FLOWERS SET SPECIES = ' + newName + ' WHERE FLOWERS.SPECIES = ' + oldName;
        const db = new sqlite3.Database(__dirname + '/flowers2019.db');
        db.all(SQLUpdateSpecies, (err, rows) => {
            if (!err) {
                res.send('Species has been changed!');
            }
            else {
                console.log(err);
            }
        });
    }
}

exports.sightingsUpdate = (req, res) => {
    const newName = "'" + req.body.newName + "'";
    const person = "'" + req.body.person + "'";
    const name = "'" + req.body.name + "'";
    const location = "'" + req.body.location + "'";
    const date = "'" + req.body.date + "'";
    const change = req.body.change;

    if (change === "person") {
        const SQLUpdatePerson = 'UPDATE SIGHTINGS SET PERSON = ' + newName + ' WHERE SIGHTINGS.PERSON = ' + person + ' AND SIGHTINGS.NAME = ' + name + ' AND SIGHTINGS.LOCATION = ' + location + ' AND SIGHTINGS.SIGHTED = ' + date;
        const db = new sqlite3.Database(__dirname + '/flowers2019.db');
        db.all(SQLUpdatePerson, (err, rows) => {
            if (!err) {
                res.send('Person has been changed!');
            }
            else {
                console.log(err);
            }
        });
    }
    else if (change === "location") {
        const SQLUpdateLocation = 'UPDATE SIGHTINGS SET LOCATION = ' + newName + ' WHERE SIGHTINGS.PERSON = ' + person + ' AND SIGHTINGS.NAME = ' + name + ' AND SIGHTINGS.LOCATION = ' + location + ' AND SIGHTINGS.SIGHTED = ' + date;
        const db = new sqlite3.Database(__dirname + '/flowers2019.db');
        db.all(SQLUpdateLocation, (err, rows) => {
            if (!err) {
                res.send('Location has been changed!');
            }
            else {
                console.log(err);
            }
        });
    }
    else if (change === "date") {
        const SQLUpdateDate = 'UPDATE SIGHTINGS SET SIGHTED = ' + newName + ' WHERE SIGHTINGS.PERSON = ' + person + ' AND SIGHTINGS.NAME = ' + name + ' AND SIGHTINGS.LOCATION = ' + location + ' AND SIGHTINGS.SIGHTED = ' + date;
        const db = new sqlite3.Database(__dirname + '/flowers2019.db');
        db.all(SQLUpdateDate, (err, rows) => {
            if (!err) {
                res.send('Date has been changed!');
            }
            else {
                console.log(err);
            }
        });
    }
}
