import React, { Component } from "react";
import Modal from "react-awesome-modal";

class NewRoomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  openNewRoomModal() {
    this.setState({
      visible: true
    });
  }

  closeNewRoomModal() {
    this.setState({
      visible: false
    });
  }

  render() {
    return (
      <section>
        <button type="submit" onClick={() => this.openNewRoomModal()}>
          Create New Room
        </button>
        <Modal
          visible={this.state.visible}
          width="400"
          height="300"
          effect="fadeInUp"
          onClickAway={() => this.closeNewRoomModal()}
        >
          <div className="modal-form">
            <form
              onSubmit={e =>
                this.props.createRoom(e) + this.closeNewRoomModal()
              }
            >
              <h2>Create A New Room</h2>
              <input
                type="text"
                className="modal-input"
                placeholder="New Room Name"
                onChange={e => this.props.handleChange(e)}
              />
              <button type="submit">Create!</button>
            </form>
          </div>
        </Modal>
      </section>
    );
  }
}

export default NewRoomModal;
