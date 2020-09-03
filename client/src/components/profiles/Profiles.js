import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import profileitem from "./profileitem";
import { getProfiles } from "../../actions/profileActions";
import profile from "../../../../validation/profile";
class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    const { profiles, loading } = this.props.profile;
    let profileitem;

    if (profiles === null || loading) {
      profileitem = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileitem = profiles.map((profile) => (
          <profileitem key={profile._id} profile={profile} />
        ));
      } else {
        profileitem = <h4>No profiles found...</h4>;
      }
    }
    return (
      <div className="profiles">
        <div className="container"></div> <div className="row"></div>{" "}
        <div className="col-md-12">
          <h1 className="display-4 text-center">Developer Profiles</h1>
          <p className="lead.text-center">Browse and connect with developers</p>
          {profileitem}
        </div>
      </div>
    );
  }
}
Profiles.PropTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({ profile: state.profile });

export default connect(mapStateToProps, { getProfiles })(Profiles);
