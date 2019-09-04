import React from 'react'
import GalleryImage from './GalleryImage';

export default function GalleryImageContainer(props) {
  return (
    <div>
      {
        props.galleryImages.map(post => 
          <GalleryImage data={post} selectPost={props.selectPost} selectedPost={props.selectedPost} key={post._id}/>
        )
      }
    </div>
  )
}
