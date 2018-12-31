import React, { Component } from "react";

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };

    this.messagesRef = this.props.firebase.database().ref("messages");
  }

  componentDidMount() {
    this.messagesRef.on("child_added", snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({
        messages: this.state.messages.concat(message)
      });
    });
  }

  /*
  showMessages(message, index) {
    var filterMessages = this.state.messages.filter(message, index);
    var mapMessages = this.props.activeRoom.map(message, index);
    if (this.state.room === this.state.activeRoom) {
      return activeMessages.map((message, index) => (
        <div className="Message-content" key={index}>
          {message.username}: {message.content} ({message.sentAt})
        </div>
      ));
    } else return "Please choose a room.";
  }
  */

  render() {
    return (
      <div className="Message-List">
        {this.state.messages
          .filter(message => message.roomID === this.props.activeRoomID)
          .map(message => (
            <ul className="Message-content" key={message.key}>
              <li>
                {message.username}: {message.content} ({message.sentAt})
              </li>
            </ul>
          ))}
      </div>
    );
  }
}

export default MessageList;

/*      <div className="Message-List">
        {this.state.messages.map((message, index) => (
          <div className="Message-content" key={index}>
            {message.username}: {message.content} ({message.sentAt})
          </div>
        ))}
      </div>
    );

    */

//.filter message to only show current room
//return .map messages of current room
