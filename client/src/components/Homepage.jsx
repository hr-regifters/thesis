var HomePage(props) => (
  if (props.appState.view === 'home') {
    return (
      <div>
        <HomeView appState={props.appState} />
      </div>
    )
    
  } else if (props.appState.view === 'concoctionEdit') {
    //use the spotlightConcoctionId to find the correct concoction in the concoctions array
    //build the concoction view out of the info stored in the object
    return (
      <div>
        <ConcoctionView appState={props.appState} />
      </div>
    )

  } else if (props.appState.view === 'addConcoction')
    return (
      <div>
        <AddConcoctionView appState={props.appState} />
      </div>
    )

)

window.HomePage = HomePage;