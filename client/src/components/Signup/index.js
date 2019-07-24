import React from "react";
import "./style.css";
import axios from "axios";

class Signup extends React.Component {
  state = {
    email: "",
    password: "",
    userName: "",
    firstName: "",
    lastName: "",
    error: ""
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    this.setState({ error: "" });
    event.preventDefault();
    const { updateState, history } = this.props;
    console.log("SIGN UP");
    axios
      .post("/signup", {
        email: this.state.email,
        password: this.state.password,
        userName: this.state.userName,
        firstName: this.state.firstName,
        lastName: this.state.lastName
      })
      .then(res => {
        updateState({ loggedIn: true, userId: res.data._id });
        history.push("/");
      })
      .catch(err => {
        if (err.response.status === 409) {
          return this.setState({
            error: "The email address is already registered"
          });
        }
        //TODO: error handling
        //create handle for email with no @ (regex)
        console.log(err.response);
      });
  };

  render() {
    return (
      <div className="row">
        <div className="col-sm-10 col-md-6 mx-auto">
          {this.state.error ? (
            <div className="text-center">
              <p className="bg-danger text-white">{this.state.error}</p>
            </div>
          ) : (
            <div />
          )}
          <h2 className="my-4">Sign Up Now!</h2>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="form-control my-4"
              onChange={this.handleChange}
              value={this.state.firstName}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="form-control my-4"
              onChange={this.handleChange}
              value={this.state.lastName}
              required
            />
            <input
              type="text"
              name="userName"
              placeholder="Username"
              className="form-control my-4"
              onChange={this.handleChange}
              value={this.state.userName}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              className="form-control my-4"
              onChange={this.handleChange}
              value={this.state.email}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-control my-4"
              onChange={this.handleChange}
              value={this.state.password}
              minLength="5"
              required
            />
            <input type="submit" value="Submit" className="btn btn-primary" />
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
