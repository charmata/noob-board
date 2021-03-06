import React from "react";
import axios from "axios";
import Moment from "react-moment";

class CommentBox extends React.Component {
  constructor() {
    super();

    this.state = {
      showComments: true,
      users: []
    };
  }

  componentDidMount() {
    this.loadUser();
  }

  componentDidUpdate(oldProps) {
    const { comments } = this.props;
    if (comments && oldProps.comments.length !== comments.length) {
      this.loadUser();
    }
  }

  loadUser = () => {
    const { comments } = this.props;
    const { users } = this.state;
    const usersArray = [...new Set(comments.map(comment => comment.author))];
    if (usersArray.length !== users.length) {
      axios
        .get("/api/user", {
          params: {
            _id: usersArray
          }
        })
        .then(res => {
          this.setState({ users: res.data });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  matchUser = author => {
    const { users } = this.state;
    const foundUser = users.find(user => user._id === author);
    if (foundUser) {
      return foundUser.userName;
    }
  };

  render() {
    const { comments } = this.props;
    const { showComments } = this.state;

    return (
      <div id="comment-box" className="col-12 col-md-10 col-lg-8">
        <button
          id="comment-reveal"
          className={`btn btn-outline-${showComments ? "secondary" : "primary"} btn-sm float-right`}
          onClick={this._handleClick.bind(this)}
        >
          {showComments ? "Hide Comments" : "Show Comments"}
        </button>
        <h3>Comments</h3>
        <h4 id="comment-count">{this._getCommentsTitle(comments.length)}</h4>
        {showComments ? (
          <div id="comment-list">
            {comments.map(comment => (
              <div className="card mb-3 custom-bg-secondary" key={comment._id}>
                <div className="card-body">
                  <h5 className="card-title">
                    {this.matchUser(comment.author)}
                    <span className="h6 text-muted float-right">
                      <Moment fromNow>{comment.createdAt}</Moment>
                    </span>
                  </h5>
                  <p className="card-text">{comment.body}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  } // end render

  _handleClick() {
    this.setState({
      showComments: !this.state.showComments
    });
  }

  _getCommentsTitle(commentCount) {
    if (commentCount === 0) {
      return "No comments yet";
    } else if (commentCount === 1) {
      return "1 comment";
    } else {
      return `${commentCount} comments`;
    }
  }
}

export default CommentBox;
