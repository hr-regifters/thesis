import React from 'react';

const Back = (props) => {
  return (
    <div className='inline' onClick={() => {props.undo()}}>
      <h2 className='saveBttn'><i className="fa fa-angle-left"></i>    Undo</h2>
    </div>
  );
};

export default Back;
