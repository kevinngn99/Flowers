const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(__dirname + '/flowers2019.db');

var SQLCreate = 'CREATE TABLE IF NOT EXISTS log_changes(flowerName VARCHAR(255), changesMade VARCHAR(255))';
db.all(SQLCreate, (err, rows) => {
    if (!err) {
        console.log('Table has been created!');
        var SQLFlowerInsertTrigger = 'CREATE TRIGGER logs_INSERTION_FLOWERS BEFORE INSERT ON FLOWERS BEGIN INSERT INTO log_changes (flowername,changesmade) VALUES(new.comname," insertion ON FLOWER TABLE"||new.comname|| " with genus: "||new.genus||" and species: "||new.species); END;';
        db.all(SQLFlowerInsertTrigger, (err, rows) => {
            if (!err) {
                console.log('Flower Insert Trigger has been created!');
            }
            else {
                console.log(err);
            }
        });

        var SQLFlowerDeleteTrigger = 'CREATE TRIGGER logs_DELETE_FLOWERS before DELETE on FLOWERS BEGIN INSERT INTO log_changes (flowername,changesmade) VALUES(old.comname," deletion ON FLOWER TABLE "||old.comname|| " with genus: "||old.genus||" and species: "||old.species); END;';
        db.all(SQLFlowerDeleteTrigger, (err, rows) => {
            if (!err) {
                console.log('Flower Delete Trigger has been created!');
            }
            else {
                console.log(err);
            }
        });

        var SQLSightingInsertTrigger = 'CREATE TRIGGER logs_INSERTION_SIGHTINGS BEFORE INSERT ON SIGHTINGS BEGIN INSERT INTO log_changes (flowername,changesmade) VALUES(new.name," insertion ON SIGHINGS TABLE "||new.name|| " with person: "||new.person||", location: "||new.location||", sighted: "||new.sighted); END;';
        db.all(SQLSightingInsertTrigger, (err, rows) => {
            if (!err) {
                console.log('Sighting Insert Trigger has been created!');
            }
            else {
                console.log(err);
            }
        });

        var SQLSightingDeleteTrigger = 'CREATE TRIGGER logs_DELETE_SIGHTINGS before DELETE on SIGHTINGS BEGIN INSERT INTO log_changes (flowername,changesmade) VALUES(old.name," deletion ON SIGHINGS TABLE "||old.name|| " with person: "||old.person||", location: "||old.location||", sighted: "||old.sighted); END;';
        db.all(SQLSightingDeleteTrigger, (err, rows) => {
            if (!err) {
                console.log('Sighting Delete Trigger has been created!');
            }
            else {
                console.log(err);
            }
        });

        var SQLFlowerUpdateTrigger = 'CREATE TRIGGER logs_UPDATE_FLOWERS BEFORE UPDATE ON FLOWERS BEGIN INSERT INTO log_changes (flowername,changesmade) VALUES(new.comname," update ON FLOWER TABLE"||new.comname|| " with genus: "||new.genus||" and species: "||new.species); END;';
        db.all(SQLFlowerUpdateTrigger, (err, rows) => {
            if (!err) {
                console.log('Flower Update Trigger has been created!');
            }
            else {
                console.log(err);
            }
        });

        var SQLSightingUpdateTrigger = 'CREATE TRIGGER logs_UPDATE_SIGHTINGS BEFORE UPDATE ON SIGHTINGS BEGIN INSERT INTO log_changes (flowername,changesmade) VALUES(new.name," UPDATE ON SIGHINGS TABLE "||new.name|| " with person: "||new.person||", location: "||new.location||", sighted: "||new.sighted); END;';
        db.all(SQLSightingUpdateTrigger, (err, rows) => {
            if (!err) {
                console.log('Sighting Update Trigger has been created!');
            }
            else {
                console.log(err);
            }
        });
    }
    else {
        console.log('Table already made.');
    }
});

