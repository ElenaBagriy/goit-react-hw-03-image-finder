import React from "react";
import css from './ImageGallery.module.css';
import PropTypes from "prop-types";

const ImageGalleryItem = ( {pictures, openImage} ) => {
        return pictures.length >0 && pictures.map(({id, webformatURL, largeImageURL, tags}) => (
                <li key={id} className={css.galleryItem}>
                    <img src={webformatURL} alt={tags} className={css.image} onClick={() => {openImage(largeImageURL, tags)}}/>
                </li>)
        )
};

ImageGalleryItem.propTypes = {
        openImage: PropTypes.func.isRequired,
        pictures: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.number.isRequired, 
                webformatURL: PropTypes.string, 
                largeImageURL: PropTypes.string, 
                tags: PropTypes.string,
})).isRequired,
      };

export default ImageGalleryItem;