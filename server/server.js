const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/database.js');

const app = express();
const port = 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Root endpoint
app.get("/", (req, res, next) => {
  res.json({"message":"Ok"})
});

app.get("/api/patients", (req, res, next) => {
  const sql = "select * from patients"
  const params = []
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json({
          "message":"success",
          "data":rows
      })
    });
});

app.post("/api/patients/", (req, res, next) => {
  const errors=[];
  if (!req.body.firstName){
      errors.push("No first name specified");
  }
  if (!req.body.lastName){
    errors.push("No last name specified");
}
  if (!req.body.dob){
      errors.push("No date of birth specified");
  }
  if (!req.body.phone){
      errors.push("No phone number specified");
  }
  if (errors.length){
      console.log('ERRORS!!!!!')
      res.status(400).json({"error":errors.join(",")});
      return;
  }
  const data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dob: req.body.dob,
      phone : req.body.phone
  }
  const sql ='INSERT INTO patients (name, dob, phone) VALUES (?,?,?)'
  const params =[data.name, data.dob, data.phone]
  db.run(sql, params, function (err, result) {
      if (err){
          res.status(400).json({"error": err.message})
          return;
      }
      res.json({
          "message": "success",
          "data": data,
          "id" : this.lastID
      })
  });
});

app.get("/api/appointments/", (req, res, next) => {
  const sql = "select * from appointments"
  const params = []
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json({
          "message":"success",
          "data":rows
      })
    });
});

app.post("/api/appointments/:name", (req, res, next) => {
  const errors=[];
  if (!req.params.name){
      errors.push("No name specified");
  }
  if (!req.body.date){
    errors.push("No date specified");
}
  if (!req.body.time){
      errors.push("No time specified");
  }
  if (!req.body.type){
      errors.push("No type specified");
  }
  if (errors.length){
      console.log('ERRORS!!!!!')
      res.status(400).json({"error":errors.join(",")});
      return;
  }
  const data = {
      name: req.params.name,
      date: req.body.date,
      time: req.body.time,
      type : req.body.type
  }
  const sql = "INSERT INTO appointments (name, date, time, type) VALUES (?,?,?,?)"
  const params = [data.name, data.date, data.time, data.type];
  db.run(sql, params, function (err, result) {
      if (err){
          res.status(400).json({"error": err.message})
          return;
      }
      res.json({
          "message": "success",
          "data": data,
          "id" : this.lastID
      })
  });
})

// Default response for any other request
app.use(function(req, res){
  res.status(404);
});

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