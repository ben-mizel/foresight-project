import PatientCard from './PatientCard'

function PatientList(props) {
  const patients = [];
  for (let i = 0; i < props.patients.length; i += 1) {
    const currPatient = props.patients[i];
    const { firstName, lastName, id } = currPatient;
    const fullName = `${firstName} ${lastName}`;
    patients.push(<PatientCard key={'Key: ' + id} id={fullName} patient={currPatient} selectPatient={props.selectPatient}/>)
  }
  return (
    <div>
      <h1>Patient List</h1>
      { patients }
    </div>
  );
}

export default PatientList;