import React, {Component} from "react";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import { fetchImages } from "../service/api";
import Button from "./Button/Button";
import Loader from "./Loader/Loader";
import Notify from "./Notify/Notify";

export class App extends Component {
  state = {
    query: '',
    page: 1,
    pictures: [],
    showButton: false,
    loading: false,
    notification: {},
  }

  async componentDidUpdate(_, prevState) {

    if (prevState.query !== this.state.query || prevState.page !== this.state.page) {

      this.setState({
        showButton: false,
        loading: true,
        notification: {},
      });

      try {
        const { hits, totalHits } = await fetchImages(this.state.query, this.state.page);
        const loadedPictures = hits.reduce((acc, {id, webformatURL, largeImageURL, tags}) => {
          acc.push({id, webformatURL, largeImageURL, tags});
          return acc;
        }, []);

        if (loadedPictures.length === 0) {
          throw new Error('Sorry, there are no images with such name');
        };

        if (this.state.page === 1) {
          this.onNotify(`success`, `${totalHits} images found`)
        };

        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...loadedPictures],
        }));

        if (this.state.page >= totalHits / 12) {
          return this.setState({
            showButton: false,
          });
        };

        this.setState({
          showButton: true,
        })
      } catch (error) {
        this.onNotify('error', error.message);
      } finally {
        this.setState({
          loading: false,
        });
      }
    }
  }

  onSearchSubmit = (query) => {
    this.setState({
      query, 
      page: 1,
      pictures: [],
      showButton: false,
      loading: true,
      notification: {},
    })
  }

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page +=1,
    }))
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
        {this.state.pictures.length !== 0 && <ImageGallery
          pictures={this.state.pictures}
        />}
        {this.state.showButton && <Button onClick={this.onLoadMore} >Load more</Button>}
        {this.state.loading && <Loader/>}
        {this.state.notification.type && <Notify type={this.state.notification.type} message={this.state.notification.message}/>}
      </div>
    );
  }
}