import React, { Component } from "react";

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: []
    };

    this.roomsRef = this.props.firebase.database().ref("rooms");
  }

  componentDidMount() {
    this.roomsRef.on("child_added", snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) });
    });
  }

  createRoom(e) {
    e.preventDefault();
    if (!this.state.newRoomName) {
      return;
    }
    if (this.state.rooms.map(room => room.name === this.state.newRoomName)) {
      alert("Room already exists. Please pick a new name");
      return;
    }
    this.roomsRef.push({
      name: this.state.newRoomName
    });
    this.setState({ newRoomName: "" });
  }

  handleChange(e) {
    this.setState({ newRoomName: e.target.value });
  }

  render() {
    return (
      <div className="RoomList">
        {this.state.rooms.map((room, index) => (
          <div className="RoomName" key={index}>
            {room.name}
          </div>
        ))}

        <div className="CreateRoomForm">
          <form onSubmit={e => this.createRoom(e)}>
            <legend>Create a new chat room</legend>
            <input
              type="text"
              name="new-room"
              placeholder="New Room Name"
              value={this.state.newRoomName}
              onChange={e => this.handleChange(e)}
            />
            <button type="submit">Create!</button>
          </form>
        </div>
      </div>
    );
  }
}
export default RoomList;
