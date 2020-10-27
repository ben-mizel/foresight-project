import PatientCard from './PatientCard'

function PatientProfile(props) {
  if (props.patientData.firstName) {
    return (
      <div>
        <h1>Patient Profile</h1>
        <PatientCard patientData={props.patientData}/>
      </div>
    );
  }
  return (
    <div>
      <h1>Patient Profile</h1>
    </div>
  );
}

export default PatientProfile;