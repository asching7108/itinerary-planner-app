import React, { Component } from 'react';
import TripContext from '../context/TripContext';
import TripForm from '../components/TripForm/TripForm';

export default class EditTripPage extends Component {
	static defaultProps = { match: { params: '' } };
	
	constructor(props) {
		super(props);
		this.state = { error: null };
	}

	static contextType = TripContext;

	componentDidMount() {
		const { trip_id } = this.props.match.params;
		if (this.context.needToUpdate(trip_id)) {
			this.context.updateTrip(trip_id);
		}
	}

	componentDidUpdate() {
		if (!this.state.error && this.context.error) {
			this.setState({ error: this.context.error });
		}
	}

	handleUpdateTripSuccess = trip => {
		const { match: { params }, history } = this.props;
		this.context.updateTrip(params.trip_id);
		history.push(`/trip/${params.trip_id}`);
	}

	handleClickOnCancel = () => {
		const { match: { params }, history } = this.props;
		history.push(`/trip/${params.trip_id}`);
	}
	
	render() {
		const { trip } = this.context;
		const { error } = this.state;

		if (error) {
			return <section><h2>{error}</h2></section>;
		}

		return (
			<section className='EditTripPage'>
				<h2>Edit trip</h2>
				<TripForm 
					trip={trip}
					location={this.props.location}
					onUpdateTripSuccess={this.handleUpdateTripSuccess}
					onClickOnCancel={this.handleClickOnCancel}
				/>
			</section>
		);
	}
}