import React, { Component } from 'react'
import axios from 'axios';
import classnames from 'classnames'

class AddEvent extends Component {

  constructor() {
    super()
    this.state = {
      name: '',
      errors: {}
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit = async e => {
    e.preventDefault()
    const { name } = this.state;
    const newEvent = {
      name
    }
    try {
      await axios.post('http://localhost:5000/api/events', newEvent)
      this.props.history.push('/')

    } catch (e) {
      this.setState({ errors: e.response.data })
    }

  }
  render() {
    const { errors } = this.state
    return (
      <React.Fragment>
        <div className="col-sm-8 col-md-6 mx-auto d-flex justify-content-center align-items-center" style={{ height: '90vh' }}>
          <div className="card p-5 bg-dark">
            <h1 className="display-4 text-white text-center mb-3">Add Event</h1>
            <form onSubmit={this.onSubmit} className="p-2">
              <div className="form-group">
                <input
                  type="text"
                  className={classnames("form-control", {
                    'is-invalid': errors.alreadyexists || errors.name
                  })}
                  name="name"
                  placeholder="Event Name"
                  onChange={this.onChange}
                  value={this.state.name} />
                {errors.alreadyexists && (
                  <div className="invalid-feedback text-white">{errors.alreadyexists}</div>
                )}
                {errors.name && (
                  <div className="invalid-feedback text-white">{errors.name}</div>
                )}

              </div>
              <input
                type="submit"
                className="btn btn-outline-light btn-block"
                value="Submit" />
            </form>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default AddEvent
