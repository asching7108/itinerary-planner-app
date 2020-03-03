import React, { Component } from 'react';

const TripListContext = React.createContext({
	tripList: [],
	hasAuthToken: false,
	error: null,
	setTripList: () => {},
	setError: () => {},
	clearError: () => {},
	setAuthState: () => {}
})

export default TripListContext;

export class TripListProvider extends Component {
	state = {
		tripList: [],
		error: null
	}

	setTripList = tripList => {
		this.setState({ tripList });
	}

	setError = error => {
		console.error(error);
		this.setState({ error });
	}

	clearError = () => {
		this.setState({ error: null });
	}

	setAuthState = hasAuthToken => {
		this.setState({ hasAuthToken });
	}

	render() {
		const contextValue = {
			tripList: this.state.tripList,
			hasAuthToken: this.state.hasAuthToken,
			error: this.state.error,
			setTripList: this.setTripList,
			setError: this.setError,
			clearError: this.clearError,
			setAuthState: this.setAuthState
		};

		return (
			<TripListContext.Provider value={contextValue}>
				{this.props.children}
			</TripListContext.Provider>
		);
	}
}