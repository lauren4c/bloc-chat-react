import React, { Component } from "react";
import Modal from "react-awesome-modal";

class RenameRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  openRenameModal() {
    this.setState({
      visible: true
    });
  }

  closeRenameModal() {
    this.setState({
      visible: false
    });
  }

  render() {
    return (
      <div className="Rename-Room-Modal">
        <span onClick={() => this.openRenameModal()}>Rename</span>
        <Modal
          visible={this.state.visible}
          width="400"
          height="300"
          effect="fadeInUp"
          onClickAway={() => this.closeRenameModal()}
        >
          <div className="rename-room">
            <form
              onSubmit={e =>
                this.props.renameRoom(e, this.props.roomID) +
                this.closeRenameModal()
              }
            >
              <h2>Rename This Room</h2>
              <input
                type="text"
                className="Rename-text"
                placeholder={this.props.roomID.name}
                value={this.state.newRoomName}
                onChange={e => this.props.handleChange(e)}
              />
              <button type="submit">Rename</button>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}
export default RenameRoom;
