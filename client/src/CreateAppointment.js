function CreateAppointment(props) {
  return (
    <div>
      <hr></hr>
      <form onChange={props.updateNewAppointment} onSubmit={props.submitNewAppointment}>
        <input id="startDate" type="date" placeholder="Date" required/>
        <input id="startTime" type="time" name="time" required/>
        <select id="appointmentType" name="Type" required>
          <option value="">Type</option>
          <option value="Initial Visit">Initial Visit</option>
          <option value="Follow Up">Follow Up</option>
          <option value="Short Visit">Short Visit</option>
          <option value="Long Visit">Long Visit</option>
          <option value="Vaccination">Vaccination</option>
          <option value="Physical">Physical</option>
        </select>
        <input type="submit" value="Create Appointment"/>
      </form>
    </div>
  );
}

export default CreateAppointment;