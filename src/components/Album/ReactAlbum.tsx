import React from "react"
import PhotoAlbum from "react-photo-album"
import PhotoSwipeLightbox from 'photoswipe/lightbox';

import 'photoswipe/style.css';
import "react-photo-album/rows.css";

export const ReactAlbum: React.FC<{ images: ImageMetadata[] }> = ({ images }) => {

  React.useEffect(() => {
    let lightbox: PhotoSwipeLightbox | null = new PhotoSwipeLightbox({
      gallery: '.gallery',
      children: 'a',
      pswpModule: () => import('photoswipe')
    })
    lightbox.on('openingAnimationStart', () => {
      document.body.classList.add('pswp-open')
    })
    lightbox.on('closingAnimationStart', () => {
      document.body.classList.remove('pswp-open')
    })
    lightbox.init()

    return () => {
      lightbox?.destroy()
      lightbox = null
    }
  }, [])

  return(
    <React.Suspense fallback={<div>Loading...</div>}>
      <PhotoAlbum
        componentsProps={{
          container: { className: "gallery my-8" },
        }}
        layout="rows"
        photos={images}
        render={{
          photo: (_, { photo, width, height, index }) => {
            return (
              <a
                key={index}
                href={photo.src}
                data-pswp-width={photo.width}
                data-pswp-height={photo.height}
              >
                <img
                  src={photo.src}
                  width={width}
                  height={height}
                />
              </a>
            )
          },
        }}
      />
    </React.Suspense>
  )
}
