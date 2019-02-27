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
      <section className="modal-section">
        <span className="rename-text" onClick={() => this.openRenameModal()}>
          Rename
        </span>
        <Modal
          visible={this.state.visible}
          width="400"
          height="300"
          effect="fadeInUp"
          onClickAway={() => this.closeRenameModal()}
        >
          <div className="modal-form">
            <form
              onSubmit={e =>
                this.props.renameRoom(e, this.props.roomID) +
                this.closeRenameModal()
              }
            >
              <h2>Rename This Room</h2>
              <input
                type="text"
                className="modal-input"
                placeholder={this.props.roomID.name}
                value={this.state.newRoomName}
                onChange={e => this.props.handleChange(e)}
              />
              <button type="submit">Rename</button>
            </form>
          </div>
        </Modal>
      </section>
    );
  }
}
export default RenameRoom;
