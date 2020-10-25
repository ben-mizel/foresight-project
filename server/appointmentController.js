const db = require('../database/database');

module.exports = {

  getAppointments(req, res, next) {
    const { patientName } = req.params;
    const sql = 'SELECT * FROM appointments WHERE (patientName) = (?) ORDER BY startDate DESC';
    const params = [patientName];
    db.all(sql, params, (err, rows) => {
      if (err) {
        const errObj = {
          log: err,
          status: 400,
          message: 'ERROR IN GETAPPOINTMENTS MIDDLEWARE',
        };
        return next(errObj);
      }
      res.locals.appointments = rows;
      return next();
    });
  },

  addAppointment(req, res, next) {
    const { patientName } = req.params;
    const { startDate, startTime, appointmentType } = req.body;
    const sql ='INSERT INTO appointments (patientName, startDate, startTime, appointmentType) VALUES (?,?,?,?)';
    const params = [patientName, startDate, startTime, appointmentType];
    db.all(sql, params, (err, rows) => {
      if (err) {
        const errObj = {
          log: err,
          status: 400,
          message: 'ERROR IN ADDAPPOINTMENT MIDDLEWARE',
        };
        return next(errObj);
      }
      return next();
    });
  },
  
  returnAddedAppointment(req, res, next) {
    const sql = 'SELECT last_insert_rowid()';
    const params = [];
    db.all(sql, params, (err, rows) => {
      if (err) {
        const errObj = {
          log: err,
          status: 400,
          message: 'ERROR IN RETURNADDEDAPPOINTMENT MIDDLEWARE - SELECTING LAST_INSERTED_ROW',
        };
        return next(errObj);
      }
      const id = rows[0]['last_insert_rowid()'];
      const sql = 'SELECT * FROM appointments WHERE (id) = (?)';
      const params = [id];
      db.all(sql, params, (err, rows) => {
        if (err) {
          const errObj = {
            log: err,
            status: 400,
            message: 'ERROR IN RETURNADDEDAPPOINTMENTMIDDLEWARE - SELECING ADDED APPOINTMENT',
          };
          return next(errObj);
        }
        res.locals.appointments = rows;
        return next();
      })
    })
  }

}