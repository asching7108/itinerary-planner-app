import React, { Component } from 'react';
import TripContext from '../context/TripContext';
import TripsApiService from '../services/trips-api-service';
import PlanForm from '../components/PlanForm/PlanForm';
import { Button } from '../components/Utils/Utils';

export default class EditPlanPage extends Component {
	static contextType = TripContext;

	componentDidMount() {
		if (this.context.needToUpdate) {
			this.context.updateTrip(this.props.match.params.trip_id);
		}
	}

	handleUpdatePlanSuccess = plans => {
		this.context.updateTrip(plans[0].trip_id);

		const { history } = this.props;
		history.push(`/trip/${plans[0].trip_id}`);
	}

	handleClickOnCancel = () => {
		this.props.history.goBack();
	}

	handleClickOnDelete = e => {
		const { trip_id, plan_id } = this.props.match.params;
		TripsApiService.deletePlan(trip_id, plan_id)
			.then(() => {
				const { history } = this.props;
				history.push(`/trip/${trip_id}`);
			})
			.catch(res => {
				console.log(res.error);
			});
	}
	
	render() {
		const { trip, planList } = this.context;
		const { trip_id, plan_id } = this.props.match.params;
		const plans = planList.filter(p => p.id === Number(plan_id));
		return (
			<section className='EditPlanPage'>
				<h2>Edit plan</h2>
				<Button
					className='delete'
					onClick={this.handleClickOnDelete}
				>
					Delete plan
				</Button>
				<PlanForm 
					tripId={trip_id}
					destCities={trip.dest_cities}
					plans={plans}
					location={this.props.location}
					onUpdatePlanSuccess={this.handleUpdatePlanSuccess}
					onClickOnCancel={this.handleClickOnCancel}
				/>
			</section>
		);
	}
}