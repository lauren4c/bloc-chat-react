import React, { Component } from "react";
//import Modal from "react-awesome-modal";
import "./roomList.css";
import RenameRoom from "./renameRoomModal";
import NewRoomModal from "./Modal";

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      newRoomName: ""
    };

    this.roomsRef = this.props.firebase.database().ref("rooms");
  }

  componentDidMount() {
    this.roomsRef.on("child_added", snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) });
    });

    this.roomsRef.on("child_removed", snapshot => {
      const deleteRoom = snapshot.val();
      deleteRoom.key = snapshot.key;
      this.setState({
        rooms: this.state.rooms.filter(room => room.key !== deleteRoom.key)
      });
      console.log("Child_removed ran");
    });

    this.roomsRef.on("child_changed", snapshot => {
      const renamedRoom = snapshot.val();
      renamedRoom.key = snapshot.key;
      this.setState({
        rooms: this.state.rooms.map(room => {
          if (room.key === renamedRoom.key) {
            return renamedRoom;
          } else {
            return room;
          }
        })
      });
      console.log("Child_changed ran");
    });
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  createRoom(e) {
    e.preventDefault();
    if (!this.state.newRoomName) {
      return;
    }
    this.roomsRef.push({
      name: this.state.newRoomName
    });
    this.setState({ newRoomName: "" });
  }

  handleChange(e) {
    this.setState({ newRoomName: e.target.value });
    console.log(this.state.newRoomName);
  }

  deleteRoom(e, roomID) {
    e.preventDefault();
    this.roomsRef.child(roomID.key).remove();
    this.props.setActiveRoom("");
  }

  renameRoom(e, roomID) {
    e.preventDefault();
    this.roomsRef.child(roomID.key).update({ name: this.state.newRoomName });
    this.setState({ newRoomName: "" });
  }

  render() {
    return (
      <div className="RoomList-section">
        <NewRoomModal
          newRoomName={this.state.newRoomName}
          handleChange={this.handleChange.bind(this)}
          createRoom={this.createRoom.bind(this)}
        />
        <div className="new-room-modal" />
        {this.state.rooms.map((roomID, index) => (
          <div key={index}>
            <div
              className="Room-name"
              onClick={e => this.props.setActiveRoom(roomID)}
            >
              {roomID.name}{" "}
            </div>
            <div className="delete-rename">
              <span
                className="Delete-text"
                onClick={e => {
                  if (
                    window.confirm("Are you sure you wish to delete this room?")
                  )
                    this.deleteRoom(e, roomID);
                }}
              >
                Delete
              </span>
              <span className="inline-block">{" / "}</span>
              <div className="rename-room-modal">
                <RenameRoom
                  newRoomName={this.state.newRoomName}
                  handleChange={this.handleChange.bind(this)}
                  renameRoom={this.renameRoom.bind(this)}
                  roomID={roomID}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
export default RoomList;
