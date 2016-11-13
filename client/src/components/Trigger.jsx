import React from 'react';

export default class Trigger extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>
        Trigger:
        </div>
        <div onClick={() => { console.log('authenticate slack'); }}>
        Slack
        </div>
      </div>
    );
  }
}
