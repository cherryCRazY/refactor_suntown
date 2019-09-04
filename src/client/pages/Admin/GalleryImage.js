import React from 'react'
import { fileUrl } from '../../config';

export default function GalleryImage(props) {
  const id = props.data._id;
  return (
    <div style={{display: 'inline-block', border: props.selectedPost === id ? '1px solid blue' : null}}
      onClick={() => props.selectPost(id)}>
      <img style={{width: '250px', height: 'auto'}} src={`${fileUrl}${props.data.image}`} alt="gallery post" />
    </div>
  )
}
