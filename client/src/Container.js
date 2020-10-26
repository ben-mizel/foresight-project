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
    };
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
        <Column><CreatePatient/></Column>
        <Column><PatientList patients={this.state.patients}/></Column>
        <Column><PatientProfile/></Column>
      </Rect>
    );
  }
}

export default Container;