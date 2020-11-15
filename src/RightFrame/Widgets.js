import React from 'react';

function Widgets() {
  return (
    <div className='widgets'>
      <iframe
        src='https://www.google.com//'
        width='340'
        height='100%'
        style={{ border: 'none', overflow: 'hidden' }}
        scrolling='no'
        frameborder='0'
        allowTransparency='true'
        aloow='encrypted-media'
      ></iframe>
    </div>
  );
}

export default Widgets;
