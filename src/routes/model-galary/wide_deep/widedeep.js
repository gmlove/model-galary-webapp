import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import s from './WideDeep.css'

class WideDeep extends React.Component {
  static contextTypes = {
    fetch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      age: 25,
      capital_gain: 0,
      capital_loss: 0,
      education: '11th',
      education_num: 7,
      gender: 'Male',
      hours_per_week: 40,
      native_country: 'United-States',
      occupation: 'Machine-op-inspct',
      relationship: 'Own-child',
      workclass: 'Private'
    }
  }

  handleAgeChange(e) {
    e.preventDefault();
    console.log(e.target.name);
    this.setState({ age: e.target.value })
  }

  handleCapitalGainChange(e) {
    this.setState({ capital_gain: e.target.value })
  }

  handleCapitalLossChange(e) {
    this.setState({ capital_loss: e.target.value })
  }

  handleEducationChange(e) {
    this.setState({ education: e.target.value })
  }

  handleEducationNumChange(e) {
    this.setState({ education_num: e.target.value })
  }

  handleGenderChange(e) {
    this.setState({ gender: e.target.value })
  }

  handleHoursPerWeekChange(e) {
    this.setState({ hours_per_week: e.target.value })
  }

  handleNativeCountryChange(e) {
    this.setState({ native_country: e.target.value })
  }

  handleOccupationChange(e) {
    this.setState({ occupation: e.target.value })
  }

  handleRelationshipChange(e) {
    this.setState({ relationship: e.target.value })
  }

  handleWorkclassChange(e) {
    this.setState({ workclass: e.target.value })
  }

  handleSubmit(event) {
    event.preventDefault();
    var queryObj = this.state;
    let queryStr = "";
    for (let prop in queryObj) {
      queryStr += prop + '=' + queryObj[prop] + '&'
    }
    queryStr = queryStr.substr(0, queryStr.length - 1);
    this.withInferState(async () => {
      await this.queryScore(queryStr)
    })
  }

  async withInferState(asyncFunc) {
    this.setState({ inferring: true })
    try {
      await asyncFunc();
    } catch (e) {
      console.error("Error call api service.", e);
    } finally {
      this.setState({ inferring: false })
    }
  }

  async queryScore(queryStr) {
    this.setState({ score: null });
    const resp = await this.context.fetch('/graphql', {
      body: JSON.stringify({
        query: `{widedeep(queryObj:"${queryStr}"){score,request{age,gender}}}`
      }),
    });
    const {data} = await resp.json();
    console.log(`The response scores is ${data.widedeep.score}`);
    console.log(`The age is ${data.widedeep.request.age}`);
    this.setState({ score: data.widedeep.score });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label>Age: <input type="number"
                           name="age"
                           value={this.state.age}
                           onChange={this.handleAgeChange.bind(this)}/></label>
        <br/>
        <label>Capital Gain: <input type="number"
                                    name="capital_gain"
                                    value={this.state.capital_gain}
                                    onChange={this.handleCapitalGainChange.bind(this)}/></label>
        <br/>
        <label>Capital Loss: <input type="number"
                                    name="capital_loss"
                                    value={this.state.capital_loss}
                                    onChange={this.handleCapitalLossChange.bind(this)}/></label>
        <br/>
        <label>Education: <input type="text"
                                 name="education"
                                 value={this.state.education}
                                 onChange={this.handleEducationChange.bind(this)}/></label>
        <br/>
        <label>Education Num: <input type="number"
                                     name="education_num"
                                     value={this.state.education_num}
                                     onChange={this.handleEducationNumChange.bind(this)}/></label>
        <br/>
        <label>Gender: <input type="text"
                              name="gender"
                              value={this.state.gender}
                              onChange={this.handleGenderChange.bind(this)}/></label>
        <br/>
        <label>House Per Week: <input type="number"
                                      name="hours_per_week"
                                      value={this.state.hours_per_week}
                                      onChange={this.handleHoursPerWeekChange.bind(this)}/></label>
        <br/>
        <label>Workclass: <input type="text"
                                 name="workclass"
                                 value={this.state.workclass}
                                 onChange={this.handleWorkclassChange.bind(this)}/></label>
        <br/>
        <label>Native Country: <input type="text"
                                      name="native_country"
                                      value={this.state.native_country}
                                      onChange={this.handleNativeCountryChange.bind(this)}/></label>
        <br/>
        <label>Occupation: <input type="text"
                                  name="occupation"
                                  value={this.state.occupation}
                                  onChange={this.handleOccupationChange.bind(this)}/></label>
        <br/>
        <label>Relationship: <input type="text"
                                    name="relationship"
                                    value={this.state.relationship}
                                    onChange={this.handleRelationshipChange.bind(this)}/></label>
        <br/>
        <input type="submit" value="submit"/>
        <br/>
        <label>The Scores: {this.state.score}</label>
      </form>)
  }
}

export default withStyles(s)(WideDeep);
