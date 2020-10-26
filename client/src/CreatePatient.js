import { Component } from 'react'

class CreatePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      dob: '',
      phone: '',
    };

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleDateOfBirthChange = this.handleDateOfBirthChange.bind(this);
    this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFirstNameChange(event) {
    this.setState({firstName: event.target.value});
  }

  handleLastNameChange(event) {
    this.setState({lastName: event.target.value});
  }

  handleDateOfBirthChange(event) {
    this.setState({dob: event.target.value});
  }

  handlePhoneNumberChange(event) {
    this.setState({phone: event.target.value});
  }

  handleSubmit(event) {
    fetch('http://localhost:3000/api/patients', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state),
    })
    .then(res => res.json())
    .then(data => this.setState({ patients: data }))
    .catch(err => console.log(err))
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>Create Patient</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            First Name:
            <input type="text" onChange={this.handleFirstNameChange} />
          </label>
          <br/>
          <label>
            Last Name:
            <input type="text" onChange={this.handleLastNameChange} />
          </label>
          <br/>
          <label>
            Date of Birth:
            <input type="text" onChange={this.handleDateOfBirthChange} />
          </label>
          <br/>
          <label>
            Phone Number:
            <input type="text" onChange={this.handlePhoneNumberChange} />
          </label>
          <br/>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default CreatePatient;