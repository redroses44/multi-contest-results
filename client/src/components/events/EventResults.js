import React, { Component } from 'react'
import axios from 'axios'
import classnames from 'classnames'
import { Link } from 'react-router-dom'

class EventResults extends Component {
  constructor() {
    super()
    this.state = {
      results: [],
      rank: '',
      country: '',
      athlete: '',
      time: '',
      eventName: '',
      errors: {}
    }
  }

  async componentDidMount() {
    try {
      const response = await axios.get(`http://localhost:5000/api/events/${this.props.match.params.id}`)
      const data = await response.data
      this.setState({ eventName: data.name })
      this.setState({ results: data.results })
    } catch (e) {
      console.log(e)
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onDelete = async (id, e) => {
    e.preventDefault()
    const { results, eventName } = this.state
    const newArray = results.filter(result => result._id !== id)
    this.setState({ results: newArray })
    await axios.delete(`http://localhost:5000/api/results/${eventName}/${id}`)
  }


  onFilter = async e => {
    const { eventName } = this.state
    e.preventDefault()
    if (this.refs.filterType.value === 'rank') {
      const response = await axios.get(`http://localhost:5000/api/results/filter/${eventName}`)
      this.setState({ results: response.data.results })
    } else if (this.refs.filterType.value === 'points') {
      const response = await axios.get(`http://localhost:5000/api/results/filter/points/${eventName}`)
      this.setState({ results: response.data.results })
    }
  }


  onSubmit = async e => {
    const { rank, country, athlete, time, eventName } = this.state
    e.preventDefault()
    const newResult = {
      rank,
      country,
      athlete,
      time
    }
    try {
      await axios.post(`http://localhost:5000/api/results/${eventName}`, newResult)
      window.location.reload();
    } catch (e) {
      this.setState({ errors: e.response.data })
    }
  }

  render() {
    const { results, eventName, errors } = this.state
    const pointsConstant = 1.8
    const allResults = results.length === 0 ?
      'There is no results in this event yet.'
      : results.map(result =>
        <tr key={result._id}>
          <th scope="row">{result.rank}</th>
          <td>{result.country}</td>
          <td>{result.athlete}</td>
          <td>{result.time}</td>
          <td>{result.rank <= 15 ? (result.time * pointsConstant / result.rank).toFixed(1) : 0}</td>
          <td>
            <Link to={`/${eventName}/${result._id}`} className="btn btn-success">Edit</Link>
          </td>
          <td>
            <button className="btn btn-danger" onClick={this.onDelete.bind(this, result._id)}>Delete</button>
          </td>
        </tr>)
    return (
      <React.Fragment>
        <div className="container">
          <div className="row mt-5">
            <div className="col-md-12 mt-5">
              <h3 className="d-inline">{eventName}</h3>
              <Link className="btn btn-outline-dark ml-2" to="/">Back</Link>
              <button
                className="btn btn-outline-info ml-2"
                type="button"
                data-toggle="modal"
                data-target="#exampleModal">Add Result</button>
              <form className="form-inline float-md-right mt-3 mt-lg-0">
                <select ref="filterType" className="form-control mr-2 mt-sm-3 mt-md-0">
                  <option defaultValue>Choose a filter</option>
                  <option value="points">Filter by points</option>
                  <option value="rank">Filter by rank</option>
                </select>
                <button onClick={this.onFilter} className="btn btn-outline-dark mt-2 mt-md-0" >Filter</button>
              </form>
              <table className="table my-3 table-hover table-responsive-sm">
                <thead className="bg-light">
                  <tr>
                    <th scope="col">Rank</th>
                    <th scope="col">Country</th>
                    <th scope="col">Athlete</th>
                    <th scope="col">Result</th>
                    <th scope="col">Points</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {allResults}
                </tbody>
              </table>

            </div>
          </div>
        </div>


        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header text-center">
                <h3 className="modal-title" id="exampleModalLabel">Add Result</h3>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="col-10 mx-auto">
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <input
                        placeholder="* Rank"
                        type="text"
                        className={classnames("form-control", {
                          'is-invalid': errors.rank || errors.rankexists
                        })}
                        name="rank"
                        value={this.state.rank}
                        onChange={this.onChange}
                      />
                      {errors.rank && (
                        <div className="invalid-feedback">{errors.rank}</div>
                      )}
                      {errors.rankexists && (
                        <div className="invalid-feedback">{errors.rankexists}</div>
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        placeholder="* Country"
                        type="text"
                        name="country"
                        className={classnames("form-control", { 'is-invalid': errors.country })}
                        onChange={this.onChange}
                        value={this.state.country} />
                      {errors.country && (
                        <div className="invalid-feedback">{errors.country}</div>
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        placeholder="* Athlete"
                        type="text"
                        name="athlete"
                        className={classnames("form-control", {
                          'is-invalid': errors.athlete
                        })}
                        onChange={this.onChange}
                        value={this.state.athlete} />
                      {errors.athlete && (
                        <div className="invalid-feedback">{errors.athlete}</div>
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        placeholder="* Time (H:M:S)"
                        type="text"
                        name="time"
                        className={classnames("form-control", {
                          'is-invalid': errors.time
                        })}
                        onChange={this.onChange}
                        value={this.state.time} />
                      {errors.time && (
                        <div className="invalid-feedback">{errors.time}</div>
                      )}
                    </div>
                    <input type="submit" value="Submit" className="btn btn-outline-success btn-block" />
                    <input type="submit" data-dismiss="modal" value="Close" className="btn btn-outline-danger mt-3 btn-block" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment >
    )
  }
}

export default EventResults
