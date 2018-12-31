import React, { Component } from "react";
import "./App.css";
import * as firebase from "firebase";
import RoomList from "./components/RoomList";
import MessageList from "./components/MessageList";

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
      activeRoom: ""
    };
  }
  setActiveRoom(roomID) {
    this.setState({ activeRoom: roomID });
    console.log(this.state.activeRoom);
  }

  render() {
    return (
      <div className="App">
        <aside className="room-list">
          <RoomList
            firebase={firebase}
            setActiveRoom={this.setActiveRoom.bind(this)}
          />
        </aside>
        <main className="message-list">
          <MessageList
            firebase={firebase}
            activeRoomID={this.state.activeRoom}
          />
        </main>
      </div>
    );
  }
}

export default App;
