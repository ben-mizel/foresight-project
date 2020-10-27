import AppointmentList from './AppointmentList'
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

function PatientCard(props) {
  if (props.patientData) {
    const { firstName, lastName, dob, phone } = props.patientData;
    const displayName = `${firstName} ${lastName}`;
    return (
      <Rect>
        <h2>{displayName}</h2>
        <p>Date of Birth: {dob}</p>
        <p>Phone Number: {phone}</p>
        <AppointmentList patientName={`${firstName} ${lastName}`}/>
      </Rect>
    );
  }
  const displayName = `${props.patient.lastName}, ${props.patient.firstName}`
  return (
    <Rect>
      <p onClick={(event) => {props.selectPatient(event, props.patient)}}>{displayName}</p>
    </Rect>
  );
}

export default PatientCard;