import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "./prop-types";
import { Link } from "./react-router-dom";
import Profileheader from "./profileheader";
import ProfileAbout from "./profileAbout";
import ProfileCreds from "./profileCreds";
import Profileheader from "./profilegithub";
import Spinner from "../common/spinner";
import { getProfilebyhandle } from "../../actions/profileActions";
import profileCreds from "./profileCreds";
import profileGithub from "./profilegithub";

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfilebyhandle(this.props.match.params.handle);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push("/Notfound");
    }
  }
  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back to profiles
              </Link>
            </div>
            <div className="col-md-6"></div>
            <Profileheader profile={profile} />
            <ProfileAbout profile={profile} />
            <profileCreds
              education={profile.education}
              experience={profile.experience}
            />
            {profile.githubusername ? (
              <profileGithub username={profile.githubusername} />
            ) : null}
          </div>
        </div>
      );
    }
    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}
Profile.PropTypes = {
  getProfilebyhandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { getProfilebyhandle })(Profile);
