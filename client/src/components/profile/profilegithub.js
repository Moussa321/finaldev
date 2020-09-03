import React, { Component } from "react";
import { Link } from "react-router-dom";
import Proptypes from "prop-types";

class profileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: "ef7c427181240b903a8f",
      clientSecret: "a44665f6763164b9fb259fef09efaa6678870ae1",
      count: 5,
      sort: "created: asc",
      repos: [],
    };
  }
  componentDidMount() {
    const { username } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;
    fetch(
      "https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${cleintId}& client_secret=${clientSecret}"
    )
      .then((res) => res.json())
      .then((data) => {
        if (this.refs.myref) {
          this.setState({ repos: data });
        }
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { repos } = this.state;
    const repoitem = repos.map((repo) => (
      <div key={repo.id} className="card card-body nb-2">
        <div className="row">
          <div className="col-md-6">
            <h4>
              <Link to={repo.html_url} className="text-info" target="_blank">
                {repo.name}
              </Link>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div className="col-md-6">
            <span className="badge badge-info mr-1">
              Stars: {repo.stargazers_count}
            </span>
            <span className="badge badge-secondary mr-1">
              Watchers: {repo.watchers_count}
            </span>
            <span className="badge badge-success">
              Forks: {repo.forks_count}
            </span>
          </div>
        </div>
      </div>
    ));
    return (
      <div ref="myref">
        <hr>
          <h3 className="mb-4">Latest Github repos</h3>
          {repoitem}
        </hr>
      </div>
    );
  }
}
profileGithub.Proptypes = {
  username: Proptypes.string.isRequired,
};
export default profileGithub;
