import React, { Component } from "react";

class User extends Component {
  constructor(props) {
    super(props);

    this.usernameRef = this.props.firebase.database().ref("username");
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged(user => {
      this.props.setUser(user);
    });
  }

  componentWillUnmount() {
    this.props.setUser = null;
  }

  googleSignin() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;

        console.log(token);
        console.log(user);
      });
  }

  googleSignout() {
    this.props.firebase
      .auth()
      .signOut()

      .then(
        function() {
          console.log("Signout Succesfull");
        },
        function(error) {
          console.log("Signout Failed");
        }
      );
  }

  showButton(user) {
    if (this.props.user === null) {
      return (
        <button className="sign-in" onClick={() => this.googleSignin(this)}>
          Sign In
        </button>
      );
    } else
      return (
        <button className="sign-out" onClick={() => this.googleSignout(this)}>
          Sign Out
        </button>
      );
  }
  render() {
    return (
      <div className="sign-in-out">
        {this.showButton()}
        <h4>
          Hello, {this.props.user ? this.props.user.displayName : "Guest"}
        </h4>
      </div>
    );
  }
}
export default User;
