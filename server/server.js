const express = require('express');
const bodyParser = require('body-parser');
const patientController = require('./patientController');
const appointmentController = require('./appointmentController');

const app = express();
const port = 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/patients", patientController.getPatients, (req, res) => {
  res.status(200).json(res.locals.patients);
});

app.post("/api/patients/", patientController.addPatient, patientController.returnAddedPatient, (req, res) => {
  res.status(200).json(res.locals.patients);
});

app.get("/api/appointments/:patientName", appointmentController.getAppointments, (req, res) => {
  res.status(200).json(res.locals.appointments);
});

app.post("/api/appointments/:patientName", appointmentController.addAppointment, appointmentController.returnAddedAppointment, (req, res) => {
  res.status(200).json(res.locals.appointments);
})

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Unknown server error',
    status: 500,
    message: 'Check server logs for more info',
  };
  const newErr = Object.assign({}, defaultErr, err);
  console.log('SERVER LOG: ', newErr.log);
  res.status(newErr.status).send(newErr.message);
})

app.listen(port, () => console.log(`Listening on port ${port}`));