import React from 'react';
import renderHTML from 'react-render-html';

export default function Editor(props) {
  return (
    <div>
      {renderHTML(props.text)}
    </div>
  )
}
