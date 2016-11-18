import React from 'react';


const SaveNewConcoction = (props) => {
  if (!props.state.actions.reduce(function(prev, curr) {
      var complete = true;
      if (curr.action === '' || curr.actionOption === '' || curr.actionParams === '') {
        complete = false;
      };
      return prev && complete;
    }, true) || props.trigger === '' || props.triggerOption === '' || props.triggerParams === '') {
    return (
      <div className='saveDisabled'>
      Save New Concoction
      </div>
    );
  } else {
    return (
      <div className='saveEnabled'>
      Save New Concoction
      </div>
    );
  }
};

export default SaveNewConcoction;
