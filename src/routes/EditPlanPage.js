import React, { Component } from 'react';
import TripContext from '../context/TripContext';
import TripsApiService from '../services/trips-api-service';
import PlanForm from '../components/PlanForm/PlanForm';

export default class EditPlanPage extends Component {
	static contextType = TripContext;

	componentDidMount() {
		const { trip_id } = this.props.match.params;
		this.context.clearError();
		
		TripsApiService.getTripById(trip_id)
			.then(this.context.setTrip)
			.catch(this.context.setError);

		TripsApiService.getTripPlans(trip_id)
			.then(this.context.setPlanList)
			.catch(this.context.setError);
	}

	componentWillUnmount() {
		this.context.clearTrip();
	}

	handleUpdatePlanSuccess = plan => {
		const trip_id = this.props.match.params.trip_id;

		const { history } = this.props;
		history.push(`/trip/${trip_id}`);
	}

	handleClickOnCancel = () => {
		this.props.history.goBack();
	}
	
	render() {
		const { trip, planList } = this.context;
		const { trip_id, plan_id } = this.props.match.params;
		const plan = planList.find(p => p.id == plan_id);
		return (
			<section className='EditPlanPage'>
				<h2>Edit plan</h2>
				<PlanForm 
					tripId={trip_id}
					destCities={trip.dest_cities}
					plan={plan}
					location={this.props.location}
					onUpdatePlanSuccess={this.handleUpdatePlanSuccess}
					onClickOnCancel={this.handleClickOnCancel}
				/>
			</section>
		);
	}
}