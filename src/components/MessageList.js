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

  render() {
    return (
      <div className="Message-List">
        <h2>
          {this.props.activeRoomID
            ? this.props.activeRoomID.name
            : "Choose a Room"}
        </h2>
        {this.state.messages
          .filter(message => message.roomID === this.props.activeRoomID.key)
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
