class HomeView extends React.Component {
  constructor(props) {
    super(props)
  }

  transitionToAddConcoction() {
    //css animations
    //change view on app state to addConcoction
  }

  render() {
    return (
      <div>
      {props.appState.concoctions.map(function(concoction) {
        return (
          <div>
            <Concoction concoctionInfo={concoction} servicesDetail={props.appState.servicesDetail}/>
          </div>
        )
      })}
      <div onClick={()=>{this.transitionToAddConcoction()}}>
        Add Concoction
      </div>
      </div>
    )
  }
}


window.HomeView = HomeView;