import React, { Component } from "react";
import axios from "axios";

class CommentForm extends Component {
  // Setting the component's initial state
  state = {
    body: "",
    error: ""
  };

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const { name, value } = event.target;
    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();
    if (this.state.body === "") {
      this.setState({ error: "You cannot have an empty comment box!" });
    } else {
      axios
        .post("/api/comment", { body: this.state.body, post: this.props.postId, author: this.props.userId })
        .then(response => {
          this.props.refresh();
          this.setState({ body: "", error: "" });
        })
        .catch(error => {
          // Response
          if (error.response) {
            if (error.response.status === 401) return window.location.replace("/login");
            console.log("error.response");
            console.log(error);
            // Request
          } else if (error.request) {
            console.log("error.request");
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error during setting up request", error.message);
          }
        });
    }
  };

  render() {
    return (
      <div className="col-12 col-sm-10 col-md-8 col-lg-6">
        <form id="comment-form" className="mb-3">
          <div className="form-group">
            <input
              className="form-control custom-bg-secondary"
              value={this.state.body}
              name="body"
              onChange={this.handleInputChange}
              type="text"
              placeholder="Comment"
              style={{ borderColor: `${this.state.error ? "red" : "#6c757d"}` }}
            />
            {this.state.error && (
              <small className="form-text" style={{ color: "red" }}>
                {this.state.error}
              </small>
            )}
          </div>
          <button className="btn btn-primary" onClick={this.handleFormSubmit}>
            Leave your comment!
          </button>
        </form>
      </div>
    );
  }
}

export default CommentForm;
