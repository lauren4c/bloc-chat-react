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

  render() {
    return (
      <div className="sign-in-out">
        <h4>
          Hello, {this.props.user ? this.props.user.displayName : "Guest"}
        </h4>
        <button className="sign-in" onClick={() => this.googleSignin(this)}>
          Sign In
        </button>
        <button className="sign-out" onClick={() => this.googleSignout(this)}>
          Sign Out
        </button>
      </div>
    );
  }
}
export default User;
