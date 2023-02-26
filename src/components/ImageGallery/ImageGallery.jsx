import React, {Component} from "react";
import ImageGalleryItem from "./ImageGalleryItem";
import css from './ImageGallery.module.css';
import { fetchImages } from "components/service/API";
import PropTypes from "prop-types";

class ImageGallery extends Component {

  static propTypes = {
    openImage: PropTypes.func.isRequired,
    query: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    showButton: PropTypes.func.isRequired,
    stopSpinner: PropTypes.func.isRequired,
    onNotify: PropTypes.func.isRequired,
  }

  state= {
    pictures: [],
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query) {
      this.setState({pictures: []})
    }

    if (prevProps.query !== this.props.query || prevProps.page !== this.props.page) {

      try {
        const { hits, totalHits } = await fetchImages(this.props.query, this.props.page);
        const loadedPictures = hits.reduce((acc, {id, webformatURL, largeImageURL, tags}, index) => {
          acc.push({id, webformatURL, largeImageURL, tags});
          return acc;
        }, []);

        if (loadedPictures.length === 0) {
          throw new Error('Sorry, there are no images with such name');
        };

        if (this.props.page === 1) {
          this.props.onNotify(`success`, `${totalHits} images found`)
        };

        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...loadedPictures],
          total: totalHits,
        }));

        if (this.props.page >= totalHits/12) {
          return this.props.showButton(false);
        };

        this.props.showButton(true);
      } catch (error) {
        this.props.onNotify('error', error.message);
      } finally {
        this.props.stopSpinner();
      }
    }
  }

  render() {
    return (
      <ul className={css.gallery}>
        <ImageGalleryItem 
          openImage={this.props.openImage}
          pictures={this.state.pictures}
        />
      </ul>)
  }
};

export default ImageGallery;