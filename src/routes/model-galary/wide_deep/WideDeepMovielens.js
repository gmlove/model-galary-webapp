import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import s from './WideDeep.css'

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

class WideDeep extends React.Component {
  static contextTypes = {
    fetch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    extendedStyles: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      'user': 0,
      'item': 0,
      'age': 30,
      'delay_days': 430,
      'watch_year': 1998,
      'watch_month': 3,
      'watch_day': 7,
      'watch_wd': 6,
      'watch_season': 0,
      'relase_year': 1997,
      'release_month': 1,
      'release_day': 1,
      'release_wd': 1,
      'age_span': 30,
      'watch_span': 'TenYear',
      'gender': 'F',
      'occupation': 'doctor',
      'zipcode': '60089',
      'action': '0',
      'adventure': '0',
      'animation': '0',
      'child': '0',
      'comedy': '0',
      'crime': '0',
      'documentary': '0',
      'drama': '0',
      'fantasy': '0',
      'film_noir': '0',
      'horror': '0',
      'musical': '0',
      'mystery': '0',
      'romance': '0',
      'sci_fi': '0',
      'thriller': '0',
      'war': '0',
      'western': '0'
    };
    this.fields = ['user', 'item', 'age', 'gender', 'occupation', 'zipcode',
      'action', 'adventure', 'animation', 'child', 'comedy', 'crime',
      'documentary', 'drama', 'fantasy', 'film_noir', 'horror', 'musical',
      'mystery', 'romance', 'sci_fi', 'thriller', 'war', 'western',
      'delay_days', 'watch_year', 'watch_month', 'watch_day', 'watch_wd',
      'watch_season', 'relase_year', 'release_month', 'release_day',
      'release_wd', 'watch_span', 'age_span'];
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault();
    const queryObj = this.state;
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
    this.setState({ inferring: true });
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
    const { data } = await resp.json();
    console.log(`The response scores is ${data.widedeep.score}`);
    console.log(`The age is ${data.widedeep.request.age}`);
    this.setState({ score: data.widedeep.score });
  }

  handleInputChange(event) {
    event.preventDefault();
    let obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  }

  getStyle(name) {
    return (this.props.extendedStyles && this.props.extendedStyles[name]) || s[name];
  }

  render() {
    return (
      <div className={this.getStyle('root')}>
        <div className={this.getStyle('container')}>
          <form onSubmit={this.handleSubmit.bind(this)}>
            {this.fields.map(filed => (
              <label key={filed}>{capitalizeFirstLetter(filed)}: <input type="text"
                                                                        name={filed}
                                                                        value={this.state[filed]}
                                                                        onChange={this.handleInputChange}/>
              </label>

            ))}
            <br/>
            <input type="submit" value="submit"/>
            <br/>
            <br/>
            <br/>
            <label>The score user {this.state['user']} rating item {this.state['item']} is : {this.state.score}</label>
          </form>
        </div>
      </div>
    )
  }
}

export default withStyles(s)(WideDeep);
