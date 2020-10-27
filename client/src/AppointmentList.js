import { useState, useEffect } from 'react';
import CreateAppointment from './CreateAppointment';
import styled from 'styled-components'

const Rect = styled.div`
  background-color: white;
  border: 2px solid black;
  border-radius: 5px;
  margin: 5px 5px;
  text-align: center;
  font-size: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

function AppointmentList(props) {
  
  const [ appointments, setAppointments ] = useState([]);
  const [ appointment, setAppointment ] = useState({appointmentType: 'Initial Visit'});

  useEffect(() => {
    fetch(`/api/appointments/${props.patientName}`)
      .then(res => res.json())
      .then(data => {
        setAppointments(data);
      })
      .catch(err => console.log(err))
  }, [props.patientName]);



  function updateNewAppointment(event) {
    const newAppointment = {};
    newAppointment[event.target.id] = event.target.value;
    const updatedAppointment = Object.assign({}, appointment, newAppointment);
    setAppointment(updatedAppointment);
  }

  function submitNewAppointment(event) {
    fetch(`/api/appointments/${props.patientName}`, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(appointment),
    })
    .then(res => res.json())
    .then(data => {
      const addedAppointment = data[0];
      const copyOfAppointments = JSON.parse(JSON.stringify(appointments));
      copyOfAppointments.unshift(addedAppointment);
      setAppointments(copyOfAppointments);
    })
    .catch(err => console.log(err))
    event.target.reset();
    event.preventDefault();
  }

  const appointmentItems = [];
  for (let i = 0; i < appointments.length; i += 1) {
    const { id, startDate, startTime, appointmentType } = appointments[i];
    appointmentItems.push(
      <Rect key={'Key: ' + id} id={id}>
        <h4>{startDate} @ {startTime}</h4>
        <p>{appointmentType}</p>
      </Rect>
    );
  }

  return (
    <div>
      <CreateAppointment updateNewAppointment={updateNewAppointment} submitNewAppointment={submitNewAppointment}/>
      { appointmentItems }
    </div>
  );
}

export default AppointmentList;