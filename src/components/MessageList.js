import React, { Component } from "react";
import "./messageList.css";
class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      newMessage: ""
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

  createMessage(e) {
    e.preventDefault();
    if (!this.state.messages) {
      return;
    }

    this.messagesRef.push({
      content: this.state.newMessage,
      roomID: this.props.activeRoomID.key,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      username: this.props.user ? this.props.user.displayName : "Guest"
    });
    this.setState({ newMessage: "" });
  }

  handleChange(e) {
    this.setState({ newMessage: e.target.value });
  }

  showMessageBar() {
    if (this.props.activeRoomID.name !== this.props.activeRoomID.key) {
      return (
        <form onSubmit={e => this.createMessage(e)}>
          <input
            type="text"
            name="new-message"
            placeholder="Write your message here..."
            value={this.state.newMessage}
            onChange={e => this.handleChange(e)}
          />
          <button className="Message-Button" type="submit">
            Send
          </button>
        </form>
      );
    } else return;
  }

  formatDate(d) {
    var hours = d.getHours().toString();
    var minutes = d.getMinutes().toString();
    if (minutes < 9) {
      minutes = "0" + minutes;
    } else if (minutes.length === 1) {
      minutes = minutes + "0";
    }
    var month = d.getMonth().toString();
    var day = d.getDate().toString();
    var year = d.getFullYear();
    year = year.toString().substr(-2);
    month = month + 1;
    if (month.length === 1) {
      month = "0" + month;
    }

    //if day is between 1-9 pad right with a 0 for two digits
    if (day.length === 1) {
      day = "0" + day;
    }

    return hours + ":" + minutes + " " + month + "/" + day + "/" + year;
  }

  render() {
    return (
      <div className="Message-List">
        <div className="MessagesInRoom">
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
                  <b>{message.username}:</b> {message.content}{" "}
                  <span className="message-date">
                    ({this.formatDate(new Date(message.sentAt))})
                  </span>
                </li>
              </ul>
            ))}
        </div>
        <div className="CreateNewMessage">{this.showMessageBar()}</div>
      </div>
    );
  }
}

export default MessageList;
