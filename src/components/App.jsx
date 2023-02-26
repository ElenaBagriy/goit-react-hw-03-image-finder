import React, {Component} from "react";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Modal from "./Modal/Modal";
import Button from "./Button/Button";
import Loader from "./Loader/Loader";
import Notify from "./Notify/Notify";

export class App extends Component {
  state = {
    query: '',
    page: 1,
    showButton: false,
    src : '',
    tags: '',
    loading: false,
    notification: {},
  }

  toggleModal = (largeImageURL, tags) => {
    this.setState(({showModal}) => ({
        src: largeImageURL, 
        tags,
        notification: {},
      }))
  }

  onSearchSubmit = (query) => {
    this.setState({
      query, 
      page: 1,
      showButton: false,
      loading: true,
      notification: {},
    })
  }

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page +=1,
      showButton: false,
      loading: true,
      notification: {},
    }))
  }

  showButton = (status) => {
    this.setState({
      showButton: status,
    })
  }

  stopSpinner = () => {
    this.setState({
      loading: false,
    })
  }

  onNotify = (type, message) => {
    this.setState({
      notification: {type, message}
    })
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
        <Searchbar onSubmit={this.onSearchSubmit} onNotify={this.onNotify}/>
        <ImageGallery 
        openImage={this.toggleModal} 
        query={this.state.query} 
        page={this.state.page} 
        showButton={this.showButton} 
        stopSpinner={this.stopSpinner} 
        onNotify={this.onNotify}
        />
        {this.state.showButton && <Button onClick={this.onLoadMore} >Load more</Button>}
        {this.state.src && (<Modal onCloseModal={this.toggleModal}><img src={this.state.src} alt={this.state.tags} /></Modal>)}
        {this.state.loading && <Loader/>}
        {this.state.notification.type && <Notify type={this.state.notification.type} message={this.state.notification.message}/>}
      </div>
    );
  }
}