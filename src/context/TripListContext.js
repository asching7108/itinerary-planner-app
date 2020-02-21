import React, { Component } from 'react';

const TripListContext = React.createContext({
  tripList: [],
  setTripList: () => {}
})

export default TripListContext;

export class TripListProvider extends Component {
  state = {
    tripList: []
  }

  setTripList = tripList => {
    this.setState({ tripList });
  }

  render() {
    const contextValue = {
      tripList: this.state.tripList,
      setTripList: this.setTripList
    };
    return (
      <TripListContext.Provider value={contextValue}>
        {this.props.children}
      </TripListContext.Provider>
    );
  }
}