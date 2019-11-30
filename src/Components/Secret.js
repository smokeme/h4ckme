import React, { Component } from "react";
import { instance } from "../Stores/User";
class Secret extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ip: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    instance.post("functions/ping", this.state);
  }
  handleChange(event) {
    this.setState({ ip: event.target.value });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.ip}
            onChange={this.handleChange}
            placeholder="Enter hostname to ping"
          />
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Secret;
