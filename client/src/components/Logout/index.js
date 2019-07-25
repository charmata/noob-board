import React, { Component } from "react";
import auth from "../../utils/auth";

class Logout extends Component {
  handleClick = e => {
    auth
      .logout()
      .then(res => {
        this.props.updateState({ loggedIn: false, userId: null });
        console.log("Logged out");
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <button
        className="btn dropdown-item"
        onClick={this.handleClick}
        data-toggle="collapse"
        data-target=".navbar-collapse.show"
      >
        Sign Out
      </button>
    );
  }
}

export default Logout;
