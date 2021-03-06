import React, { Component } from "react";
import "./style.css";
import axios from "axios";
import avatar from "../../images/avatar.svg";
import Suggestions from "../Suggestions";

class Bio extends Component {
  state = {
    name: "",
    userName: "",
    email: "",
    results: []
  };

  componentDidMount() {
    const { loggedIn, userId, history } = this.props;

    if (!loggedIn) {
      return history.push("/login");
    }

    axios
      .get(`/api/user/${userId}`)
      .then(res => {
        const { firstName, lastName, userName, email, posts } = res.data;
        this.setState({ name: `${firstName} ${lastName}`, userName, email, results: posts });
      })
      .catch(error => {
        // Response
        if (error.response) {
          if (error.response.status === 401) {
            this.props.updateState({ loggedIn: false, userId: null });
            this.props.history.push("/login");
          }
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

  componentDidUpdate() {
    const { loggedIn, history } = this.props;

    if (!loggedIn) {
      history.push("/login");
    }
  }

  render() {
    const { name, userName, results } = this.state;
    return (
      <div className="row pt-3">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4 mx-auto">
          <div id="bio" className="card mb-3 custom-bg-secondary">
            <div className="row no-gutters">
              <div className="col-4">
                <img width={100} height={100} src={avatar} className="avatar" alt="" />
              </div>
              <div className="col-8">
                <div className="card-body">
                  <h5 className="card-text">{name}</h5>
                  <h6 className="card-text text-muted">@{userName}</h6>
                </div>
              </div>
            </div>
          </div>
          <div id="userPosts" className="card mb-3 border-0">
            <div className="card-header custom-bg-nav text-white">Your Posts</div>
            <Suggestions results={results} />
          </div>
        </div>
      </div>
    );
  }
}

export default Bio;
