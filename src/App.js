import React, { Component } from "react";
import "./App.css";
import * as firebase from "firebase";
import RoomList from "./components/RoomList";

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
  render() {
    return (
      <div className="App">
        <aside className="room-list">
          <RoomList firebase={firebase} />
        </aside>
      </div>
    );
  }
}

export default App;
