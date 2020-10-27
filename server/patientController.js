const db = require('../database/database');

module.exports = {

  getPatients(req, res, next) {
    const sql = "SELECT * FROM patients ORDER BY lastName, firstName ASC";
    const params = [];
    db.all(sql, params, (err, rows) => {
      if (err) {
        const errObj = {
          log: err,
          status: 400,
          message: 'ERROR IN GETPATIENTS MIDDLEWARE',
        };
        return next(errObj);
      }
      res.locals.patients = rows;
      return next();
    });
  },

  addPatient(req, res, next) {
    const { firstName, lastName, dob, phone } = req.body;
    const sql ='INSERT INTO patients (firstName, lastName, dob, phone) VALUES (?,?,?,?)';
    const params = [firstName, lastName, dob, phone];
    db.all(sql, params, (err, rows) => {
      if (err) {
        const errObj = {
          log: err,
          status: 400,
          message: 'ERROR IN ADDPATIENT MIDDLEWARE',
        };
        return next(errObj);
      }
      return next();
    });
  },

  returnAddedPatient(req, res, next) {
    const sql = 'SELECT last_insert_rowid()';
    const params = [];
    db.all(sql, params, (err, rows) => {
      if (err) {
        const errObj = {
          log: err,
          status: 400,
          message: 'ERROR IN RETURNADDEDPATIENT MIDDLEWARE - SELECTING LAST_INSERTED_ROW',
        };
        return next(errObj);
      }
      const id = rows[0]['last_insert_rowid()'];
      const sql = 'SELECT * FROM patients WHERE (id) = (?)';
      const params = [id];
      db.all(sql, params, (err, rows) => {
        if (err) {
          const errObj = {
            log: err,
            status: 400,
            message: 'ERROR IN RETURNADDEDPATIENT MIDDLEWARE - SELECTING ADDED PATIENT',
          };
          return next(errObj);
        }
        res.locals.patients = rows;
        return next();
      })
    })
  }

}