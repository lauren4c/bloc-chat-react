import React, { Component } from "react";
import "./App.css";
import * as firebase from "firebase";
import RoomList from "./components/RoomList";
import MessageList from "./components/MessageList";
import User from "./components/user";
//import Popup from "./components/Modal";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDvi7hoqxwVeCwFOEpzh5oSP09f0Ryk07Q",
  authDomain: "c-bloc-chat.firebaseapp.com",
  databaseURL: "https://c-bloc-chat.firebaseio.com",
  projectId: "c-bloc-chat",
  storageBucket: "c-bloc-chat.appspot.com",
  messagingSenderId: "271758643817"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeRoom: "",
      user: null,
      message: "",
      visible: false
    };
  }
  setActiveRoom(roomID) {
    this.setState({ activeRoom: roomID });
    console.log(this.state.activeRoom);
  }

  setUser(username) {
    this.setState({ user: username });
    //console.log(this.state.user);
  }

  render() {
    return (
      <div className="App">
        <header>
          <User
            firebase={firebase}
            user={this.state.user}
            setUser={username => this.setUser(username)}
          />
        </header>
        <aside className="room-list">
          <RoomList
            firebase={firebase}
            setActiveRoom={this.setActiveRoom.bind(this)}
            activeRoomID={this.state.activeRoom}
          />
        </aside>
        <main className="message-list">
          <MessageList
            firebase={firebase}
            activeRoomID={this.state.activeRoom}
            user={this.state.user}
          />
        </main>
      </div>
    );
  }
}

export default App;
