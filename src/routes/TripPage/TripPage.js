import React, { Component } from 'react';
import moment from 'moment';
import TripContext from '../../context/TripContext';
import TripsApiService from '../../services/trips-api-service';
import TripItem from '../../components/TripItem/TripItem';
import PlanItem from '../../components/PlanItem/PlanItem';
import { formatDate, LinkButton, EditIcon, DeleteIcon, CloseIcon } from '../../components/Utils/Utils';
import './TripPage.css';

export default class TripPage extends Component {
	static contextType = TripContext;
	
	componentDidMount() {
		const { trip_id } = this.props.match.params;
		if (this.context.needToUpdate(trip_id)) {
			this.context.updateTrip(trip_id);
		}
	}

	componentDidUpdate() {
		if (this.context.error) {
			this.props.history.push('/page-not-found');
		}
	}

	handleClickOnDelete = e => {
		const { match: { params }, history } = this.props;
		TripsApiService.deleteTrip(params.trip_id)
			.then(() => {
				history.push('/');
			})
			.catch(res => {
				console.log(res.error);
			});
	}

	renderDate(i, date) {
		return (
			<p key={i} className='TripPage__date'>
				{formatDate(date).toUpperCase()}
			</p>
		);
	}

	renderPlans() {
		const { trip, planList = [] } = this.context;
		
		if (!planList.length) {
			return (
				<p className='TripPage__no-plan'>
					Start adding plans to your trip now.
				</p>
			);
		}

		const elements = [];
		let currDate = getDateStrWithoutTime(planList[0].comparable_date);
		
		elements.push(
			this.renderDate(0, currDate)
		);
		for(let i = 0; i < planList.length; i++) {
			const plan = planList[i];
			
			if (getDateStrWithoutTime(plan.comparable_date) > currDate) {
				currDate = getDateStrWithoutTime(plan.comparable_date);
				elements.push(
					this.renderDate(elements.length, currDate)
				);
			}
			elements.push(
				<PlanItem
					key={elements.length}
					trip_id={trip.id}
					plan={plan}
					location={this.props.location}
				/>
			);
		}
		return elements;
	}

	render() {
		const { trip } = this.context;
		return (
			<section className='TripPage'>
				<div className='TripPage__close-icon-row'>
					<CloseIcon onClick={e => this.props.history.push('/')} />
				</div>
				<TripItem
					trip={trip}
					location={this.props.location}
				/>
				<div className='IconsDiv'>
					<EditIcon to={`/trip/${trip.id}/edit`} />
					<DeleteIcon onClick={this.handleClickOnDelete} />
				</div>
				<LinkButton to={`/trip/${trip.id}/add-plan`}>
					Create a plan
				</LinkButton>
				<div className='TripPage__plan_list'>
					{this.renderPlans()}
				</div>
			</section>
		);
	}
}

function getDateStrWithoutTime(dateStr) {
	let date = moment.parseZone(dateStr);
	return `${date.format('YYYY-MM-DD')}T00:00:00${date.format('Z')}`;
}