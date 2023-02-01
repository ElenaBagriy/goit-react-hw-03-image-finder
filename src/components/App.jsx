import React, {Component} from "react";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Modal from "./Modal/Modal";
import Button from "./Button/Button";

export class App extends Component {
  state = {
    showModal: false,
  }

  toggleModal = () => {
    this.setState(({showModal}) => ({
      showModal: !showModal,
    }))
  }

  render() {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gridGap: "16px",
          paddingBottom: "24px",
        }}
      >
        <Searchbar></Searchbar>
        <ImageGallery openImage={this.toggleModal}></ImageGallery>
        <Button></Button>
        {this.state.showModal && (<Modal onCloseModal={this.toggleModal}><img src="" alt="" />
        <button type="button" onClick={this.toggleModal}>Close</button></Modal>)}
      </div>
    );
  }
}
