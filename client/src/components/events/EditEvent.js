import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class EditEvent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            result: {},
            rank: '',
            country: '',
            athlete: '',
            time: ''
        }
    }

    onSubmit = async e => {
        e.preventDefault()
        const editedResult = {
            rank: this.state.rank,
            country: this.state.country,
            athlete: this.state.athlete,
            time: this.state.time
        }
        await axios.put(`http://localhost:5000/api/results/${this.props.match.params.eventName}/${this.props.match.params.id}`, editedResult)
        await this.props.history.goBack()
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    async componentDidMount() {
        const response = await axios.get(`http://localhost:5000/api/results/${this.props.match.params.eventName}/${this.props.match.params.id}`)

        response.data.forEach(line => {
            this.setState({ result: line })
        })

        this.setState({
            rank: this.state.result.rank,
            athlete: this.state.result.athlete,
            country: this.state.result.country,
            time: this.state.result.time
        })

    }
    render() {
        const { rank, time, country, athlete } = this.state
        const {previous} = this.props
        console.log(previous)
        return (
            <div className="mt-5 container">
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <h1 className="display-4 text-center mt-5">Edit Result</h1>
                        <hr className="bg-warning w-25" style={{ height: '2px' }} />
                        <div className="card p-3 bg-dark text-white mt-5">
                            <div className="card-body">
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group my-1">
                                        <label htmlFor="rank">Rank</label>
                                        <input
                                            type="text"
                                            name="rank"
                                            onChange={this.onChange}
                                            className="form-control"
                                            value={rank}
                                        />
                                    </div>
                                    <div className="form-group my-1">
                                        <label htmlFor="country">Country</label>
                                        <input
                                            type="text"
                                            name="country"
                                            onChange={this.onChange}
                                            className="form-control"
                                            value={country} />
                                    </div>
                                    <div className="form-group my-1">
                                        <label htmlFor="athlete">Athlete</label>
                                        <input
                                            type="text"
                                            name="athlete"
                                            onChange={this.onChange}
                                            className="form-control"
                                            value={athlete} />
                                    </div>
                                    <div className="form-group my-3">
                                        <label htmlFor="time">Result</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={time}
                                            name="time"
                                            onChange={this.onChange} />
                                    </div>
                                    <input onClick={(e) => this.props.history.goBack()} className="btn btn-outline-light btn-block"
                                    value="Back"
                                    type="button"/>
                                    <input  type="submit" value="Edit" className="btn btn-outline-success btn-block my-3" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditEvent
