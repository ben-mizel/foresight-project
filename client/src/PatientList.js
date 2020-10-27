import PatientCard from './PatientCard'
import styled from 'styled-components'
import { useState } from 'react'

const Rect = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

function PatientList(props) {
  const [searchText, setSearchText ] = useState('');

  const patients = [];
  for (let i = 0; i < props.patients.length; i += 1) {
    const currPatient = props.patients[i];
    const { firstName, lastName, id } = currPatient;
    const fullName = `${firstName} ${lastName}`;
    if (!searchText.length) {
      patients.push(<PatientCard key={'Key: ' + id} id={fullName} patient={currPatient} selectPatient={props.selectPatient}/>)
    } else if (fullName.toLowerCase().includes(searchText.toLowerCase())) {
      patients.push(<PatientCard key={'Key: ' + id} id={fullName} patient={currPatient} selectPatient={props.selectPatient}/>)
    }
  }

  return (
    <Rect>
      <h1>Patient List</h1>
      <input type="text" placeholder="Search..." size="15" onChange={(event) => setSearchText(event.target.value)}/>
      { patients }
    </Rect>
  );
}

export default PatientList;