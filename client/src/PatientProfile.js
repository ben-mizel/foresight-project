import { Component } from 'react'

class PatientProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>Patient Profile</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            First Name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <br/>
          <label>
            Last Name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <br/>
          <label>
            Date of Birth:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <br/>
          <label>
            Phone Number:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <br/>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default PatientProfile;