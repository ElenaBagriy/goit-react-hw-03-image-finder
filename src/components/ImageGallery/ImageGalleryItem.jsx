import React from "react";
import css from './ImageGallery.module.css'

const ImageGalleryItem = ({openImage}) => {
    return (<li className={css.galleryItem}>
        <img src="" alt="" className={css.image} onClick={openImage}/>
        </li>)
}

export default ImageGalleryItem;