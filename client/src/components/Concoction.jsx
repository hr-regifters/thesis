class Concoction extends React.Component {
  constructor(props) {
    super(props)
  }

  transitionToEdit() {
    //css animations
    //change view on app state to concoctionEdit
  }

  render() {
    return (
      <div>
        Concoction
        <div>
          Turn Off
        </div>
        <div onClick={()=>{this.transitionToEdit()}}>
          Edit
        </div>
      </div>
    )
  }
}

window.Concoction = Concoction;