import React from 'react';

export default class AddAction extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div>
        Add Action
        </div>
        <div onClick={()=>{console.log('authenticate evernote')}}>
        Evernote
        </div>
      </div>
    )
  }
}