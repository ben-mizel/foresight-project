function PatientList(props) {
  const patientNames = [];
  for (let i = 0; i < props.patients.length; i += 1) {
    const currPatient = props.patients[i];
    const { firstName, lastName } = currPatient;
    const fullName = `${firstName} ${lastName}`;
    const displayName = `${lastName}, ${firstName}`
    patientNames.push(<p key={'Key: ' + fullName} id={fullName}>{displayName}</p>);
  }
  return (
    <div>
      <h1>Patient List</h1>
      { patientNames }
    </div>
  );
}

export default PatientList;