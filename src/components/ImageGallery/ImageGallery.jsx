import React from "react";
import ImageGalleryItem from "./ImageGalleryItem";
import css from './ImageGallery.module.css'

const ImageGallery = ({openImage}) => {
    return (<ul className={css.gallery}>
    {/* <!-- Набор <li> с изображениями --> */}
    <ImageGalleryItem openImage={openImage}></ImageGalleryItem>
  </ul>)
}

export default ImageGallery;