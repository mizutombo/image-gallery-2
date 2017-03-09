import React, { PropTypes } from 'react';

function DetailDisplay(props) {
  return (
    <div className='image-divs'>
      <p> Title: {props.image.title} </p>
      <p> Description: {props.image.description} </p>
      <a href={props.image.url}> Image Link </a>
      <button className='kill-button' onClick={() => this.props.onDelete(this.props.image.id)}>
        Delete
      </button>
    </div>
  );
}

DetailDisplay.propTypes = {
  image: PropTypes.object.isRequired,
};

export default DetailDisplay;