exports.getFiles = (req, res) => {
    const db = new sqlite3.Database(__dirname + '/files.db');
    db.all('SELECT * FROM FILE', (err, rows) => {
        if (!err) {
            res.send(rows);
        }
        else {
            console.log(err);
        }
    });
}

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
    const SQLSightings = 'SELECT DISTINCT name, person, location, sighted FROM SIGHTINGS WHERE sighted IN (SELECT DISTINCT sighted FROM SIGHTINGS as S2 where S2.name = SIGHTINGS.name ORDER by sighted DESC limit 10) order by name, sighted';
    const db = new sqlite3.Database(__dirname + '/flowers2019.db');
    db.all(SQLSightings, (err, rows) => {
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

exports.sightingsInsert = (req, res) => {
    const name = "'" + req.body.name + "'";
    const person = "'" + req.body.person + "'";
    const location = "'" + req.body.location + "'";
    const date = "'" + req.body.date + "'";

    const SQLInsertSighting = 'INSERT INTO SIGHTINGS (NAME, PERSON, LOCATION, SIGHTED) VALUES (' + name + ', ' + person + ', ' + location + ', ' + date + ')';
    const db = new sqlite3.Database(__dirname + '/flowers2019.db');
    db.all(SQLInsertSighting, (err, rows) => {
        if (!err) {
            res.send('Sighting has been inserted!');
        }
        else {
            console.log(err);
        }
    });
}

exports.flowersInsert = (req, res) => {
    const name = "'" + req.body.name + "'";
    const genus = "'" + req.body.genus + "'";
    const species = "'" + req.body.species + "'";

    const SQLInsertFlower = 'INSERT INTO FLOWERS (GENUS, SPECIES, COMNAME) VALUES (' + genus + ', ' + species + ', ' + name + ')';
    const db = new sqlite3.Database(__dirname + '/flowers2019.db');
    db.serialize(function() {
        db.exec('BEGIN TRANSACTION').run(SQLInsertFlower).exec("COMMIT")
        .close(function() {
            res.send('Flower has been inserted!');
        });
    });
}

exports.filesInsert = (req, res) => {
    const name = "'" + req.body.name + "'";

    const SQLInsertFile = 'INSERT INTO FILE (one) VALUES (' + name + ')';
    const db = new sqlite3.Database(__dirname + '/files.db');
    db.all(SQLInsertFile, (err, rows) => {
        if (!err) {
            res.send('File has been inserted!');
        }
        else {
            console.log(err);
        }
    });
}

exports.filesDelete = (req, res) => {
    const name = "'" + req.body.name + "'";

    const SQLDeleteFile = 'DELETE FROM FILE WHERE one = ' + name;
    const db = new sqlite3.Database(__dirname + '/files.db');
    db.all(SQLDeleteFile, (err, rows) => {
        if (!err) {
            res.send('File has been deleted!');
        }
        else {
            console.log(err);
        }
    });
}

exports.sightingsDelete = (req, res) => {
    const name = "'" + req.body.name + "'";
    const person = "'" + req.body.person + "'";
    const location = "'" + req.body.location + "'";
    const date = "'" + req.body.date + "'";

    const SQLDeleteSighting = 'DELETE FROM SIGHTINGS WHERE NAME = ' + name + ' AND PERSON = ' + person + ' AND LOCATION = ' + location + ' AND SIGHTED = ' + date;
    const db = new sqlite3.Database(__dirname + '/flowers2019.db');
    db.all(SQLDeleteSighting, (err, rows) => {
        if (!err) {
            res.send('Sighting has been deleted!');
        }
        else {
            console.log(err);
        }
    });
}

exports.flowersDelete = (req, res) => {
    const name = "'" + req.body.name + "'";
    const genus = "'" + req.body.genus + "'";
    const species = "'" + req.body.species + "'";

    const SQLDeleteFlower = 'DELETE FROM FLOWERS WHERE COMNAME = ' + name + ' AND GENUS = ' + genus + ' AND SPECIES = ' + species;
    const db = new sqlite3.Database(__dirname + '/flowers2019.db');
    db.all(SQLDeleteFlower, (err, rows) => {
        if (!err) {
            res.send('Flower has been deleted!');
        }
        else {
            console.log(err);
        }
    });
}
