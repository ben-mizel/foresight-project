import { useState, useEffect } from 'react';

function AppointmentList(props) {
  
  const [ appointments, setAppointments ] = useState([])

  useEffect(() => {
    fetch(`http://localhost:3000/api/appointments/${props.patientName}`)
      .then(res => res.json())
      .then(data => {
        setAppointments(data);
      })
      .catch(err => console.log(err))
  }, [props.patientName]);

  const appointmentItems = [];
  for (let i = 0; i < appointments.length; i += 1) {
    const { id, startDate, startTime, appointmentType } = appointments[i];
    appointmentItems.push(<div id={id}>
      <h4>{startDate} {startTime}</h4>
      <p>{appointmentType}</p>
    </div>);
  }

  return (
    <div>
      <hr/>
      { appointmentItems }
    </div>
  );
}

export default AppointmentList;