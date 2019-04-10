import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Events extends Component {
  constructor() {
    super()
    this.state = {
      events: []
    }
  }

  deleteEvent = async (id, e) => {
    e.preventDefault()
    const newArray = this.state.events.filter(event => event._id !== id)
    this.setState({ events: newArray })
    await axios.delete(`http://localhost:5000/api/events/${id}`)
  }

  async componentDidMount() {
    const response = await axios.get('http://localhost:5000/api/events')
    this.setState({ events: response.data })
  }
  render() {
    const { events } = this.state;
    const allEvents = events.map((event) =>
      <div key={event._id} className="card bg-light p-1 my-2">
        <div className="card-body">
          Event: {event.name}
          <button
            className="btn btn-outline-danger float-right"
            onClick={this.deleteEvent.bind(this, event._id)}>Delete</button>
          <Link
            className="btn btn-outline-primary float-right mr-2" to={`/${event._id}`}>Results</Link>
        </div>
      </div>)

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <h1 className="display-4 text-center my-4">All Events</h1>
            {allEvents}
          </div>
        </div>
      </div>
    )
  }
}

export default Events
