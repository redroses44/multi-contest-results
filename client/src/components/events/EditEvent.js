import React, { Component } from 'react'
import axios from 'axios'

class EditEvent extends Component {
  constructor() {
    super()
    this.state = {
      event: {}
    }
  }
  render() {
    return (
      <div className="mt-5">
        <h1>Edit</h1>
      </div>
    )
  }
}

export default EditEvent
