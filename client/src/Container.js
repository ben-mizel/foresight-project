import { Component } from 'react'
import styled from 'styled-components'
import CreatePatient from './CreatePatient'
import PatientList from './PatientList'
import PatientProfile from './PatientProfile'

const Rect = styled.div`
  display: flex;
  justify-content: space-evenly;
  background-color: rgba(255,146,0,1);
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25%;
`;

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patients: [],
      newPatient: {
        firstName: '',
        lastName: '',
        dob: '',
        phone: '',
      },
      patientSelected: {},
    };

    this.updateNewPatient = this.updateNewPatient.bind(this);
    this.submitNewPatient = this.submitNewPatient.bind(this);
    this.selectPatient = this.selectPatient.bind(this);
  }

  updateNewPatient(event) {
    const newPatientData = {};
    newPatientData[event.target.id] = event.target.value;
    const updatedPatient = Object.assign({}, this.state.newPatient, newPatientData);
    this.setState({newPatient: updatedPatient});
  }

  submitNewPatient(event) {
    fetch('http://localhost:3000/api/patients', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.newPatient),
    })
    .then(res => res.json())
    .then(data => {
      const addedPatient = data[0];
      const copyOfPatients = JSON.parse(JSON.stringify(this.state.patients));
      copyOfPatients.unshift(addedPatient);
      this.setState({patients: copyOfPatients});
    })
    .catch(err => console.log(err))
    event.target.reset();
    event.preventDefault();
  }

  selectPatient(event, clickedPatient) {
    this.setState({patientSelected: clickedPatient});
    event.preventDefault();
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/patients')
      .then(res => res.json())
      .then(data => this.setState({ patients: data }))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <Rect>
        <Column><CreatePatient updateNewPatient={this.updateNewPatient} submitNewPatient={this.submitNewPatient}/></Column>
        <Column><PatientList patients={this.state.patients} selectPatient={this.selectPatient}/></Column>
        <Column><PatientProfile patientData={this.state.patientSelected}/></Column>
      </Rect>
    );
  }
}

export default Container;