import React, { Component } from 'react';

const TripContext = React.createContext({
  trip: {},
  planList: [],
  setTrip: () => {},
  setPlanList: () => {}
})

export default TripContext;

export class TripProvider extends Component {
  state = {
    trip: {},
    planList: []
  }

  setTrip = trip => {
    this.setState({ trip });
  }

  setPlanList = planList => {
    this.setState({ planList });
  }

  render() {
    const contextValue = {
      trip: this.state.trip,
      planList: this.state.planList,
      setTrip: this.setTrip,
      setPlanList: this.setPlanList
    };
    return (
      <TripContext.Provider value={contextValue}>
        {this.props.children}
      </TripContext.Provider>
    )
  }
}