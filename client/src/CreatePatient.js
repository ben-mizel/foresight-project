function CreatePatient(props) {
  return (
    <div>
      <h1>Create Patient</h1>
      <form onChange={props.updateNewPatient} onSubmit={props.submitNewPatient}>
        <input id="firstName" type="text" placeholder="First Name" required/>
        <br/>
        <input id="lastName" type="text" placeholder="Last Name" required/>
        <br/>
        <input id="dob" type="date" placeholder="Date of Birth" required/>
        <br/>
        <input id="phone" type="tel" placeholder="Phone Number" required/>
        <br/>
        <input type="submit" value="Submit"/>
      </form>
    </div>
  );
}

export default CreatePatient;