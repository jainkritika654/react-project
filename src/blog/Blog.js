import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
  
class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }
  componentDidMount() {
    if (localStorage.getItem("Data")) {
      console.log("blog");
    } else {
      this.setState({ redirect: true });
    }
  }
  onTitleChange(e) {
      this.setState({title: e.target.value});
  }
  onDesChange(e) {
      this.setState({descriptio: e.target.value});
  }

  render() {
    if (this.state.redirect) {
    return <Redirect to={"/Home"} />;
    }
    return (
      <div className="post">
        <div className="form-content">
          <form>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                placeholder="Title"
                onChange={this.onTitleChange}
              />
            </div>

            <div className="form-group">
              <textarea
                className="form-control"
                type="textarea"
                id="subject"
                name="description"
                placeholder="Description"
                onChange={this.onDesChange}
              ></textarea>
            </div>

            <button
              type="button"
              id="submit"
              name="submit"
              className="post-submit"
            >
              Add Post
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Blog;
