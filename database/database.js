const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const papa = require('papaparse');

function readCSVToRows(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) reject(err);
      papa.parse(data, {
        complete(results) {
          resolve(results.data);
        },
      });
    });
  });
}

const DBSOURCE = '';
const db = new sqlite3.Database(DBSOURCE);

db.serialize(function() {
  db.run(`CREATE TABLE patients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT, 
      lastName TEXT,
      dob TEXT,
      phone TEXT
      )`);

  const stmt = db.prepare('INSERT INTO patients (firstName, lastName, dob, phone) VALUES (?,?,?,?)');
  readCSVToRows('database/patients.csv').then((patientRows) => {
    for (let i = 1; i < patientRows.length - 1; i++) {
      stmt.run(...patientRows[i]);
    }
    stmt.finalize();
  });
});

db.serialize(function() {
  db.run(`CREATE TABLE appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patientName TEXT, 
    startDate TEXT,
    startTime TEXT,
    appointmentType TEXT
    )`);

  const stmt = db.prepare('INSERT INTO appointments (patientName, startDate, startTime, appointmentType) VALUES (?,?,?,?)');
  readCSVToRows('database/appointments.csv').then((appointmentRows) => {
    for (let i = 1; i < appointmentRows.length - 1; i++) {
      stmt.run(...appointmentRows[i]);
    }
    stmt.finalize();
  });
});

module.exports = db;