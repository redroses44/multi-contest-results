import React, { Component } from 'react'
import axios from 'axios'

class EventResults extends Component {
  constructor() {
    super()
    this.state = {
      results: []
    }
  }

  async componentDidMount() {
    try {
      const response = await axios.get(`http://localhost:5000/api/events/${this.props.match.params.id}`)
      const data = await response.data
      this.setState({ results: data.results })
    } catch (e) {
      console.log(e)
    }
  }
  render() {
    const { results } = this.state
    const allResults = results.length === 0 ?
      'There is no results in this event yet.'
      : results.map(result => <li>{result}</li>)
    return (
      <React.Fragment>
        <div className="container">
          <div className="row mt-5">
            <div className="col-md-6">
              <button className="btn btn-outline-info">Add Result</button>
              <p className="lead">{allResults}</p>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default EventResults
